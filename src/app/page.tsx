"use client"
import {addDoc, collection, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebase';
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Account, Budget, BudgetCategories} from "@/lib/utils";



export default function Home() {
    const [category, setCategory] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const accountsColRef = collection(db, "accounts");
    const budgetsColRef = collection(db, "budgets");
    useEffect(() => {
        const unsubscribe = onSnapshot(accountsColRef, (querySnapshot) => {
            const accounts = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    accountId: doc.id,
                    accountName: data.accountName,
                    balance: data.balance,
                    isMain: data.isMain,
                }
            })
            setAccounts(accounts);
        })
        const budgetFetch = onSnapshot(budgetsColRef, (querySnapshot) => {
            const budgets = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    value: data.value,
                    category: data.category,
                    id: doc.id,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    lineItems: data.lineItems,

                }
            })
            setBudgets(budgets);
        })
        return () => {
            unsubscribe();
            budgetFetch();
        }
    }, []);

    const calculateLeftover = (budgets: Budget[]) => {
        if (accounts.length === 0) {
            return 0
        } else {
            const mainAccount = accounts.find(item => item.isMain)
            if (mainAccount !== undefined) {
                return budgets.reduce((acc, curr): number => {
                    acc -= curr.value
                    return acc;
                }, mainAccount.balance)
            }

        }
    }

    return (
        <div className="font-sans px-2 min-h-screen w-full">
            <main className="flex flex-col h-full gap-4 px-2">
                {/*  Main left over amount right at the top  */}
                <div>
                    {budgets && budgets.length > 0 && accounts && accounts.length > 0 &&
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-4xl">Liquid Leftover</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-5xl font-bold">{calculateLeftover(budgets)}</p>
                            </CardContent>
                            <CardFooter>
                                <p>Next Pay Date: 20/08/2025</p>
                            </CardFooter>
                        </Card>}
                </div>

                {/*  Budgets  */}
                <div>
                    <h2 className="font-semibold">My Monthly Budgets</h2>
                    <Card>
                        <CardContent>
                            {
                                budgets && budgets.length > 0 &&
                                budgets.map(
                                    item =>
                                        <div key={item.id} className="flex justify-between items-center">
                                            <span>{BudgetCategories[item.category as keyof typeof BudgetCategories]} </span><span>£{item.value}</span>
                                        </div>
                                )
                            }
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    );
}
