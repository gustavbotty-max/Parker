import pandas as pd

# Load Walmart Orders file
df = pd.read_excel('Walmart_Orders.xlsx')

# Parse and clean Order Date
df['Order Date'] = pd.to_datetime(df['Order Date'], errors='coerce')
df.dropna(subset=['Order Date'], inplace=True)

# Convert order dates to monthly periods
df['Order Month'] = df['Order Date'].dt.to_period('M')

# Calculate monthly spending
monthly_spend = df.groupby('Order Month')['Order Total'].sum()

# Calculate average monthly spend
average_monthly_spend = monthly_spend.mean()

# Output the result
print(f"Average monthly grocery spend: ${average_monthly_spend:.2f}")