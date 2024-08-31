"use client"

import { Info } from "lucide-react";
import { useMemo } from "react";
import { Hint } from "@/components/hint";

interface ChatInfoProps {
    isDelayed: boolean;
    isFollowersOnly: boolean;
};

export const ChatInfo = ({
    isDelayed,
    isFollowersOnly
} : ChatInfoProps) => {
    const hint = useMemo(() => {
        if (isDelayed) {
            return "Messages are delayed by 3 seconds"
        }

        if (isFollowersOnly) {
            return "Only followers can chat";
        }

        return ""
    }, [isDelayed, isFollowersOnly])

    const label = useMemo(() => {
        if (isDelayed) {
            return "Slow Mode"
        }

        if (isFollowersOnly) {
            return "Followers Only";
        }

        return ""
    }, [isDelayed, isFollowersOnly])

    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint} asChild>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    )
}