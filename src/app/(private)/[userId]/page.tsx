"use client"
import {addDoc, collection, getAggregateFromServer, onSnapshot, sum} from 'firebase/firestore';
import {db} from '@/firebase';
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Account, Budget, BudgetCategories, User} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useRouter, useParams} from "next/navigation";
import {auth} from "@/firebase";

export default function Home() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    // const [accounts, setAccounts] = useState<Account[]>([]);
    // const [budgets, setBudgets] = useState<Budget[]>([]);
    // const [transactionsTotal, setTransactionsTotal] = useState<number>(0);
    // const accountsColRef = collection(db, "accounts");
    // const budgetsColRef = collection(db, "budgets");
    // const transactionsColRef = collection(db, "transactions");
    useEffect(() => {
        // const unsubscribe = onSnapshot(accountsColRef, (querySnapshot) => {
        //     const accounts = querySnapshot.docs.map(doc => {
        //         const data = doc.data();
        //         return {
        //             accountId: doc.id,
        //             accountName: data.accountName,
        //             balance: data.balance,
        //             isMain: data.isMain,
        //             includeInLiquid: data.includeInLiquid,
        //         }
        //     })
        //     setAccounts(accounts);
        // })
        // const budgetFetch = onSnapshot(budgetsColRef, (querySnapshot) => {
        //     const budgets = querySnapshot.docs.map(doc => {
        //         const data = doc.data();
        //         return {
        //             value: data.value,
        //             category: String(data.category),
        //             id: doc.id,
        //             startDate: data.startDate,
        //             endDate: data.endDate,
        //             lineItems: data.lineItems,
        //
        //         }
        //     })
        //     setBudgets(budgets);
        // })

        // const getTransactionsTotals = async () => {
        //     return await getAggregateFromServer(transactionsColRef, {
        //         total: sum('value')
        //     })
        //
        // }
        // getTransactionsTotals().then(result => setTransactionsTotal(result.data().total));



        return () => {
            // unsubscribe();
            // budgetFetch();

        }
    }, []);

    // const calculateLeftover = (budgets: Budget[], transactionsTotal: number) => {
    //     if (accounts.length === 0) {
    //         return 0
    //     } else {
    //         const accountsTotal = accounts.reduce((acc, curr) => {
    //             if (curr.includeInLiquid) {
    //                 acc += curr.balance
    //             }
    //             return acc;
    //         }, 0)
    //
    //         console.log(accountsTotal)
    //
    //         const temp = budgets.reduce((acc, curr): number => {
    //             acc -= curr.value
    //             return acc;
    //         }, accountsTotal)
    //         return Math.abs(temp - transactionsTotal)
    //     }
    // }
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            console.log(user)
        }
    }, []);
    return (
        <div className="font-sans px-2 min-h-screen w-full">
            <main className="flex flex-col h-full gap-4 px-2">
                {/*  Main left over amount right at the top  */}
                {/*<div>*/}
                {/*    {budgets && budgets.length > 0 && accounts && accounts.length > 0 &&*/}
                {/*        <Card>*/}
                {/*            <CardHeader>*/}
                {/*                <CardTitle className="text-4xl">Liquid Leftover</CardTitle>*/}
                {/*            </CardHeader>*/}
                {/*            <CardContent>*/}
                {/*                <p className="text-5xl font-bold">£{calculateLeftover(budgets, transactionsTotal)}</p>*/}
                {/*            </CardContent>*/}
                {/*            <CardFooter>*/}
                {/*                <p>Next Pay Date: 20/08/2025</p>*/}
                {/*            </CardFooter>*/}
                {/*        </Card>}*/}
                {/*</div>*/}

                {/*<Card>*/}
                {/*    <CardHeader>*/}
                {/*        <CardTitle className="text-4xl">Transactions Total</CardTitle>*/}
                {/*    </CardHeader>*/}
                {/*    <CardContent>*/}
                {/*        <p className="text-5xl font-bold">£{transactionsTotal}</p>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}

                {/*/!*  Budgets  *!/*/}
                {/*<div>*/}
                {/*    <h2 className="font-semibold">My Monthly Budgets</h2>*/}
                {/*    <Card>*/}
                {/*        <CardContent>*/}
                {/*            {*/}
                {/*                budgets && budgets.length > 0 &&*/}
                {/*                budgets.map(*/}
                {/*                    item =>*/}
                {/*                        <div key={item.id} className="flex justify-between items-center">*/}
                {/*                            <span>{BudgetCategories[item.category as keyof typeof BudgetCategories]} </span><span>£{item.value}</span>*/}
                {/*                        </div>*/}
                {/*                )*/}
                {/*            }*/}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <h2 className="font-semibold">My Accounts</h2>*/}
                {/*    <Card>*/}
                {/*        <CardContent>*/}
                {/*            {*/}
                {/*                accounts && accounts.length > 0 &&*/}
                {/*                accounts.map(*/}
                {/*                    item =>*/}
                {/*                        <div key={item.accountId} className="flex justify-between items-center">*/}
                {/*                            <span>{item.accountName}</span><span>£{item.balance}</span>*/}
                {/*                        </div>*/}
                {/*                )*/}
                {/*            }*/}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*</div>*/}

                {/*<div className="w-full flex justify-between">*/}
                {/*    <Button onClick={() => router.push("/budget")}>Add Budget</Button>*/}
                {/*    <Button onClick={() => router.push("/account")}>Add Account</Button>*/}
                {/*    <Button onClick={() => router.push("/transactions")}>Add Transaction</Button>*/}
                {/*</div>*/}
            </main>

        </div>
    );
}
