"use client"
import { Github, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="border-b border-input sticky top-0">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className='flex gap-1 items-center justify-start '>
                    <svg className="" width="30" height="30" viewBox="0 0 55 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect className="stroke-primary/80" x="14.4954" y="0.998303" width="18" height="60" rx="9" transform="rotate(13 14.4954 0.998303)" stroke="black" strokeWidth="5" />
                        <rect className="stroke-primary/80" x="36.4954" y="22.9983" width="18" height="60" rx="9" transform="rotate(13 36.4954 22.9983)" stroke="black" strokeWidth="5" />
                    </svg>
                    <h1 className='text-base font-semibold tracking-wider'>Neoflow</h1>
                </div>
                <div className="hidden md:flex items-center space-x-6 mx-auto ">
                    <a href="#home" className="text-sm hover:text-primary transition-colors">Home</a>
                    <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
                    <a href="#installation" className="text-sm hover:text-primary transition-colors">Installation</a>
                    <a href="#community" className="text-sm hover:text-primary transition-colors">Community</a>
                    <a href="#faq" className="text-sm hover:text-primary transition-colors">FAQ</a>
                </div>

                {/* Right section - Theme toggle and social links */}
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={!mounted}
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        className="hover:bg-transparent"
                    >
                        {mounted ? (
                            resolvedTheme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )
                        ) : (
                            <span className="h-5 w-5" />
                        )}
                    </Button>
                    <div className="h-5 border-r border-input ml-4 mr-6" />
                    <a
                        href="https://discord.gg/4BpxBW5g"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors mr-4"
                    >
                        <img src="/contact/9.svg" className="h-6 w-6" />
                    </a>

                    <a
                        href="https://github.com/kiraaziz/Neoflow"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </nav>
    );
};
