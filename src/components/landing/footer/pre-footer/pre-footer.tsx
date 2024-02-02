import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

const PreFooterSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 md:px-36 py-32 my-20">
      <div className="flex flex-col items-center justify-center gap-y-2 mb-3 md:mb-6">
        <h3 className="text-2xl md:text-4xl text-center font-semibold text-neutral-800 dark:text-neutral-200 px-6 md:px-24">
          Every developer deserves to be a great engineer, a{" "}
          <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            100xEngineer!
          </span>
        </h3>

        <p className="text-lg text-neutral-600 dark:text-neutral-400 text-center font-medium px-12">
          Give yourself the power you deserve with a 100xdevs today!
        </p>
      </div>

      <Button size={"lg"} className="text-lg rounded-full" asChild>
        <Link
          href={"https://harkirat.classx.co.in/new-courses"}
          target="_blank"
        >
          Join now <Sparkles className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

export default PreFooterSection
