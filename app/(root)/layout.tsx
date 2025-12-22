
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingSocials from "@/components/home/floating-socials";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <FloatingSocials />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
