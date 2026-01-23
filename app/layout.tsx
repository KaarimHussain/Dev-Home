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
  description: "Expert Full Stack Developer specializing in Next.js, .NET, and modern web solutions. Explore my portfolio of high-performance web and mobile applications.",
  keywords: [
    "Kaarim Hussain",
    "Full Stack Developer",
    "Senior Web Developer",
    "UI/UX Engineer",
    "Next.js Expert",
    "React Developer",
    "TypeScript Engineer",
    ".NET Core Developer",
    "ASP.NET Specialist",
    "Flutter Mobile Developer",
    "PHP Laravel Developer",
    "Modern Web Solutions",
    "Responsive Web Design",
    "Software Engineer Portfolio",
    "Web Application Development",
    "High Performance Websites",
    "User Experience Design",
    "Frontend Engineer",
    "Backend Developer",
    "Custom Software Development",
    "Mobile App Development",
    "Scalable Web Applications",
    "Next JS Developer",
  ],
  creator: "Kaarim Hussain",
  icons: {
    icon: "/images/Logo-White.png",
    shortcut: "/images/Logo-White.png",
    apple: "/images/Logo-White.png",
  },
  openGraph: {
    title: "Kaarim Hussain | Full Stack Developer",
    description: "Building exceptional digital experiences with modern technologies. Explore my projects and skills.",
    url: "https://my-home-rho-one.vercel.app/", // Placeholder, change if user provides actual domain
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
    site: "https://my-home-rho-one.vercel.app/",
    creator: "Kaarim Hussain",
    title: "Kaarim Hussain | Full Stack Developer",
    description: "Expert Full Stack Developer specializing in Next.js, .NET, and modern web solutions.",
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
