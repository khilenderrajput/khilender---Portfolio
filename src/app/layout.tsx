import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Khilender Rajput — Data Analyst | SQL, Python & Power BI',
  description:
    'Portfolio of Khilender Rajput, Data Analyst and B.Tech CSE student specializing in Data Analytics, SQL, Python (Pandas), Power BI dashboards, customer segmentation, and subscription churn modeling.',
  keywords: [
    'Khilender Rajput',
    'Data Analyst',
    'Data Analytics Portfolio',
    'SQL Analyst',
    'Power BI Specialist',
    'Python Pandas Analytics',
    'Churn Analytics',
    'Financial Dashboard',
    'Retail Data Analytics'
  ],
  authors: [{ name: 'Khilender Rajput' }],
  creator: 'Khilender Rajput',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Khilender Rajput — Data Analyst | SQL, Python & Power BI',
    description:
      'Explore end-to-end Data Analytics projects in Retail Behavior, Credit Card Financial Dashboards, and OTT Subscription Churn Analytics.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Khilender Rajput Data Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khilender Rajput — Data Analyst Portfolio',
    description: 'Data Analytics, SQL, Python, Power BI, and BI Dashboarding.',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Khilender Rajput',
  jobTitle: 'Data Analyst',
  knowsAbout: [
    'Data Analytics',
    'SQL',
    'Python',
    'Power BI',
    'Pandas',
    'Exploratory Data Analysis',
    'Customer Segmentation',
    'Churn Modeling'
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Teerthanker Mahaveer University',
  },
  email: 'mailto:khilendrrajput95@gmail.com',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData),
          }}
        />
      </head>
      <body className="antialiased selection:bg-gold selection:text-accent-ink bg-bgDark text-cream" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
