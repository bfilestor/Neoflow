import React from 'react';
import { Github } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="border-t">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className='flex gap-1 items-center justify-start '>
                    <svg className="" width="30" height="30" viewBox="0 0 55 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect className="stroke-primary/80" x="14.4954" y="0.998303" width="18" height="60" rx="9" transform="rotate(13 14.4954 0.998303)" stroke="black" strokeWidth="5" />
                        <rect className="stroke-primary/80" x="36.4954" y="22.9983" width="18" height="60" rx="9" transform="rotate(13 36.4954 22.9983)" stroke="black" strokeWidth="5" />
                    </svg>
                    <h1 className='text-base font-semibold tracking-wider'>Neoflow</h1>
                </div>
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/kiraaziz/Neoflow" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="w-6 h-6" />
                        </a>
                        <p className="text-sm text-muted-foreground">
                            © 2024 Neoflow. Open source with love.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
