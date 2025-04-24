import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer, Navbar, mainNavLinks } from "@/app";

/**
 * Geist Sans font configuration
 * @description Primary sans-serif font for general text
 * @customize Change 'subsets' array to add more language support
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Geist Mono font configuration
 * @description Monospace font for code and technical content
 * @customize Change 'subsets' array to add more language support
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata configuration for SEO and social sharing
 * @description Defines all meta tags for the application
 * @customize Update all fields to match your project's details
 */
const metadata: Metadata = {
  /**
   * Basic meta tags
   * @customize Update title, description, and keywords for SEO
   */
  title: "Project Title | Short Description",
  description:
    "Detailed project description for search engines and social sharing",
  keywords: "keyword1, keyword2, keyword3",
  authors: [{ name: "Your Name" }],

  /**
   * Base URL for the website
   * @customize Update URL to match your production domain
   */
  metadataBase: new URL("https://your-domain.com"),

  /**
   * Open Graph meta tags for social sharing
   * @customize Update all fields to match your project's social sharing needs
   */
  openGraph: {
    title: "Project Title | Social Share Title",
    description: "Social sharing description",
    url: "https://your-domain.com",
    siteName: "Site Name",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Place in public directory
        width: 1200,
        height: 630,
        alt: "Social share image alt text",
      },
    ],
  },

  /**
   * Twitter card meta tags
   * @customize Update all fields for Twitter sharing appearance
   */
  twitter: {
    card: "summary_large_image",
    title: "Twitter Share Title",
    description: "Twitter share description",
  },
};

/**
 * Root layout component
 * @description Main layout wrapper for the entire application
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to render
 * @customize Modify className to adjust global styles
 */
async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-b from-black via-[#0c0c0c] to-black ${geistSans.variable} ${geistMono.variable} 
          antialiased 
          min-h-screen `}
      >
        {/* 
          Main content wrapper
          @customize Add global layouts, providers, or context here 
        */}
        <Navbar
          logoSrc="/assets/images/logo.png"
          logoAlt="Company Logo"
          links={mainNavLinks}
        />
        {children}

        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;

export { metadata };
