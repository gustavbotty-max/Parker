#!/usr/bin/env python3
"""
CORRECTED consolidation - using fixed receipt data
"""

import csv
import json
from pathlib import Path
from datetime import datetime
from collections import defaultdict

class Color:
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'

def consolidate_corrected():
    workspace = Path('/home/ubuntu/.openclaw/workspace')
    
    all_purchases = []
    
    print(f"\n{Color.BOLD}{Color.CYAN}═══ CORRECTED 3-Store Consolidation ═══{Color.END}\n")
    
    # 1. Load Walmart
    print(f"{Color.BLUE}Loading Walmart data...{Color.END}")
    walmart_path = workspace / 'walmart_orders_full.csv'
    walmart_count = 0
    with open(walmart_path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            date_str = row['Order Date'].strip()
            try:
                date = datetime.strptime(date_str, '%b %d, %Y').strftime('%Y-%m-%d')
            except ValueError:
                date = 'Unknown'
            
            try:
                item_name = row['Product Name']
                qty = float(row['Quantity']) if row['Quantity'] else 1
                price_str = row['Price'].replace('$', '') if row['Price'] else '0'
                price = float(price_str)
                
                # For items sold "Each", Price is the line total, not unit price
                if 'Each' in item_name:
                    total = price  # Price column IS the total
                    unit_price = price / qty if qty > 0 else price
                else:
                    # For other items, Price is unit price
                    unit_price = price
                    total = price * qty
                
                all_purchases.append({
                    'date': date,
                    'store': 'Walmart',
                    'item': item_name,
                    'quantity': qty,
                    'price': unit_price,
                    'total': total
                })
                walmart_count += 1
            except (ValueError, TypeError, ZeroDivisionError):
                continue
    
    print(f"  ✓ Loaded {Color.GREEN}{walmart_count} Walmart purchases{Color.END}")
    
    # 2. Load Costco + Target (CORRECTED)
    print(f"{Color.BLUE}Loading Costco + Target data (corrected)...{Color.END}")
    other_path = workspace / 'costco_target_receipts_corrected.csv'
    other_count = 0
    with open(other_path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                qty = float(row['quantity']) if row['quantity'] else 1
                price = float(row['unit_price']) if row['unit_price'] else 0
                total = float(row['total']) if row['total'] else 0
                
                if price == 0 or total == 0:
                    continue
                
                all_purchases.append({
                    'date': row['date'],
                    'store': row['store'],
                    'item': row['item'],
                    'quantity': qty,
                    'price': price,
                    'total': total
                })
                other_count += 1
            except (ValueError, TypeError):
                continue
    
    print(f"  ✓ Loaded {Color.GREEN}{other_count} Costco + Target purchases{Color.END}\n")
    
    # 3. Calculate summary stats
    total_purchases = len(all_purchases)
    date_range = [p['date'] for p in all_purchases if p['date'] != 'Unknown']
    if date_range:
        date_range.sort()
        days_span = (datetime.strptime(date_range[-1], '%Y-%m-%d') - 
                    datetime.strptime(date_range[0], '%Y-%m-%d')).days
    else:
        days_span = 0
    
    total_spent = sum(p['total'] for p in all_purchases)
    
    # By store
    by_store = defaultdict(lambda: {'count': 0, 'total': 0})
    for p in all_purchases:
        by_store[p['store']]['count'] += 1
        by_store[p['store']]['total'] += p['total']
    
    # Top items
    by_item = defaultdict(lambda: {'qty': 0, 'total': 0, 'count': 0})
    for p in all_purchases:
        by_item[p['item']]['qty'] += p['quantity']
        by_item[p['item']]['total'] += p['total']
        by_item[p['item']]['count'] += 1
    
    top_items = sorted(by_item.items(), key=lambda x: x[1]['total'], reverse=True)[:30]
    
    # Print summary
    print(f"{Color.BOLD}CORRECTED CONSOLIDATED DATA{Color.END}")
    print(f"  Period: {date_range[0]} to {date_range[-1]} ({days_span} days)")
    print(f"  Total purchases: {total_purchases}")
    print(f"  Total spent: ${total_spent:.2f}\n")
    
    print(f"{Color.YELLOW}By Store:{Color.END}")
    for store in ['Walmart', 'Costco', 'Target']:
        if store in by_store:
            data = by_store[store]
            pct = (data['count'] / total_purchases * 100)
            pct_spend = (data['total'] / total_spent * 100)
            print(f"  {store:<10} | {data['count']:>4} items ({pct:>5.1f}%) | ${data['total']:>8.2f} ({pct_spend:>5.1f}%)")
    
    print(f"\n{Color.YELLOW}Top 20 Items (corrected totals):{Color.END}")
    for i, (item, data) in enumerate(top_items[:20], 1):
        print(f"  {i:>2}. {item[:50]:<50} | {data['count']:>2}x | ${data['total']:>8.2f}")
    
    # 4. Write consolidated CSV
    output_path = workspace / 'consolidated_3store_corrected.csv'
    with open(output_path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['date', 'store', 'item', 'quantity', 'price', 'total'])
        writer.writeheader()
        
        sorted_purchases = sorted(all_purchases, key=lambda x: x['date'])
        writer.writerows(sorted_purchases)
    
    print(f"\n{Color.GREEN}✓ Consolidated CSV: {output_path.name}{Color.END}")
    
    # 5. Write analysis JSON
    analysis = {
        'summary': {
            'period_start': date_range[0],
            'period_end': date_range[-1],
            'days': days_span,
            'total_purchases': total_purchases,
            'total_spent': round(total_spent, 2),
            'avg_per_day': round(total_spent / (days_span + 1), 2),
        },
        'by_store': {
            store: {
                'count': data['count'],
                'percent': round(data['count'] / total_purchases * 100, 1),
                'total': round(data['total'], 2),
                'percent_spend': round(data['total'] / total_spent * 100, 1),
                'avg_per_trip': round(data['total'] / data['count'], 2)
            }
            for store, data in by_store.items()
        },
        'top_items': [
            {
                'item': item,
                'purchases': data['count'],
                'total_qty': round(data['qty'], 2),
                'total_spend': round(data['total'], 2)
            }
            for item, data in top_items[:30]
        ]
    }
    
    analysis_path = workspace / 'purchase_analysis_corrected.json'
    with open(analysis_path, 'w') as f:
        json.dump(analysis, f, indent=2)
    
    print(f"{Color.GREEN}✓ Analysis JSON: {analysis_path.name}{Color.END}")
    print(f"\n{Color.BOLD}{Color.GREEN}Corrected consolidation complete!{Color.END}\n")

if __name__ == '__main__':
    consolidate_corrected()
