"use client"
import {useState} from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const Navbar = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl sm:inline">Smart Budget</span>
                </Link>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <button className="text-gray-600 hover:text-gray-900">
                            <Menu className="h-6 w-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] px-2">
                        <SheetTitle className="flex pt-3">Menu</SheetTitle>
                        <div className="flex flex-col items-start space-y-4 pt-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="w-full text-lg text-gray-800 hover:text-gray-900"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
)
}