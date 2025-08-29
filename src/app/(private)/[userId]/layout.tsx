"use client";

import {Navbar} from "@/components/navbar";
import {useEffect} from "react";
import {onAuthStateChanged} from "@firebase/auth";
import {auth} from "@/firebase";
import {useRouter} from "next/navigation";
export default function Layout() {
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login");
            }
        })
    }, []);
    return (
        <div className="w-full">
            <Navbar />
        </div>
    )
}