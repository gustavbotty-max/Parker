#!/usr/bin/env python3
"""
CORRECTED Receipt Parser - Fixed Costco & Target parsing logic
- Costco: Qty = count of repeated item names (not the number field)
- Target: Use "Amount" field as total (not subtotal)
"""

import os
import re
import csv
import subprocess
from pathlib import Path
from datetime import datetime
from collections import defaultdict

class Color:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'

def extract_pdf_text(pdf_path):
    """Extract text from PDF using pdftotext"""
    try:
        result = subprocess.run(['pdftotext', str(pdf_path), '-'], 
                              capture_output=True, text=True, timeout=10)
        return result.stdout
    except Exception as e:
        return None

def parse_costco_receipt_corrected(text, filename):
    """
    Parse Costco receipt - CORRECTED LOGIC
    - Items listed once per purchase (qty = count of same item name)
    - Ignore the number after SUBTOTAL (it's not a quantity)
    """
    items = []
    
    # Extract date
    date_match = re.search(r'(\d{1,2})/(\d{1,2})/(\d{2}),\s+(\d{1,2}):(\d{2})\s*(AM|PM)', text)
    if not date_match:
        return items
    
    month, day, year = date_match.groups()[:3]
    date_str = f"20{year}-{month.zfill(2)}-{day.zfill(2)}"
    
    # Extract store ID
    store_match = re.search(r'#(\d+)', text)
    store_id = store_match.group(1) if store_match else "Unknown"
    
    # Parse items - format: SKU NAME PRICE
    # Skip lines with SUBTOTAL, TAX, TOTAL, AMOUNT, CHANGE, etc.
    item_pattern = r'^\s*(\d+)\s+(.+?)\s+(\d+\.\d{2})\s*[YE]?\s*$'
    
    parsed_items = []
    for line in text.split('\n'):
        match = re.match(item_pattern, line.strip())
        if match:
            sku, name, price = match.groups()
            
            # Skip non-item lines
            if any(x in name.upper() for x in ['SUBTOTAL', 'TAX', 'TOTAL', 'CHANGE', 'AMOUNT']):
                continue
            
            parsed_items.append({
                'sku': sku,
                'name': name.strip(),
                'price': float(price),
                'date': date_str,
                'store': 'Costco',
                'store_id': store_id
            })
    
    # Now count duplicates - qty = how many times this item appears
    item_counts = defaultdict(int)
    for item in parsed_items:
        item_counts[item['name']] += 1
    
    # Build final list with corrected quantities
    seen = set()
    for item in parsed_items:
        if item['name'] not in seen:
            qty = item_counts[item['name']]
            items.append({
                'date': item['date'],
                'store': item['store'],
                'store_id': item['store_id'],
                'item': item['name'],
                'quantity': qty,
                'unit_price': item['price'],
                'total': item['price'] * qty
            })
            seen.add(item['name'])
    
    return items

def parse_target_receipt_corrected(text, filename):
    """
    Parse Target receipt - CORRECTED LOGIC
    - Use "Amount" field as the total (not subtotal)
    - Qty is explicitly stated
    """
    items = []
    
    # Extract date
    date_match = re.search(r'Invoice date:\s+\w+,\s+(\w+)\s+(\d+),\s+(\d{4})', text)
    months = {
        'January': '01', 'February': '02', 'March': '03', 'April': '04',
        'May': '05', 'June': '06', 'July': '07', 'August': '08',
        'September': '09', 'October': '10', 'November': '11', 'December': '12'
    }
    
    if date_match:
        month_name, day, year = date_match.groups()
        month_num = months.get(month_name, '01')
        date_str = f"{year}-{month_num}-{day.zfill(2)}"
    else:
        date_str = "Unknown"
    
    # Split by "Item\n" blocks
    item_blocks = re.split(r'\nItem\n', text)
    
    for block in item_blocks[1:]:  # Skip header
        lines = [l.strip() for l in block.split('\n') if l.strip()]
        
        if not lines:
            continue
        
        item_desc = lines[0]
        qty = "1"
        amount = "0.00"  # This is what we want, not subtotal
        
        # Extract quantity
        for i, line in enumerate(lines):
            if 'Qty.' in line and i + 1 < len(lines):
                qty_str = lines[i + 1].strip()
                if qty_str.isdigit():
                    qty = qty_str
            
            # Extract the Amount (total for this line item)
            if 'Amount' in line and i + 1 < len(lines):
                amt_str = lines[i + 1].strip().replace('$', '')
                # Skip if it's a discount line (starts with -)
                if not amt_str.startswith('-'):
                    try:
                        amount = str(float(amt_str))
                    except:
                        pass
        
        # Extract item name
        item_name = item_desc
        sku_match = re.search(r'^\d+\s*-\s*(.+)$', item_desc)
        if sku_match:
            item_name = sku_match.group(1).strip()
        
        if item_name and amount != "0.00":
            try:
                unit_price = float(amount) / float(qty) if float(qty) > 0 else 0
                items.append({
                    'date': date_str,
                    'store': 'Target',
                    'store_id': 'TBD',
                    'item': item_name,
                    'quantity': qty,
                    'unit_price': f"{unit_price:.2f}",
                    'total': amount
                })
            except (ValueError, ZeroDivisionError):
                pass
    
    return items

def process_all_receipts():
    """Download and parse all 31 PDFs with corrected logic"""
    
    workspace = Path('/home/ubuntu/.openclaw/workspace')
    costco_folder = '1W655wSMEBKfENeydY0oexa7Jfn7xFv80'
    target_folder = '1-Z0NCUOBrdA8LiY572k9cfs503rFRVED'
    
    all_items = []
    receipts_dir = workspace / 'receipts_temp'
    receipts_dir.mkdir(exist_ok=True)
    
    print(f"\n{Color.BOLD}{Color.CYAN}═══ CORRECTED Receipt Parser ═══{Color.END}\n")
    
    os.environ['GOG_KEYRING_PASSWORD'] = 'MrGustavBotty2000'
    os.environ['GOG_ACCOUNT'] = 'gustavbotty@gmail.com'
    
    # Get file lists
    result = subprocess.run(['gog', 'drive', 'ls', '--parent', costco_folder, '--json'],
                          capture_output=True, text=True)
    import json
    costco_files = json.loads(result.stdout).get('files', []) if result.returncode == 0 else []
    
    result = subprocess.run(['gog', 'drive', 'ls', '--parent', target_folder, '--json'],
                          capture_output=True, text=True)
    target_files = json.loads(result.stdout).get('files', []) if result.returncode == 0 else []
    
    print(f"{Color.YELLOW}Processing Costco receipts (corrected qty logic)...{Color.END}")
    for i, file in enumerate(costco_files, 1):
        file_id = file['id']
        file_name = file['name']
        
        pdf_path = receipts_dir / f"costco_{i}.pdf"
        subprocess.run(['gog', 'drive', 'download', file_id, '--out', str(pdf_path)],
                      capture_output=True)
        
        text = extract_pdf_text(pdf_path)
        if text:
            items = parse_costco_receipt_corrected(text, file_name)
            all_items.extend(items)
            print(f"  ✓ {file_name[:50]:<50} → {len(items)} items")
    
    print(f"\n{Color.YELLOW}Processing Target receipts (corrected amount logic)...{Color.END}")
    for i, file in enumerate(target_files, 1):
        file_id = file['id']
        file_name = file['name']
        
        pdf_path = receipts_dir / f"target_{i}.pdf"
        subprocess.run(['gog', 'drive', 'download', file_id, '--out', str(pdf_path)],
                      capture_output=True)
        
        text = extract_pdf_text(pdf_path)
        if text:
            items = parse_target_receipt_corrected(text, file_name)
            all_items.extend(items)
            print(f"  ✓ {file_name[:50]:<50} → {len(items)} items")
    
    # Write CSV
    output_csv = workspace / 'costco_target_receipts_corrected.csv'
    with open(output_csv, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'date', 'store', 'store_id', 'item', 'quantity', 'unit_price', 'total'
        ])
        writer.writeheader()
        writer.writerows(all_items)
    
    print(f"\n{Color.GREEN}✓ Corrected CSV: {output_csv.name}{Color.END}")
    print(f"  Total items: {len(all_items)}\n")
    
    # Cleanup
    import shutil
    shutil.rmtree(receipts_dir, ignore_errors=True)

if __name__ == '__main__':
    process_all_receipts()
