export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
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
  linkedIn: "https://linkedin.com/in/khilender-rajput",
  github: "https://github.com/khilender-rajput",
  summary:
    "Data Analyst and B.Tech Computer Science Engineering student specializing in Data Analytics, Machine Learning, and AI. Skilled in data analysis, data cleaning, exploratory data analysis (EDA), SQL querying, and Power BI dashboards that turn raw data into actionable business insights.",
  aboutDetailed: [
    "I specialize in bridging the gap between raw unstructured data and actionable strategic decision-making. My technical domain focuses on end-to-end data analytics workflows—from data wrangling in Python (Pandas/NumPy) and SQL database querying to crafting high-impact interactive Power BI dashboards.",
    "My hands-on analytical projects span retail customer purchase behavior, financial credit card risk monitoring, and OTT subscription churn prediction. I focus on actionable KPIs, customer lifetime value (CLTV) erosion, and data-backed business optimization.",
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
    id: "retail-customer-analytics",
    title: "Retail Customer Behavior & Shopping Trends Analysis",
    subtitle: "End-to-end retail workflow transforming raw customer data into growth insights.",
    category: "Data Analytics & Customer Intelligence",
    technologies: ["Python (Pandas)", "SQL", "Power BI", "GitHub", "Jupyter Notebook"],
    description: "Architected an end-to-end data analytics pipeline to clean, query, and visualize shopping patterns across customer segments, improving data-driven retail decision-making.",
    longDescription: "Led an end-to-end retail data analytics workflow on customer transaction datasets. Used Python (Pandas) for data cleaning, outlier treatment, and feature transformation, followed by complex SQL queries to identify purchase frequency, spending spikes, and high-value customer demographics. Designed an interactive Power BI dashboard published for stakeholder reporting.",
    keyMetrics: [
      { label: "Data Pipeline Cleaned", value: "100k+ Rows" },
      { label: "Decision Efficiency", value: "+28%" },
      { label: "Customer Segments", value: "4 Cohorts" }
    ],
    highlights: [
      "Loaded, cleaned, and transformed multi-file customer purchase datasets using Pandas & NumPy.",
      "Executed SQL queries to calculate average order value (AOV), customer retention rate, and repeat purchase frequency.",
      "Designed and published an interactive Power BI dashboard featuring dynamic slicers and trend visualizers.",
      "Published complete data wrangling workflow, SQL scripts, and dashboard mockups on GitHub."
    ],
    sqlSnippet: `-- Retail Shopping Pattern & Cohort Analysis Query
WITH CustomerPurchases AS (
  SELECT 
    customer_id,
    gender,
    age,
    category,
    purchase_amount_usd,
    COUNT(item_purchased) OVER(PARTITION BY customer_id) AS total_orders,
    NTILE(4) OVER(ORDER BY purchase_amount_usd DESC) AS spend_tier
  FROM retail_transactions
  WHERE payment_status = 'Completed'
)
SELECT 
  category,
  spend_tier,
  COUNT(DISTINCT customer_id) AS active_shoppers,
  ROUND(AVG(purchase_amount_usd), 2) AS avg_ticket_size,
  ROUND(SUM(purchase_amount_usd), 2) AS total_revenue
FROM CustomerPurchases
GROUP BY category, spend_tier
ORDER BY total_revenue DESC;`,
    pythonSnippet: `# Retail Customer Segmentation & Data Cleaning Pipeline
import pandas as pd
import numpy as np

def clean_retail_dataset(filepath):
    df = pd.read_csv(filepath)
    
    # Clean missing values and format dates
    df['Purchase Amount (USD)'].fillna(df['Purchase Amount (USD)'].median(), inplace=True)
    df['Category'] = df['Category'].str.strip().str.title()
    
    # Calculate Customer Recency & Frequency
    df['Spending_Segment'] = pd.qcut(df['Purchase Amount (USD)'], q=4, labels=['Low', 'Medium', 'High', 'VIP'])
    
    print(f"Data Processed: {len(df)} records. VIP Revenue Share: {df[df['Spending_Segment'] == 'VIP']['Purchase Amount (USD)'].sum()}")
    return df`,
    powerBiPreview: {
      kpis: [
        { title: "Total Retail Revenue", value: "$4.82M", change: "+14.2%", isPositive: true },
        { title: "Avg Order Value (AOV)", value: "$78.50", change: "+5.1%", isPositive: true },
        { title: "Repeat Purchase Rate", value: "42.8%", change: "+3.4%", isPositive: true },
        { title: "Top Category", value: "Apparel & Accessories", change: "34% Share", isPositive: true }
      ],
      chartTitle: "Monthly Category Spend Distribution ($K)",
      chartData: [
        { name: "Q1 Jan", val1: 120, val2: 85 },
        { name: "Q1 Feb", val1: 145, val2: 92 },
        { name: "Q1 Mar", val1: 180, val2: 110 },
        { name: "Q2 Apr", val1: 210, val2: 135 },
        { name: "Q2 May", val1: 250, val2: 160 },
        { name: "Q2 Jun", val1: 290, val2: 195 }
      ]
    },
    githubUrl: "https://github.com/khilender-rajput/retail-customer-behavior-analysis"
  },
  {
    id: "credit-card-financial-dashboard",
    title: "Credit Card Financial Dashboard & Risk Analytics",
    subtitle: "Real-time financial KPI tracking and spend trend pattern monitoring.",
    category: "Financial Analytics & BI Reporting",
    technologies: ["Power BI", "SQL", "DAX", "Microsoft Excel"],
    description: "Developed an interactive Power BI dashboard backed by SQL data models to monitor financial transaction metrics, spending habits, and delinquency risk across cardholder segments.",
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
    githubUrl: "https://github.com/khilender-rajput/credit-card-financial-dashboard"
  },
  {
    id: "ott-subscription-churn-analytics",
    title: "OTT Subscription Churn & Revenue Analytics",
    subtitle: "End-to-end subscriber churn risk modeling and MRR retention strategy.",
    category: "Predictive Analytics & Revenue Retention",
    technologies: ["Python", "SQL", "Power BI", "Pandas", "Scikit-Learn"],
    description: "Built an end-to-end subscriber churn analysis model analyzing 20+ KPIs to uncover contract tier disparity, quantify MRR leakage, and model CLTV erosion.",
    longDescription: "Engineered a multi-table analytics pipeline examining subscriber signups, viewing habits, payment methods, and contract terms. Identified that monthly contract holders churned at 4x the rate of annual subscribers, calculating exact Monthly Recurring Revenue (MRR) leakage. Created a churn risk scoring model and proposed a targeted retention campaign.",
    keyMetrics: [
      { label: "Subscription KPIs", value: "20+" },
      { label: "MRR Leakage Uncovered", value: "$142K/mo" },
      { label: "Retention Impact", value: "+19.4%" }
    ],
    highlights: [
      "Integrated multi-table OTT subscriber logs across contract types, streaming hours, and support tickets.",
      "Uncovered significant churn disparity between monthly vs annual plans, measuring CLTV erosion across cohorts.",
      "Constructed a churn risk scoring logic using Python (logistic regression & decision trees) to flag at-risk subscribers.",
      "Formulated data-backed contract migration retention strategies presented via Power BI dashboard."
    ],
    sqlSnippet: `-- OTT Subscriber Churn Risk & MRR Leakage Calculation
SELECT 
  contract_type,
  device_tier,
  COUNT(subscriber_id) AS total_subscribers,
  SUM(CASE WHEN churn_status = 1 THEN 1 ELSE 0 END) AS churned_count,
  ROUND(SUM(CASE WHEN churn_status = 1 THEN monthly_fee ELSE 0 END), 2) AS monthly_mrr_leakage,
  ROUND(AVG(watch_hours_per_week), 1) AS avg_weekly_engagement
FROM ott_subscriber_analytics
GROUP BY contract_type, device_tier
ORDER BY monthly_mrr_leakage DESC;`,
    pythonSnippet: `# Churn Risk Scoring & Cohort Classification
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

def train_churn_model(df):
    features = ['monthly_fee', 'watch_hours', 'support_tickets', 'tenure_months']
    X = df[features]
    y = df['churned']
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    # Output risk probability scores
    df['churn_risk_score'] = model.predict_proba(X)[:, 1]
    at_risk = df[df['churn_risk_score'] > 0.70]
    print(f"High Risk Cohort Identified: {len(at_risk)} subscribers ($ {at_risk['monthly_fee'].sum()} MRR at risk)")
    return df`,
    powerBiPreview: {
      kpis: [
        { title: "Monthly Churn Rate", value: "4.85%", change: "-0.95%", isPositive: true },
        { title: "Monthly MRR Leakage", value: "$142.5K", change: "-14%", isPositive: true },
        { title: "Avg Customer Lifetime (CLTV)", value: "26.4 mos", change: "+2.2 mos", isPositive: true },
        { title: "High-Risk Subscribers", value: "1,240", change: "-210", isPositive: true }
      ],
      chartTitle: "Subscriber Churn Rate by Contract Type (%)",
      chartData: [
        { name: "Month-to-Month", val1: 8.4, val2: 6.2 },
        { name: "6-Month Plan", val1: 3.2, val2: 2.5 },
        { name: "1-Year Plan", val1: 1.1, val2: 0.8 },
        { name: "2-Year Plan", val1: 0.4, val2: 0.3 }
      ]
    },
    githubUrl: "https://github.com/khilender-rajput/ott-subscription-churn-analytics"
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
