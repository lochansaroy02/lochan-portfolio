"use client";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

// Move static data outside to prevent re-creation on every render
const SOCIAL_LINKS = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/lochankumar47/",
        icon: <Linkedin size={20} />,
        hoverClass: "hover:bg-blue-600",
    },
    {
        name: "GitHub",
        href: "https://github.com/lochansaroy02",
        icon: <Github size={20} />,
        hoverClass: "hover:bg-black",
    },
    {
        name: "Twitter",
        href: "http://x.com/LochanSaroy824",
        icon: <Twitter size={20} />,
        hoverClass: "hover:bg-sky-500",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/lochansaroy47/",
        icon: <Instagram size={20} />,
        hoverClass: "hover:bg-pink-600",
    },
];

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error",);
            console.error(error)
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            {/* Main Grid Container */}
            <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-[#0a1d2e]/50 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">

                {/* Left Side: Contact Info & Socials */}
                <div className="p-10 bg-zinc-50 dark:bg-zinc-800/50 flex flex-col justify-between">
                    <div>
                        {/* Fixed the apostrophe error here */}
                        <h1 className="text-4xl font-bold mb-6 text-zinc-800 dark:text-white">Let&apos;s grow together</h1>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg">
                            Have a project in mind or want to collaborate? Feel free to reach out via the form or my social channels below.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-500">Email</p>
                                    <p className="font-medium">lochansaroy47@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-500">Phone</p>
                                    <p className="font-medium">+91 7017308109</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-500">Location</p>
                                    <p className="font-medium">New Delhi, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">Connect with me</p>
                        <div className="flex gap-4">
                            {SOCIAL_LINKS.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center hover:text-white transition-all ${social.hoverClass}`}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Project Inquiry"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? 'Sending...' : (
                                <>
                                    Send Message <Send size={18} />
                                </>
                            )}
                        </button>

                        {status === "success" && (
                            <p className="text-green-600 text-sm text-center mt-2">Message sent successfully!</p>
                        )}
                        {status === "error" && (
                            <p className="text-red-500 text-sm text-center mt-2">Something went wrong. Please try again.</p>
                        )}
                    </form>
                </div>

            </div> {/* This now correctly closes the grid */}
        </div>
    );
};

export default ContactPage;