"use client"

import { MailIcon, MapPinIcon, PhoneIcon, Loader2 } from "lucide-react";
import { ContactCard } from "../contact-card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

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
                    phone: "",
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
                    contactInfo={[
                        {
                            icon: MailIcon,
                            label: "Email",
                            value: "kaariminnocent@gmail.com",
                        },
                        {
                            icon: PhoneIcon,
                            label: "Phone",
                            value: "+92 317 3009130",
                        },
                        {
                            icon: MapPinIcon,
                            label: "Address",
                            value: "Karachi, Pakistan",
                            className: "col-span-2",
                        },
                    ]}
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
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
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