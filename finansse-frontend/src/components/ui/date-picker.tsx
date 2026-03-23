"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerTimeProps {
    className?: string
    value?: Date
    onChange?: (date: Date | undefined) => void
    disabled?: boolean
}

function getTimeString(date?: Date) {
    if (!date) return ""
    const hh = String(date.getHours()).padStart(2, "0")
    const mm = String(date.getMinutes()).padStart(2, "0")
    return `${hh}:${mm}`
}

export function DatePickerTime({
    className,
    value,
    onChange,
    disabled,
}: DatePickerTimeProps) {
    const [open, setOpen] = React.useState(false)

    const timeValue = React.useMemo(() => getTimeString(value), [value])

    const handleDateSelect = (nextDate?: Date) => {
        if (!nextDate) {
            onChange?.(undefined)
            setOpen(false)
            return
        }

        const base = value ?? new Date()
        const merged = new Date(nextDate)
        merged.setHours(base.getHours(), base.getMinutes(), base.getSeconds(), 0)
        onChange?.(merged)
        setOpen(false)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value
        if (!raw) return

        const [h, m] = raw.split(":").map(Number)
        if (Number.isNaN(h) || Number.isNaN(m)) return

        const base = value ?? new Date()
        const merged = new Date(base)
        merged.setHours(h, m, 0, 0)
        onChange?.(merged)
    }

    return (
        <div className={cn("grid w-full grid-cols-1 gap-2 sm:grid-cols-[1fr_9rem]", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "w-full justify-between px-4 text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {value ? format(value, "PPP") : "Select date"}
                        <ChevronDownIcon className="size-4" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        defaultMonth={value}
                        onSelect={handleDateSelect}
                        disabled={disabled}
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>

            <Input
                type="time"
                step="60"
                value={timeValue}
                onChange={handleTimeChange}
                disabled={disabled}
                className="bg-background"
            />
        </div>
    )
}