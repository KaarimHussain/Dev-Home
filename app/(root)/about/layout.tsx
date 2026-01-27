import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Me",
    description: "Learn more about Kaarim Hussain, a software engineer passionate about building digital experiences.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
