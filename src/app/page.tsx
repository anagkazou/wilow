import { Dashboard } from "@/components/dashboard"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { headers } from "next/headers"

export const Home = async (props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const period = (searchParams?.period as string) || "this_month";
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const url = `${protocol}://${host}/api/ad-spend?period=${period}`

  const dataPromise = fetch(url, {
    cache: "no-store",
  }).then(async (res) => {
    if (!res.ok) {
      console.log("Failed to fetch data", res.status, res.statusText)
      console.error("Failed to fetch data", res.status, res.statusText)
      return { metric: "spend", currency: "USD", data: [] }
    }
    return res.json()
  }).catch(e => {
    console.error("Fetch error:", e)
    return { metric: "spend", currency: "USD", data: [] }
  })

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 dark:bg-zinc-950">

      <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-end">

        <ThemeToggle />
      </div>
      <Dashboard dataPromise={dataPromise} filter={period} />
    </div>
  )
}

export default Home;