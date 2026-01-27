import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore the portfolio of Kaarim Hussain, featuring web and mobile applications built with modern technologies.",
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
