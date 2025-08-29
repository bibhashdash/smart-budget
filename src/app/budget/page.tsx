"use client"
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Calendar as CalendarIcon, SquarePlus} from "lucide-react"
import {Calendar} from "@/components/ui/calendar"
import {Button} from "@/components/ui/button"
import {Dialog, DialogTrigger,} from "@/components/ui/dialog"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {format} from "date-fns";
import {BudgetCategories, BudgetLineItem} from "@/lib/utils";
import {BudgetModal} from "@/app/budget/budgetModal";
import {db} from "@/firebase";
import {addDoc, collection} from "firebase/firestore";

export default function Budget() {
    const [category, setCategory] = useState<string>("")
    const [value, setValue] = useState<number>(1);
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [lineItems, setLineItems] = useState<Array<BudgetLineItem>>([])
    const [showLineItemForm, setShowLineItemForm] = useState<boolean>(false)
    const router = useRouter();
    // console.log(BudgetCategoriesEnum)
    for (const value of Object.values(BudgetCategories)) {
        // console.log(value)
    }
    async function addBudgetEntry(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (category) {
            try {
                await addDoc(collection(db, "budgets"), {
                    category: Number(category),
                    value: value,
                    startDate: startDate,
                    endDate: endDate,
                    lineItems: lineItems,
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
            <h1>Add a Budget</h1>
            <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Category</Label>
                    <Select value={category} onValueChange={value => setCategory(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Object.entries(BudgetCategories)
                                    .map(([key, value]) => key !== "9" && <SelectItem key={key} value={key}>{value}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="value">Budget Limit</Label>
                    <Input name="value" value={value} onChange={e => setValue(Number(e.target.value))} type="number"
                           min="0" step="0.01" required/>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                data-empty={!startDate}
                                className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                            >
                                <CalendarIcon/>
                                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={startDate} onSelect={setStartDate} required/>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="start-date">End Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                data-empty={!endDate}
                                className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                            >
                                <CalendarIcon/>
                                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={endDate} onSelect={setEndDate} required/>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Line Items</Label>
                    <ul>
                        {
                            lineItems && lineItems.length > 0 &&
                            lineItems.map((lineItem, index) =>
                                <li className="flex justify-between px-4" key={index}><p>{lineItem.name}</p><p>£{lineItem.value}</p></li>
                            )
                        }
                    </ul>
                    <Dialog open={showLineItemForm}>
                        <DialogTrigger>
                            <div role="button" onClick={() => setShowLineItemForm(true)}
                                 className="cursor-pointer px-2 py-4 flex flex-col items-center text-gray-400 border-2 border-dashed rounded-md">
                                <SquarePlus/>
                                <p>Add a Budget Line Item</p>
                            </div>
                        </DialogTrigger>
                        <BudgetModal handleSubmit={(name, value) => {
                            setLineItems(prev => ([...prev, {name, value}]))
                            setShowLineItemForm(false)
                        }}/>
                    </Dialog>
                </div>
                <Button onClick={e => addBudgetEntry(e)}>Submit</Button>
            </form>
        </div>
    )
}