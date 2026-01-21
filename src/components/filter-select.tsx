import * as React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export interface SelectOption {
    value: string
    label: string
}

interface FilterSelectProps {
    value: string
    onValueChange: (value: string) => void
    options: SelectOption[]
    placeholder?: string
    className?: string
}

export const FilterSelect = ({
    value,
    onValueChange,
    options,
    placeholder = "Select...",
    className
}: FilterSelectProps) => {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger
                className={`w-[160px] rounded-lg sm:ml-auto ${className}`}
                aria-label="Select a value"
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
                {options.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                        className="rounded-lg"
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
