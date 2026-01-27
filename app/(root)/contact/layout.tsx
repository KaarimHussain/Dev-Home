import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Me",
    description: "Get in touch with Kaarim Hussain for collaboration, project inquiries, or just to say hi.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
