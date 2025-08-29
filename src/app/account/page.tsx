"use client"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {addDoc, collection} from "firebase/firestore";
import {db} from "@/firebase";
import {useRouter} from "next/navigation";


export default function Account() {
    const [accountName, setAccountName] = useState<string>("");
    const [balance, setBalance] = useState<number>(1);
    const [isMain, setIsMain] = useState<boolean>(false);
    const router = useRouter();

    async function addAccount(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (accountName !== "") {
            try {
                await addDoc(collection(db, "accounts"), {
                    accountName,
                    balance,
                    isMain,
                })
                router.push("/")
                console.log("Document written with ID: ");
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="w-full px-2 flex flex-col gap-4">
            <h1>Add an Account</h1>
            <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Account Name</Label>
                    <Input name="balance" value={accountName} onChange={e => setAccountName(e.target.value)}
                           type="text" required/>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="balance">Budget Limit</Label>
                    <Input name="balance" value={balance} onChange={e => setBalance(Number(e.target.value))}
                           type="number"
                           min="0" step="0.01" required/>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Main Account?</Label>
                    <RadioGroup onValueChange={value => {
                        if (value === "yes") {
                            setIsMain(true);
                        } else setIsMain(false);
                    }} defaultValue={isMain ? "yes" : "no"}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="option-one"/>
                            <Label htmlFor="option-one">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="option-two"/>
                            <Label htmlFor="option-two">No</Label>
                        </div>
                    </RadioGroup>
                </div>

                <Button onClick={e => addAccount(e)}>Submit</Button>
            </form>
        </div>
    )
}