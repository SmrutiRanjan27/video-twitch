import { Check } from "lucide-react"

export const VerifiedMark = () => {
    return (
        <div className="p-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-blue-600">
            <Check className="h-[10px] w-[10px] text-primary"/>
        </div>
    )
}