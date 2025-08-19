"use client"
import {DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export const BudgetModal = ({handleSubmit}: {handleSubmit: (name: string, value: number) => void}) => {
    const [name, setName] = useState<string>("");
    const [value, setValue] = useState<number>(0);
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Line Item details</DialogTitle>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input onChange={e => setName(e.target.value)} type="text" name="name"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="value">Value</Label>
                        <Input onChange={e => setValue(Number(e.target.value))} type="number" name="value"/>
                    </div>
                    <Button onClick={() => handleSubmit(name, value)}>Submit</Button>
                </div>
            </DialogHeader>
        </DialogContent>
    )
}