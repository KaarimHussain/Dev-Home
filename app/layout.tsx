import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const geistMono = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kaarim Hussain | Full Stack Developer & UI/UX Engineer",
    template: "%s | Kaarim Hussain",
  },
  description: "Expert Full Stack Developer specializing in Next.js, React, and modern web solutions. Explore my portfolio of high-performance web and mobile applications.",
  keywords: ["Full Stack Developer", "Web Developer", "React Developer", "Next.js", "TypeScript", "Tailwind CSS", "Kaarim Hussain", "Portfolio", "UI/UX Design", "Mobile App Developer", "Flutter"],
  creator: "Kaarim Hussain",
  icons: {
    icon: "/images/Logo-White.png",
    shortcut: "/images/Logo-White.png",
    apple: "/images/Logo-White.png",
  },
  openGraph: {
    title: "Kaarim Hussain | Full Stack Developer",
    description: "Building exceptional digital experiences with modern technologies. Explore my projects and skills.",
    url: "https://kaarimhussain.com", // Placeholder, change if user provides actual domain
    siteName: "Kaarim Hussain Portfolio",
    images: [
      {
        url: "/images/Open-Graph-Preview.png",
        width: 1200,
        height: 630,
        alt: "Kaarim Hussain Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaarim Hussain | Full Stack Developer",
    description: "Expert Full Stack Developer specializing in Next.js, React, and modern web solutions.",
    images: ["/images/Open-Graph-Preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
