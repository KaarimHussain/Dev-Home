"use client"

import { MailIcon, MapPinIcon, PhoneIcon, Loader2 } from "lucide-react";
import { ContactCard } from "../contact-card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [contactInfo, setContactInfo] = useState<any[]>([]);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await fetch('/api/contact');
                const data = await response.json();

                const iconMap: any = {
                    "MailIcon": MailIcon,
                    "PhoneIcon": PhoneIcon,
                    "MapPinIcon": MapPinIcon
                };

                const formattedData = data.map((item: any) => ({
                    ...item,
                    icon: iconMap[item.icon]
                }));

                setContactInfo(formattedData);
            } catch (error) {
                console.error("Failed to fetch contact info:", error);
            }
        };

        fetchContactInfo();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Message sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            } else {
                toast.error(data.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
            console.error("Error sending email:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-[50vh] w-full px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden bg-white">
                <ContactCard
                    contactInfo={contactInfo}
                    description="Whether you have a development project, a collaboration idea, or just want to connect about tech, I'd love to hear from you. Please fill out the form, and I'll respond promptly."
                    title="Get in touch"
                >
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="subject"
                                name="subject"
                                type="text"
                                placeholder="Enter your subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Enter your message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </form>
                </ContactCard>
            </div>
        </>
    )
}