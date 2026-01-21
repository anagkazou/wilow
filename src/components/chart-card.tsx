"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { FilterSelect, SelectOption } from "@/components/filter-select"

interface ChartProps {
    title: string
    description: string
    data: any[]
    chartConfig: ChartConfig
    isLoading?: boolean
    filterOptions?: SelectOption[]
    filterKey?: string
    filterDefault?: string
    xAxisKey?: string
    seriesKeys: string[]
}

export const ChartComponent = ({
    title,
    description,
    data,
    chartConfig,
    isLoading = false,
    filterOptions,
    filterKey = "period",
    filterDefault = "this_month",
    xAxisKey = "date",
    seriesKeys,
}: ChartProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const filterValue = searchParams.get(filterKey) || filterDefault

    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(filterKey, value)
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-left">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                {filterOptions && (
                    <div className="items-center hidden md:flex gap-2">
                        <FilterSelect
                            value={filterValue}
                            onValueChange={handleFilterChange}
                            options={filterOptions}
                        />
                    </div>
                )}
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {isLoading ? (
                    <div className="h-[250px] w-full flex items-center justify-center text-muted-foreground text-sm animate-pulse">
                        Loading analytics...
                    </div>
                ) : data.length === 0 ? (
                    <div className="h-[250px] w-full flex flex-col items-center justify-center text-muted-foreground">
                        <p className="text-lg font-medium">No data available</p>
                        <p className="text-sm">There is no data for the selected period.</p>
                    </div>
                ) : (
                    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                        <AreaChart data={data}>
                            <defs>
                                {seriesKeys.map((key) => (
                                    <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor={`var(--color-${key})`}
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={`var(--color-${key})`}
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                ))}
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey={xAxisKey}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(new Date().getFullYear() + " " + value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            const date = new Date(new Date().getFullYear() + " " + value)
                                            return date.toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }}
                                        indicator="dot"
                                        valueFormatter={(value) => {
                                            return new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            }).format(Number(value))
                                        }}
                                    />
                                }
                            />
                            {seriesKeys.map((key) => (
                                <Area
                                    key={key}
                                    dataKey={key}
                                    type="natural"
                                    fill={`url(#fill${key})`}
                                    stroke={`var(--color-${key})`}
                                    stackId="a"
                                />
                            ))}
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
