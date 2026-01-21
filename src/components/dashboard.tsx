import { Suspense } from "react"
import { ChartComponent } from "@/components/chart-card"
import { ChartConfig } from "@/components/ui/chart"


const chartConfig = {
    "2024": {
        label: "2024",
        color: "var(--chart-1)",
    },
    "2025": {
        label: "2025",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

interface DashboardProps {
    dataPromise: Promise<{ data: any[] }>
}

const FILTER_OPTIONS = [
    { value: "this_month", label: "This Month" },
    { value: "last_month", label: "Last Month" },
]

interface AdSpendChartProps {
    data: any[]
    isLoading?: boolean
}

export const AdSpendChart = ({
    data,
    isLoading = false,
}: AdSpendChartProps) => {
    return (
        <ChartComponent
            title="Ad Spend Chart"
            description="Comparing ad spend for 2024 and 2025"
            data={data}
            chartConfig={chartConfig}
            isLoading={isLoading}
            filterOptions={FILTER_OPTIONS}
            filterKey="period"
            seriesKeys={["2025", "2024"]}
        />
    )
}

const ChartDataWrapper = async ({ dataPromise }: { dataPromise: Promise<{ data: any[] }> }) => {
    const response = await dataPromise
    return (
        <AdSpendChart
            data={response.data}
        />
    )
}

export const Dashboard = ({ dataPromise, filter }: DashboardProps & { filter: string }) => {
    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
            <Suspense key={filter} fallback={
                <AdSpendChart
                    data={[]}
                    isLoading={true}
                />
            }>
                <ChartDataWrapper dataPromise={dataPromise} />
            </Suspense>
        </div>
    )
}
