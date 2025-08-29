"use client"
import React, {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Account, BudgetCategories} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {addDoc, collection, onSnapshot} from "firebase/firestore";
import {db} from "@/firebase";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Calendar as CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

export default function Transactions() {
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("")
    const [account, setAccount] = useState<string>("")
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [date, setDate] = useState<Date>(new Date())

    const [value, setValue] = useState<number>(1);

    const accountsColRef = collection(db, "accounts");

    useEffect(() => {
        const unsubscribe = onSnapshot(accountsColRef, (querySnapshot) => {
            const accounts = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    accountId: doc.id,
                    accountName: data.accountName,
                    balance: data.balance,
                    isMain: data.isMain,
                    includeInLiquid: data.includeInLiquid,
                }
            })
            setAccounts(accounts);
        })

        return () => {
            unsubscribe();
        }
    }, []);

    async function addTransaction(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (category && account) {
            try {
                await addDoc(collection(db, "transactions"), {
                    title: title,
                    category: category,
                    value: value,
                    date: date,
                    accountId: account,
                })
                console.log("Document written with ID: ");
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className="w-full px-2 flex flex-col gap-4">
            <h1>Add a Transaction</h1>
            <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input name="title" value={title} onChange={e => setTitle(e.target.value)} type="text" required/>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Account</Label>
                    <Select value={account} onValueChange={value => setAccount(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an account"/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                accounts.map(item =>
                                    <SelectItem key={item.accountId}
                                                value={item.accountId}>{item.accountName}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={value => setCategory(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category"/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Object.entries(BudgetCategories).map(([key, value]) =>
                                    <SelectItem key={key} value={key}>{value}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="value">Value</Label>
                    <Input name="value" value={value} onChange={e => setValue(Number(e.target.value))} type="number"
                           min="0" step="0.01" required/>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="start-date">Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                data-empty={!date}
                                className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                            >
                                <CalendarIcon/>
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} required/>
                        </PopoverContent>
                    </Popover>
                </div>
                <Button onClick={e => addTransaction(e)}>Submit</Button>
            </form>
        </div>
    )
}