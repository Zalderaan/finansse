// "use client"

// import * as React from "react"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Field, FieldLabel } from "@/components/ui/field"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import {ChevronsUpDown} from "lucide-react"
// import { format } from "date-fns"

// export function DatePickerSimple() {
//     const [date, setDate] = React.useState<Date>()

//     return (
//         <Field className="w-full">
//             {/* <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel> */}
//             <Popover>
//                 <PopoverTrigger asChild>
//                     <Button
//                         variant="outline"
//                         id="date-picker-simple"
//                         className="justify-start font-normal"
//                     >
//                         {date ? format(date, "PPP") : <span>Pick a date</span>}
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                         mode="single"
//                         selected={date}
//                         onSelect={setDate}
//                         defaultMonth={date}
//                     />
//                 </PopoverContent>
//             </Popover>
//         </Field>
//     )
// }

"use client"

//! THIS IS NOT FULLY FROM SHADCN, SOME STUFF HAVE BEEN CUSTOMIZED
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {ChevronsUpDown} from "lucide-react"
import { cn } from "@/lib/utils"


interface DatePickerSimpleProps {
    className?: string,
    value?: Date
    onChange?: (date: Date | undefined) => void
    disabled?: boolean
}

export function DatePickerSimple({ className, value, onChange, disabled }: DatePickerSimpleProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                        "w-full justify-between px-4 text-left font-normal",
                        !value && "text-muted-foreground", className
                    )}
                >
                    <span className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? format(value, "PPP") : <span>Pick a date</span>}
                    </span>

                    <ChevronsUpDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabled}
                />
            </PopoverContent>
        </Popover>
    )
}