"use client"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import React, {useState} from "react";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {auth, db} from "@/firebase";
import {useRouter} from "next/navigation";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";

export default function SignUp() {
    const router = useRouter();
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [retypePassword, setRetypePassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (password === retypePassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (user) => {
                    try {
                        await setDoc(doc(db, "users", user.user.uid), {
                            userId: user.user.uid,
                            email: user.user.email,
                            userName,
                        })
                        router.push(`/${user.user.uid}`)
                    } catch (err) {
                        console.log(err);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                })
        }
    }
    return (
        <div className="font-sans px-2 min-h-screen w-full flex flex-col h-full items-center justify-center">
            <main className="flex flex-col h-full gap-4 px-2">
                <div className="flex flex-col h-full items-center justify-center gap-6">
                    <h1>Sign Up</h1>
                    <form className="flex flex-col h-full items-center justify-center gap-6">
                        <Input onChange={e => setUserName(e.target.value)} type="text" placeholder="Display Name" />
                        <Input onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <Input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        <Input onChange={e => setRetypePassword(e.target.value)} type="password" placeholder="Retype Password" />
                        <Button onClick={e => handleSubmit(e)} className="w-full" type="submit">Register</Button>
                        {error !== null && <p className="text-danger">{error}</p>}
                    </form>
                    <p>Already have an account?</p>
                    <Link className="underline" href="/login">Sign In!</Link>
                </div>
            </main>

        </div>
    )
}