"use client"
import {auth} from '@/firebase';
import {onAuthStateChanged} from "@firebase/auth";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push(`/${user.uid}`);
            } else router.push('/login');
        })
    }, []);
    return (
        <div className="font-sans px-2 min-h-screen w-full">
            <main className="flex flex-col h-full gap-4 px-2">
                <div>
                    <h1>Welcome to Smart Budget</h1>
                    <p>Checking your creds...</p>
                </div>
            </main>

        </div>
    );
}