import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the data
df = pd.read_csv('ev_data.csv')

# Data Cleaning and Preparation
df = df.dropna()
df['Model Year'] = df['Model Year'].astype(int)
df['Electric Range'] = df['Electric Range'].astype(int)

# Descriptive Statistics
print(df.describe())
print(df[['County', 'City', 'State']].nunique())

# EV Distribution Analysis
city_counts = df['City'].value_counts().reset_index()
city_counts.columns = ['City', 'EV Count']
print(city_counts.head())

county_counts = df['County'].value_counts().reset_index()
county_counts.columns = ['County', 'EV Count']
print(county_counts.head())

state_counts = df['State'].value_counts().reset_index()
state_counts.columns = ['State', 'EV Count']
print(state_counts.head())

# Growth Trend Analysis
year_counts = df['Model Year'].value_counts().sort_index().reset_index()
year_counts.columns = ['Model Year', 'EV Count']
print(year_counts)

# Plotting the growth trend
plt.figure(figsize=(10, 5))
plt.plot(year_counts['Model Year'], year_counts['EV Count'], marker='o')
plt.title('Growth of EV Adoption by Model Year')
plt.xlabel('Model Year')
plt.ylabel('EV Count')
plt.grid(True)
plt.show()

# Potential Market Analysis
low_adoption_cities = city_counts[city_counts['EV Count'] < 50]
print(low_adoption_cities)

# Visualization
plt.figure(figsize=(15, 7))
sns.barplot(x='EV Count', y='City', data=city_counts.head(20))
plt.title('Top 20 Cities by EV Count')
plt.xlabel('EV Count')
plt.ylabel('City')
plt.show()

plt.figure(figsize=(15, 7))
sns.barplot(x='EV Count', y='County', data=county_counts.head(20))
plt.title('Top 20 Counties by EV Count')
plt.xlabel('EV Count')
plt.ylabel('County')
plt.show()

plt.figure(figsize=(15, 7))
sns.barplot(x='EV Count', y='State', data=state_counts)
plt.title('EV Distribution by State')
plt.xlabel('EV Count')
plt.ylabel('State')
plt.show()
