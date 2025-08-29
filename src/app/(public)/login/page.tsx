"use client"
import React, {useState} from "react";
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {auth, db} from "@/firebase";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                router.push(`/${user.user.uid}`)
            })
            .catch((error) => {
                setError(error.message);
            })
    }
    return (
        <div className="font-sans px-2 min-h-screen w-full flex flex-col h-full items-center justify-center">
            <main className="flex flex-col h-full gap-4 px-2">
                <div className="flex flex-col h-full w-full items-center justify-center gap-6">
                    <h1>Login</h1>
                    <form className="flex flex-col w-full h-full items-center justify-center gap-6">
                        <Input onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <Input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        <Button onClick={e => handleSubmit(e)} className="w-full" type="submit">Login</Button>
                        {error !== null && <p className="text-danger">{error}</p>}
                    </form>
                    <p>New to Smart Budget?</p>
                    <Link className="underline" href="/sign-up">Sign Up!</Link>
                </div>
            </main>

        </div>
    )
}