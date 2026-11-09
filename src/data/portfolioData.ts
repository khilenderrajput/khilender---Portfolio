export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  filterCategories?: string[];
  technologies: string[];
  description: string;
  longDescription: string;
  keyMetrics: { label: string; value: string }[];
  highlights: string[];
  sqlSnippet?: string;
  pythonSnippet?: string;
  powerBiPreview?: {
    kpis: { title: string; value: string; change: string; isPositive: boolean }[];
    chartTitle: string;
    chartData: { name: string; val1: number; val2: number }[];
  };
  githubUrl: string;
  liveUrl?: string;
  image?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level?: string; iconName?: string; highlight?: boolean }[];
}

export interface Education {
  institution: string;
  degree: string;
  location?: string;
  duration: string;
  grade: string;
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate?: string;
  badgeColor: string;
  skills: string[];
  verifyUrl?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: 'Excel' | 'SQL' | 'Power BI' | 'Data Science' | 'Big Data' | 'Machine Learning' | 'LeetCode';
  filterCategories?: string[];
  issueDate?: string;
  credentialId?: string;
  image: string;
  pdfUrl?: string;
  verificationUrl?: string;
  description: string;
  keyMetrics: { label: string; value: string }[];
  skills: string[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationMs: number;
  previewUrl: string;
  artwork: string;
}

export const PERSONAL_INFO = {
  name: "KHILENDER RAJPUT",
  role: "Data Analyst",
  subRole: "Data Analytics, SQL, Python & Power BI",
  location: "Dhampur, Uttar Pradesh, India",
  phone: "+91 6395178355",
  email: "khilendrrajput95@gmail.com",
  linkedIn: "https://www.linkedin.com/in/khilender-rajput-936519337/",
  github: "https://github.com/khilenderrajput",
  leetcode: "https://leetcode.com/u/Khilender_rajput/",
  summary:
    "Data Analyst and B.Tech Computer Science Engineering student specializing in Data Analytics, Machine Learning, and AI. Skilled in data analysis, data cleaning, exploratory data analysis (EDA), SQL querying, and Power BI dashboards that turn raw data into actionable business insights.",
  aboutDetailed: [
    "I specialize in bridging the gap between raw unstructured data and actionable strategic decision-making. My technical domain focuses on end-to-end data analytics workflows—from data wrangling in Python (Pandas/NumPy) and SQL database querying to crafting high-impact interactive Power BI dashboards.",
    "My hands-on analytical projects span Airbnb global market performance, financial credit card risk monitoring, and OTT subscription churn prediction. I focus on actionable KPIs, customer lifetime value (CLTV) erosion, and data-backed business optimization.",
    "Currently pursuing my B.Tech in Computer Science Engineering (CGPA: 8.07), I am actively seeking an entry-level Data Analyst position to deliver data-backed ROI for forward-thinking teams."
  ],
  stats: [
    { label: "B.Tech CGPA", value: "8.07", description: "Computer Science Engineering" },
    { label: "End-to-End Projects", value: "3+", description: "Python, SQL & Power BI" },
    { label: "Churn KPIs Tracked", value: "20+", description: "MRR Leakage & CLTV Erosion" },
    { label: "Records Analyzed", value: "100k+", description: "Transactions & Subscriber Data" },
    { label: "Industry Credentials", value: "5", description: "IBM, CodeAlpha, HP LIFE" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "vande-bharat-performance",
    title: "Vande Bharat Train Passenger Performance Dashboard",
    subtitle: "Interactive Power BI dashboard analyzing Indian Railways passenger traffic, route occupancy, and punctuality.",
    category: "Railway Operations & Passenger Analytics",
    filterCategories: ["Major Projects"],
    technologies: ["Power BI", "DAX", "Power Query", "Data Modeling", "Business Intelligence"],
    description: "Analyzes Indian Railways' Vande Bharat Express passenger operations across 164 trains and 24M+ commuters using Power BI and DAX. Evaluates route revenue, seat occupancy percentages, punctuality, and speed dynamics to deliver actionable railway transit intelligence.",
    longDescription: "Architected an end-to-end railway passenger analytics dashboard in Power BI analyzing Vande Bharat Express operational records across 164 trains and 24M+ passengers. Built dynamic DAX measures and interactive route matrices evaluating seat occupancy percentages, average speeds, punctuality metrics, class-wise ticket distributions (Executive Class vs. Chair Car), and month-over-month revenue trends across key corridors like New Delhi - Varanasi.",
    keyMetrics: [
      { label: "Total Passengers", value: "24M" },
      { label: "Average Occupancy", value: "78.8%" },
      { label: "Total Revenue", value: "₹36.11B" }
    ],
    highlights: [
      "Ingested, structured, and cleaned comprehensive Indian Railways operational logs across 164 Vande Bharat train services using Power Query.",
      "Formulated dynamic DAX measures to track 24M+ passengers, average occupancy (78.8%), on-time punctuality (83.8%), and overall route revenue (₹36.11B).",
      "Developed comparative route matrices analyzing top revenue corridors, identifying New Delhi - Varanasi as the leading route (₹1,884.82M).",
      "Built multi-level slicers for State, Route, Train Name, Coach Type, Class (Chair Car vs Executive), and Journey Date to empower deep-dive analytics.",
      "Published full dashboard resources, relational models, and documentation on GitHub."
    ],
    powerBiPreview: {
      kpis: [
        { title: "Total Passengers", value: "24M", change: "164 Trains", isPositive: true },
        { title: "Average Occupancy", value: "78.8%", change: "+4.2%", isPositive: true },
        { title: "Total Revenue", value: "₹36.11B", change: "Top Corridor", isPositive: true },
        { title: "On-Time Rate", value: "83.8%", change: "Punctual", isPositive: true }
      ],
      chartTitle: "Monthly Passenger & Revenue Velocity",
      chartData: [
        { name: "Jan", val1: 4.8, val2: 6.7 },
        { name: "Feb", val1: 4.6, val2: 6.8 },
        { name: "Mar", val1: 4.7, val2: 6.9 },
        { name: "Apr", val1: 4.9, val2: 7.8 },
        { name: "May", val1: 5.1, val2: 7.9 }
      ]
    },
    githubUrl: "https://github.com/khilenderrajput/Vandhe-Bharat-Train-Passenger-Performance.git",
    liveUrl: "",
    image: "/images/vande-bharat-dashboard.jpg"
  },
  {
    id: "airbnb-global-performance",
    title: "Airbnb Global Performance Dashboard",
    subtitle: "Interactive Power BI dashboard analyzing global accommodation performance and market dynamics.",
    category: "Data Analytics & Business Intelligence",
    filterCategories: ["Power BI"],
    technologies: ["Power BI", "Power Query", "DAX", "Data Modeling", "GitHub"],
    description: "Analyzes Airbnb market performance across 240+ cities using Power BI and DAX modeling. Evaluates revenue trends, occupancy rates, and lifecycle dynamics to deliver data-backed insights for hospitality investments.",
    longDescription: "Architected an end-to-end business intelligence dashboard in Power BI analyzing global Airbnb accommodation listings and market dynamics across cities. Modeled key hospitality metrics including average daily rates (ADR), occupancy percentages, reserved vs. vacant days, and revenue distribution across lifecycle stages (Introduction, Growth, Maturity, Decline, Reinvention). Features interactive multi-page views with city-level drill-downs, host trust analysis, and customer rating matrices to identify business insights and support data-driven decisions.",
    keyMetrics: [
      { value: "Global Market Analysis", label: "Airbnb Performance" },
      { value: "City-Level Insights", label: "Comparative Metrics" },
      { value: "Interactive Dashboard", label: "Revenue & Occupancy" }
    ],
    highlights: [
      "Imported, cleaned, and transformed accommodation datasets containing 1,800+ listings across 240+ global cities using Power Query.",
      "Engineered an interactive multi-page Power BI dashboard spanning Market Overview, Ratings, Reviews & Trust, and City-wise Rating Matrices.",
      "Analyzed lifecycle-stage performance trends across average rates, reserved days, revenue, and vacant-day metrics.",
      "Implemented DAX measures and interactive slicers for dynamic city-level drill-downs and host distribution analysis.",
      "Deployed a live web-accessible dashboard on Netlify and published complete project resources on GitHub."
    ],
    powerBiPreview: {
      kpis: [
        { title: "Total Listings", value: "1,841", change: "241 Cities", isPositive: true },
        { title: "Active Hosts", value: "1,146", change: "Global Reach", isPositive: true },
        { title: "Total Reviews", value: "47.8K", change: "4.82 Avg Rating", isPositive: true },
        { title: "Lifecycle Peak", value: "Reinvention", change: "Top Revenue", isPositive: true }
      ],
      chartTitle: "Market Revenue by Lifecycle Stage ($K)",
      chartData: [
        { name: "Introduction", val1: 42, val2: 30 },
        { name: "Growth", val1: 168, val2: 110 },
        { name: "Maturity", val1: 245, val2: 175 },
        { name: "Decline", val1: 190, val2: 130 },
        { name: "Reinvention", val1: 280, val2: 215 }
      ]
    },
    githubUrl: "https://github.com/khilenderrajput/Airbnb_Global_Performance.git",
    liveUrl: "https://thriving-parfait-ec1a90.netlify.app/",
    image: "/images/airbnb-dashboard.jpg"
  },
  {
    id: "credit-card-financial-dashboard",
    title: "Credit Card Financial Data Analysis",
    subtitle: "Real-time financial KPI tracking and spend trend pattern monitoring.",
    category: "Financial Analytics & BI Reporting",
    filterCategories: ["Major Projects"],
    technologies: ["SQL", "MySQL", "Power BI", "DAX", "Power Query", "React", "JavaScript"],
    description: "Financial analytics pipeline analyzing credit card transactions, revenue trends, and credit risk using SQL and Power BI. Provides interactive KPI tracking and customer segmentation to optimize portfolio decisions.",
    longDescription: "Engineered a robust financial monitoring dashboard for credit card portfolios. Built normalized SQL views joining customer demographic tables with transaction ledgers, then created custom DAX measures for week-over-week revenue changes, customer acquisition costs, interest earned, and card utilization rates.",
    keyMetrics: [
      { label: "Financial KPIs Monitored", value: "15+" },
      { label: "Data Latency Reduction", value: "Real-time" },
      { label: "Customer Segments Analyzed", value: "5 Tiers" }
    ],
    highlights: [
      "Extracted and integrated transaction datasets into SQL relational models for financial reporting.",
      "Wrote advanced DAX formulas for dynamic rolling totals, month-over-month variances, and credit utilization ratios.",
      "Streamlined data processing workflows to track spending patterns across Platinum, Gold, and Blue card tiers.",
      "Delivered actionable reporting to support financial decision-making and credit line adjustments."
    ],
    sqlSnippet: `-- Financial Spend Breakdown & Card Utilization Ratio
SELECT 
  c.card_category,
  c.income_group,
  COUNT(t.transaction_id) AS total_transactions,
  SUM(t.amount) AS total_spend,
  ROUND(AVG(t.amount), 2) AS avg_transaction_value,
  ROUND(AVG(c.credit_limit), 0) AS avg_credit_limit,
  ROUND((SUM(t.amount) / NULLIF(SUM(c.credit_limit), 0)) * 100, 2) AS utilization_rate_pct
FROM cardholder_dim c
JOIN transaction_fact t ON c.customer_id = t.customer_id
WHERE t.transaction_date >= DATEADD(month, -6, GETDATE())
GROUP BY c.card_category, c.income_group
ORDER BY total_spend DESC;`,
    powerBiPreview: {
      kpis: [
        { title: "Total Transaction Volume", value: "$54.2M", change: "+18.6%", isPositive: true },
        { title: "Total Interest Earned", value: "$7.84M", change: "+12.1%", isPositive: true },
        { title: "Avg Credit Utilization", value: "48.3%", change: "-2.1%", isPositive: true },
        { title: "Delinquency Rate", value: "1.42%", change: "-0.3%", isPositive: true }
      ],
      chartTitle: "Card Category Spend ($ Millions)",
      chartData: [
        { name: "Blue Card", val1: 24, val2: 18 },
        { name: "Silver Card", val1: 16, val2: 12 },
        { name: "Gold Card", val1: 8.5, val2: 6.2 },
        { name: "Platinum", val1: 5.7, val2: 4.1 }
      ]
    },
    githubUrl: "https://github.com/khilenderrajput/Credit-Card-Financial-Dashboard",
    liveUrl: "https://sparkling-treacle-fb042a.netlify.app/",
    image: "/images/credit-card-dashboard.png"
  },
  {
    id: "walmart-sales-analysis",
    title: "Walmart Sales Analysis",
    subtitle: "Exploratory sales data pipeline, branch comparison, and revenue insights.",
    category: "Retail Analytics & Business Intelligence",
    filterCategories: ["Major Projects"],
    technologies: ["Python", "Pandas", "SQL", "MySQL", "Power BI", "Data Analysis"],
    description: "Analyzes Walmart retail sales using SQL and Python (Pandas) to evaluate branch revenue, category trends, and customer purchasing patterns. Delivers actionable business insights through exploratory analysis and sales reporting.",
    longDescription: "Architected an end-to-end retail data analytics pipeline to analyze Walmart transaction data across branches, product categories, and payment channels. Cleaned and preprocessed raw transaction records in Python (Pandas), calculated revenue and margin metrics, and migrated data into a normalized MySQL relational database. Formulated advanced SQL queries using Window Functions, CTEs, and time-shift aggregations to evaluate branch profitability and customer shopping habits, culminating in an interactive business intelligence dashboard.",
    keyMetrics: [
      { label: "Total Revenue Analyzed", value: "$8.49M" },
      { label: "Transactions Processed", value: "1.0M+" },
      { label: "Store Performance Tracked", value: "5 Branches" }
    ],
    highlights: [
      "Engineered automated data cleaning and preprocessing pipelines in Python (Pandas) to clean unit pricing, drop duplicates, and compute total sales volumes.",
      "Integrated normalized sales datasets into MySQL using SQLAlchemy and mysql-connector for scalable relational querying.",
      "Developed advanced SQL queries employing Window Functions (RANK, PARTITION BY) and CTEs to identify top-performing product categories and branch revenue shifts.",
      "Segmented sales performance across operational time shifts (Morning, Afternoon, Evening) and analyzed customer payment preferences (Credit Card, UPI, Cash).",
      "Created an interactive business dashboard tracking KPIs including Total Revenue, Average Order Value ($8.49), and category revenue distributions."
    ],
    sqlSnippet: `-- Identify Top-Rated Category per Branch & YoY Revenue Analysis
SELECT branch, category, avg_rating
FROM (
    SELECT
        branch,
        category,
        AVG(rating) AS avg_rating,
        RANK() OVER (
            PARTITION BY branch
            ORDER BY AVG(rating) DESC
        ) AS rnk
    FROM walmart_sales
    GROUP BY branch, category
) AS ranked
WHERE rnk = 1;

-- Calculate Branch Revenue Decrease Ratio
WITH revenue_2022 AS (
    SELECT branch, SUM(total) AS revenue
    FROM walmart_sales
    WHERE YEAR(STR_TO_DATE(\`DATE\`, '%d,%m,%Y')) = 2022
    GROUP BY branch
),
revenue_2023 AS (
    SELECT branch, SUM(total) AS revenue
    FROM walmart_sales
    WHERE YEAR(STR_TO_DATE(\`DATE\`, '%d,%m,%Y')) = 2023
    GROUP BY branch
)
SELECT 
    r2022.branch,
    r2022.revenue AS last_year_revenue,
    r2023.revenue AS current_year_revenue,
    ROUND(((r2022.revenue - r2023.revenue) / r2022.revenue) * 100, 2) AS revenue_decrease_ratio
FROM revenue_2022 AS r2022
JOIN revenue_2023 AS r2023 ON r2022.branch = r2023.branch
WHERE r2022.revenue > r2023.revenue
ORDER BY revenue_decrease_ratio DESC;`,
    pythonSnippet: `# Walmart Sales Data Preprocessing & MySQL Ingestion Pipeline
import pandas as pd
from sqlalchemy import create_engine

# Load raw transaction records
df = pd.read_csv('Walmart.csv')

# Clean missing records and sanitize price fields
df.drop_duplicates(inplace=True)
df.dropna(inplace=True)
df['unit_price'] = df['unit_price'].astype(str).str.replace('$', '').astype(float)
df['total'] = df['unit_price'] * df['quantity']

# Ingest into MySQL database
engine = create_engine('mysql+mysqlconnector://root:Walmart@2026@localhost:3306/walmart')
df.to_sql('walmart_sales', con=engine, if_exists='replace', index=False)
print(f"Ingested {len(df)} transactions into MySQL successfully.")`,
    powerBiPreview: {
      kpis: [
        { title: "Total Sales", value: "$8,486,507", change: "+12.5%", isPositive: true },
        { title: "Total Transactions", value: "1,000,564", change: "+10.3%", isPositive: true },
        { title: "Avg Order Value", value: "$8.49", change: "+2.1%", isPositive: true },
        { title: "Top Branch", value: "Branch A ($2.3M)", change: "Lead Branch", isPositive: true }
      ],
      chartTitle: "Sales by Product Category ($ Millions)",
      chartData: [
        { name: "Electronics", val1: 2.1, val2: 1.8 },
        { name: "Clothing", val1: 1.7, val2: 1.4 },
        { name: "Home & Living", val1: 1.3, val2: 1.1 },
        { name: "Sports", val1: 1.0, val2: 0.8 },
        { name: "Beauty", val1: 0.8, val2: 0.6 }
      ]
    },
    githubUrl: "https://github.com/khilenderrajput/walmart-Sales-Analysis.git",
    liveUrl: "https://curious-mermaid-1cc736.netlify.app",
    image: "/images/walmart-sales-analysis.png"
  },
  {
    id: "sales-analysis-excel-dashboard",
    title: "Sales Analysis Excel Dashboard",
    subtitle: "Interactive Excel dashboard evaluating retail sales trends, fulfillment efficiency, and customer purchase patterns.",
    category: "Retail Analytics & Excel BI",
    filterCategories: ["Excel"],
    technologies: ["Microsoft Excel", "Power Query", "PivotTables", "Pivot Charts", "DAX", "Slicers"],
    description: "Analyzes retail sales data using Microsoft Excel, Power Query, and PivotTables to evaluate revenue trends across occasions, product categories, and peak ordering hours. Features interactive slicers and KPI tracking to optimize inventory, delivery duration, and customer purchasing insights.",
    longDescription: "Architected an end-to-end retail sales intelligence dashboard in Microsoft Excel analyzing multi-category celebration and gifting order transactions. Transformed raw tabular records using Power Query to sanitize date/time inconsistencies, calculate fulfillment durations, and establish clean relational structures. Built dynamic PivotTables and PivotCharts to evaluate performance metrics across occasions, product categories (Cakes, Colors, Mugs, Plants, Soft Toys, Sweets), order hours, and top-ordering cities. Incorporates interactive timeline slicers and calculated DAX measures for executive-level decision making and inventory planning.",
    keyMetrics: [
      { label: "Total Revenue Generated", value: "$3.52M" },
      { label: "Total Orders Analyzed", value: "1,000+" },
      { label: "Avg Delivery Interval", value: "5.53 Days" }
    ],
    highlights: [
      "Extracted, sanitized, and modeled retail sales transactions using Power Query and Power Pivot Data Modeling.",
      "Engineered automated KPI tracking cards evaluating Total Revenue ($3.52M), Order Volumes, Average Delivery Interval (5.53 Days), and Average Spend per Customer ($3,520.98).",
      "Constructed multi-dimensional PivotTables and PivotCharts evaluating revenue distribution across seasonal occasions (Anniversary, Birthday, Diwali, Holi, Raksha Bandhan, Valentine's Day).",
      "Analyzed hourly purchasing velocity to uncover peak ordering windows and low-activity periods for targeted promotional scheduling.",
      "Integrated interactive dynamic slicers across Order Dates, Delivery Dates, and Occasions for instant multi-criteria drill-down analysis."
    ],
    githubUrl: "https://github.com/khilenderrajput/sales-analysis-excel-dashboard.git",
    liveUrl: "https://spiffy-medovik-81dc31.netlify.app",
    image: "/images/sales-analysis-excel-dashboard.jpg"
  },
  {
    id: "coffee-shop-sales-dashboard",
    title: "Coffee Shop Sales Dashboard",
    subtitle: "Interactive Excel retail analytics dashboard tracking revenue trends, store footfall, and product ordering patterns.",
    category: "Retail Analytics & Excel BI",
    filterCategories: ["Excel"],
    technologies: ["Microsoft Excel", "PivotTables", "Power Pivot", "DAX", "Pivot Charts", "Slicers"],
    description: "Analyzes retail coffee shop transactions using Microsoft Excel, Power Pivot, and DAX to evaluate sales trends, customer footfall, and peak ordering hours. Features interactive month and day slicers across store locations to optimize inventory and product mix.",
    longDescription: "Architected an end-to-end retail sales dashboard in Microsoft Excel analyzing over 149,000 customer transactions across multiple store branches (Astoria, Hell's Kitchen, Lower Manhattan). Modeled transaction records using Power Pivot and custom DAX measures to calculate total revenue ($698.8K), average customer spend ($4.69), and average item quantities. Built dynamic PivotCharts evaluating category-wise distributions, hourly ordering curves, product-size preferences, and top 5 revenue contributors, with interactive timeline slicers for multi-criteria operational analysis.",
    keyMetrics: [
      { label: "Total Sales Revenue", value: "$698.8K" },
      { label: "Customer Footfall", value: "149K+" },
      { label: "Avg Bill per Person", value: "$4.69" }
    ],
    highlights: [
      "Analyzed and preprocessed 149,000+ transaction records across three prime store locations using Microsoft Excel and Power Pivot.",
      "Formulated custom DAX measures to track critical business KPIs: Total Sales ($698,812.33), Customer Footfall (149,116), and Average Bill per Person ($4.69).",
      "Designed hourly order velocity curves to identify morning peak demand hours (8:00 AM – 10:00 AM) and optimize store staffing.",
      "Visualized product-category shares, identifying Coffee (39%) and Bakery (12%) as primary revenue drivers alongside product size distributions.",
      "Integrated dynamic Month and Day Slicers for real-time comparative analysis across Astoria, Hell's Kitchen, and Lower Manhattan branches."
    ],
    githubUrl: "https://github.com/khilenderrajput/coffee-shop-sales-dashboard-by-Excel.git",
    liveUrl: "https://mellifluous-douhua-d07277.netlify.app/",
    image: "/images/coffee-shop-sales-dashboard.jpg"
  },
  {
    id: "ipl-capstone-project",
    title: "IPL Capstone Project by Python",
    subtitle: "Exploratory data analysis of Indian Premier League match statistics, team victories, and player performances using Python.",
    category: "Sports Analytics & Python EDA",
    filterCategories: ["Python"],
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    description: "Analyzes 74 IPL match records using Python, Pandas, NumPy, Matplotlib, and Seaborn. Evaluates team victory trends, toss decision correlations, key player milestones, and venue distributions to extract actionable cricket insights.",
    longDescription: "Architected an end-to-end cricket data analytics pipeline in Python exploring 74 Indian Premier League match records across 20 parameters. Preprocessed and sanitized match-level tabular records, handled missing values, and conducted exploratory data analysis (EDA) using Pandas and NumPy. Formulated statistical aggregations to determine match victory distributions across franchises (led by Gujarat with 12 wins), evaluated toss decision correlations (48.65% toss-to-match win rate), and visualized top player milestones including Player of the Match awards and high-scoring batting records using Seaborn and Matplotlib.",
    keyMetrics: [
      { label: "Matches Analyzed", value: "74" },
      { label: "Leading Team Wins", value: "12 Wins" },
      { label: "Toss Win Correlation", value: "48.65%" }
    ],
    highlights: [
      "Imported, cleaned, and explored 74 IPL match records across 20 feature parameters using Python, Pandas, and NumPy.",
      "Evaluated team victory distributions, identifying Gujarat (12 wins) and Rajasthan (10 wins) as top performers.",
      "Analyzed toss decision patterns and calculated a 48.65% correlation between winning the toss and winning the match.",
      "Visualized individual milestones including Player of the Match frequencies (Kuldeep Yadav: 4 awards) and top run scorers (Jos Buttler: 651 runs).",
      "Deployed a live interactive project summary on Netlify and published complete resources and Jupyter Notebook on GitHub."
    ],
    githubUrl: "https://github.com/khilenderrajput/IPL-Capstone-Project-by-Python.git",
    liveUrl: "https://gilded-boba-aba3ae.netlify.app/",
    image: "/images/ipl-capstone-project.png"
  },
  {
    id: "teco-customer-churn-analysis",
    title: "Teco Customer Churn Analysis",
    subtitle: "Exploratory data analysis identifying customer attrition patterns, tenure dynamics, and retention factors using Python.",
    category: "Customer Analytics & Python EDA",
    filterCategories: ["Python"],
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    description: "Analyzes 7,043 customer records across 21 attributes using Python, Pandas, NumPy, Matplotlib, and Seaborn. Evaluates churn distributions across contract terms, payment methods, monthly charges, and tenure to identify key customer retention drivers.",
    longDescription: "Executed an end-to-end customer churn exploratory data analysis (EDA) pipeline in Python evaluating 7,043 customer records across 21 demographic, service, and account attributes. Cleaned data, converted data types, and addressed blank values in TotalCharges. Formulated univariate, categorical, and correlation analyses identifying an overall 26.54% churn rate (73.46% retention rate), revealing significant churn concentrations among month-to-month contracts, fiber optic internet subscribers, electronic check payment users, and low-tenure customer cohorts.",
    keyMetrics: [
      { label: "Customers Analyzed", value: "7,043" },
      { label: "Overall Churn Rate", value: "26.54%" },
      { label: "Customer Retention", value: "73.46%" }
    ],
    highlights: [
      "Explored and preprocessed 7,043 customer records across 21 features using Python, Pandas, and NumPy.",
      "Calculated an overall customer churn rate of 26.54% (1,869 churned vs 5,174 retained customers).",
      "Discovered high churn concentrations among customers on month-to-month contracts and electronic check payments.",
      "Analyzed service combinations, uncovering higher churn rates among Fiber Optic subscribers lacking additional security or tech support services.",
      "Visualized distributions using Seaborn and Matplotlib countplots, stacked percentage bar charts, and histograms published on GitHub."
    ],
    githubUrl: "https://github.com/khilenderrajput/Teco-Customer-Churn-Analysis---Python.git",
    image: "/images/teco-customer-churn-analysis.png"
  },
  {
    id: "retail-sales-analysis-sql",
    title: "Retail Sales Analysis Using SQL",
    subtitle: "End-to-end retail sales transaction analysis, revenue exploration, and shift-based customer purchasing patterns using PostgreSQL.",
    category: "Retail Analytics & SQL Data Exploration",
    filterCategories: ["SQL"],
    technologies: ["SQL", "PostgreSQL", "pgAdmin 4", "Data Cleaning", "Window Functions"],
    description: "Performs end-to-end exploratory data analysis on retail sales transaction data using PostgreSQL and pgAdmin 4. Cleans records by removing NULL values and executes analytical queries with aggregate functions, CTEs, and window functions to uncover revenue trends, top customer cohorts, and shift-based sales velocity.",
    longDescription: "Architected an end-to-end retail database in PostgreSQL analyzing customer transactions across clothing, electronics, and beauty categories. Conducted strict data sanitation removing records with null values in sale dates, transaction IDs, or customer demographics. Developed advanced SQL scripts leveraging Common Table Expressions (CTEs), window functions (RANK() OVER PARTITION BY), and CASE WHEN logic to answer 10 core business questions—identifying peak ordering shifts, top revenue-generating customers, category-specific purchasing behavior, and strongest sales months across multiple years.",
    keyMetrics: [
      { label: "Business Queries Solved", value: "10" },
      { label: "Ordering Shifts Analyzed", value: "3 Shifts" },
      { label: "Primary Database", value: "PostgreSQL" }
    ],
    highlights: [
      "Designed normalized PostgreSQL relational schema and sanitized transaction records by eliminating NULL entries across 8 core fields.",
      "Constructed complex analytical queries leveraging Common Table Expressions (CTEs) and window ranking functions (RANK()) to identify best-selling months per year.",
      "Segmented hourly purchasing trends using CASE WHEN statements into Morning, Afternoon, and Evening shifts to determine sales velocity.",
      "Analyzed category performance across Clothing, Electronics, and Beauty, computing average customer age profiles and high-value orders (>$1,000).",
      "Published production-ready SQL scripts, data modeling logic, and structured analytical documentation on GitHub."
    ],
    sqlSnippet: `-- Hourly Shift Analysis & Order Count Classification
WITH hourly_sale AS (
    SELECT *,
           CASE
               WHEN EXTRACT(HOUR FROM sale_time) < 12 THEN 'Morning'
               WHEN EXTRACT(HOUR FROM sale_time) < 17 THEN 'Afternoon'
               ELSE 'Evening'
           END AS shift
    FROM retail_sales
)
SELECT shift,
       COUNT(*) AS total_orders,
       ROUND(SUM(total_sale)::numeric, 2) AS total_revenue
FROM hourly_sale
GROUP BY shift
ORDER BY total_orders DESC;`,
    githubUrl: "https://github.com/khilenderrajput/SQL--retail_sales.p1.git",
    image: "/images/retail-sales-analysis-sql.png"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Data Analytics & BI",
    skills: [
      { name: "Data Analytics", highlight: true },
      { name: "Data Analysis", highlight: true },
      { name: "Exploratory Data Analysis (EDA)", highlight: true },
      { name: "Power BI", highlight: true },
      { name: "Dashboard Development", highlight: true },
      { name: "KPI Tracking & Reporting", highlight: true },
      { name: "Customer Segmentation", highlight: true },
      { name: "Churn Analysis", highlight: true },
      { name: "Financial & Revenue Analysis", highlight: true },
      { name: "Business Intelligence (BI)", highlight: true },
      { name: "Stakeholder Reporting", highlight: true },
      { name: "Statistical Analysis" }
    ]
  },
  {
    title: "Programming & Querying",
    skills: [
      { name: "SQL (Complex Queries, Joins, CTEs)", highlight: true },
      { name: "Python (Pandas, NumPy)", highlight: true },
      { name: "DAX (Power BI)", highlight: true },
      { name: "Microsoft Excel (VLOOKUP, Pivot, Advanced)", highlight: true },
      { name: "JavaScript (ES6+)" },
      { name: "C++" },
      { name: "Java" },
      { name: "HTML5 & CSS3" }
    ]
  },
  {
    title: "Tools & Libraries",
    skills: [
      { name: "Pandas & NumPy", highlight: true },
      { name: "Machine Learning (Scikit-Learn)", highlight: true },
      { name: "Jupyter Notebook", highlight: true },
      { name: "VS Code" },
      { name: "Git & GitHub", highlight: true },
      { name: "Data Structures & Algorithms (DSA)" }
    ]
  }
];

export const EDUCATION_LIST: Education[] = [
  {
    institution: "Teerthanker Mahaveer University",
    degree: "Bachelor of Technology (B.Tech) — Computer Science Engineering",
    duration: "Graduating 2027",
    grade: "CGPA: 8.07 / 10.0",
    highlights: [
      "Specialized in Artificial Intelligence and Machine Learning.",
      "Consistently achieved academic excellence with an 8.07 CGPA.",
      "Completed foundational coursework in Database Management Systems (DBMS), SQL, Python, DSA, and Software Engineering."
    ]
  },
  {
    institution: "Priyanka Modern Sr. Sec. School, Dhampur",
    degree: "Senior Secondary (CBSE) — Science & Mathematics",
    duration: "Completed",
    grade: "",
    highlights: [
      "Core focus on Advanced Mathematics, Physics, and Computer Science fundamentals."
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Python for Data Science",
    issuer: "IBM",
    badgeColor: "from-blue-600 to-cyan-500",
    skills: ["Python", "Data Wrangling", "Pandas", "NumPy", "Data Visualization"],
  },
  {
    title: "Big Data Foundation",
    issuer: "IBM SkillsBuild (IBM MOOC)",
    badgeColor: "from-indigo-600 to-blue-500",
    skills: ["Big Data Concepts", "Hadoop Ecosystem", "Data Architecture", "Analytics"],
  },
  {
    title: "Data Science Internship Certificate",
    issuer: "CodeAlpha",
    badgeColor: "from-purple-600 to-pink-500",
    skills: ["Exploratory Data Analysis", "Model Building", "Data Analytics Workflow"],
  },
  {
    title: "AI for Beginners",
    issuer: "HP LIFE",
    badgeColor: "from-emerald-600 to-teal-500",
    skills: ["Artificial Intelligence", "Predictive Analytics", "Business AI Applications"],
  },
  {
    title: "Full Stack Web Development",
    issuer: "EliteTech",
    badgeColor: "from-amber-600 to-orange-500",
    skills: ["React.js", "JavaScript", "HTML/CSS", "Frontend Architecture"],
  }
];

export const CERTIFICATES_LIST: CertificateItem[] = [
  {
    id: "excel-beginners-to-advance",
    title: "Microsoft Excel Beginners To Advance",
    issuer: "Skill Course (Satish Dhawale)",
    category: "Excel",
    filterCategories: ["Excel"],
    issueDate: "01/09/2026",
    credentialId: "SC-5NGNMG7HYD",
    image: "/images/microsoft-excel-beginners-to-advance.jpg",
    description: "Comprehensive training in Microsoft Excel from foundational concepts to advanced data analysis, dynamic dashboards, formulas, and data manipulation techniques.",
    keyMetrics: [
      { label: "ISSUER", value: "Skill Course" },
      { label: "CERTIFICATE ID", value: "SC-5NGNMG7HYD" },
      { label: "DATE", value: "01/09/2026" }
    ],
    skills: ["Microsoft Excel", "Advanced Formulas", "Pivot Tables", "Data Analysis", "Dashboards"]
  },
  {
    id: "sql-course-self-learning",
    title: "SQL Course (Self Learning)",
    issuer: "Skill Course (Satish Dhawale)",
    category: "SQL",
    filterCategories: ["SQL"],
    issueDate: "28/08/2026",
    credentialId: "SC-5720B98E13",
    image: "/images/sql-course-self-learning.jpg",
    description: "Mastery of relational database queries, complex SQL joins, data filtering, aggregations, schema design, and analytical queries.",
    keyMetrics: [
      { label: "ISSUER", value: "Skill Course" },
      { label: "CERTIFICATE ID", value: "SC-5720B98E13" },
      { label: "DATE", value: "28/08/2026" }
    ],
    skills: ["SQL", "Relational Databases", "Complex Queries", "Joins & Subqueries", "Aggregations"]
  },
  {
    id: "power-bi-self-learning",
    title: "Microsoft Power BI (Self Learning)",
    issuer: "Skill Course (Satish Dhawale)",
    category: "Power BI",
    filterCategories: ["Power BI"],
    issueDate: "02/10/2026",
    credentialId: "SC-B3D23A2305",
    image: "/images/power-bi-certificate.jpg",
    description: "End-to-end Business Intelligence mastery covering data modeling, DAX measure creation, Power Query ETL pipelines, and interactive executive dashboards.",
    keyMetrics: [
      { label: "ISSUER", value: "Skill Course" },
      { label: "CERTIFICATE ID", value: "SC-B3D23A2305" },
      { label: "DATE", value: "02/10/2026" }
    ],
    skills: ["Power BI", "DAX", "Power Query", "Data Modeling", "Business Intelligence"]
  },
  {
    id: "data-science-internship-codealpha",
    title: "Data Science Internship Certificate",
    issuer: "CodeAlpha",
    category: "Data Science",
    filterCategories: ["Data Science"],
    issueDate: "Completed",
    image: "/images/data-science-internship-codealpha.png",
    pdfUrl: "/certificates/data-science-internship-codealpha.pdf",
    description: "Completed intensive data science and analytical assignments, focusing on exploratory data analysis (EDA), predictive modeling, and data analytics workflows.",
    keyMetrics: [
      { label: "ISSUER", value: "CodeAlpha" },
      { label: "ROLE", value: "Intern" },
      { label: "DOMAIN", value: "Data Science" }
    ],
    skills: ["Data Analysis", "EDA", "Model Building", "Python", "Analytics Workflow"]
  },
  {
    id: "python-101-for-data-science-cognitive-class",
    title: "Python for Data Science",
    issuer: "Cognitive Class (IBM Developer Skills Network)",
    category: "Data Science",
    filterCategories: ["Data Science"],
    issueDate: "Completed",
    image: "/images/python-101-for-data-science-cognitive-class.png",
    pdfUrl: "/certificates/python-101-for-data-science-cognitive-class.pdf",
    description: "Hands-on foundation in Python programming for data science, data wrangling with Pandas and NumPy, data visualization, and exploratory analysis.",
    keyMetrics: [
      { label: "ISSUER", value: "Cognitive Class" },
      { label: "ENDORSED BY", value: "IBM Network" },
      { label: "DOMAIN", value: "Data Science" }
    ],
    skills: ["Python", "Pandas", "NumPy", "Data Wrangling", "Data Visualization"]
  },
  {
    id: "big-data-foundation-ibm",
    title: "Big Data Foundation",
    issuer: "IBM SkillsBuild (Cognitive Class)",
    category: "Big Data",
    filterCategories: ["Big Data"],
    issueDate: "Completed",
    image: "/images/big-data-for-beginner-ibm.png",
    pdfUrl: "/certificates/big-data-for-beginner-ibm.pdf",
    description: "Foundational mastery in Big Data architecture, distributed systems, Hadoop ecosystem fundamentals, and large-scale data engineering workflows.",
    keyMetrics: [
      { label: "ISSUER", value: "IBM SkillsBuild" },
      { label: "TYPE", value: "Foundation" },
      { label: "DOMAIN", value: "Big Data" }
    ],
    skills: ["Big Data", "Hadoop Ecosystem", "Distributed Systems", "Data Architecture"]
  },
  {
    id: "machine-learning-using-python-simplilearn",
    title: "Machine Learning using Python",
    issuer: "Simplilearn (SkillUp)",
    category: "Machine Learning",
    filterCategories: ["Machine Learning"],
    issueDate: "Completed",
    image: "/images/machine-learning-using-python-simplilearn.png",
    pdfUrl: "/certificates/machine-learning-using-python-simplilearn.pdf",
    description: "Professional certification covering supervised and unsupervised machine learning algorithms, model evaluation metrics, feature engineering, and predictive pipelines in Python.",
    keyMetrics: [
      { label: "ISSUER", value: "Simplilearn" },
      { label: "PROGRAM", value: "SkillUp" },
      { label: "DOMAIN", value: "Machine Learning" }
    ],
    skills: ["Machine Learning", "Supervised Learning", "Scikit-Learn", "Feature Engineering", "Python"]
  },
  {
    id: "leetcode-50-days-badge-2026",
    title: "LeetCode 50 Days Badge 2026",
    issuer: "LeetCode",
    category: "LeetCode",
    filterCategories: ["LeetCode"],
    issueDate: "2026",
    image: "/images/leetcode-50-days-badge-2026.jpg",
    verificationUrl: "https://leetcode.com/u/Khilender_rajput/",
    description: "Earned on LeetCode for completing 50+ days of consistent algorithmic problem solving, focusing on SQL queries, data structures, and algorithmic programming challenges.",
    keyMetrics: [
      { label: "PLATFORM", value: "LeetCode" },
      { label: "ACHIEVEMENT", value: "50 Days Badge" },
      { label: "YEAR", value: "2026" }
    ],
    skills: ["Data Structures", "Algorithms", "SQL", "Problem Solving", "Python"]
  }
];

export const AUDIO_PLAYLIST: Track[] = [
  {
    id: "track-1",
    title: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover",
    duration: "2:58",
    durationMs: 178426,
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/af/81/44af8168-9609-1b85-5048-ada08dceacf3/mzaf_1341699644335558812.plus.aac.p.m4a",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/49/3d/ab/493dab54-f920-9043-6181-80993b8116c9/19UMGIM53909.rgb.jpg/600x600bb.jpg"
  },
  {
    id: "track-2",
    title: "The Night We Met",
    artist: "Lord Huron",
    album: "Strange Trails",
    duration: "3:28",
    durationMs: 208227,
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4b/36/b7/4b36b739-1de7-e0ae-45da-9a66463127ac/mzaf_1821541347983595183.plus.aac.p.m4a",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/55/41/4a/55414a18-861a-79d1-e575-5bf8cf205dbe/886445056839_Cover.jpg/600x600bb.jpg"
  },
  {
    id: "track-3",
    title: "Tum Se Hi",
    artist: "Pritam & Mohit Chauhan",
    album: "Jab We Met",
    duration: "5:21",
    durationMs: 321225,
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e7/39/b8/e739b870-54a1-8f33-57d5-3817108b8bd9/mzaf_16925921654959290990.plus.aac.p.m4a",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3d/c7/43/3dc74387-e7f4-2342-397c-4cf2037c69a5/8902894623223_cover.jpg/600x600bb.jpg"
  },
  {
    id: "track-4",
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    duration: "3:58",
    durationMs: 238805,
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a3/4c/b9/a34cb911-40fc-5f0c-e862-14bd171a77aa/mzaf_384792072030970151.plus.aac.p.m4a",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/da/8b/77/da8b7731-6f4f-eacf-5e74-8b23389eefa1/20UMGIM03371.rgb.jpg/600x600bb.jpg"
  }
];
