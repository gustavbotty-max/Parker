import pandas as pd
import re

# Function to categorize products
def categorize_product(product):
    product_lower = product.lower()
    keywords = {
        'bagels': ['bagels'],
        'rolls': ['rolls'],
        'tortilla chips': ['tostitos', 'chips'],
        'yogurt': ['yogurt', 'probiotic'],
        'sparkling water': ['sparkling water', 'bubly'],
        'milk': ['milk'],
        'meat': ['turkey', 'lunchmeat'],
        'other': []
    }
    for category, words in keywords.items():
        for word in words:
            if word in product_lower:
                return category
    return 'other'

# Load and analyze data
df = pd.read_excel('Walmart_Orders.xlsx')
df['Category'] = df['Product Name'].apply(categorize_product)
category_spending = df.groupby('Category')['Price'].sum().sort_values(ascending=False)
print(category_spending)