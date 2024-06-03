"use client"

import { onFollow, onUnFollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
    selfId: string
    userId: string
    isFollowing: boolean
}

export const Actions = ({
    selfId,
    userId,
    isFollowing,
} : ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const isSelf = selfId === userId;

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You followed ${data.following.username}`))
                .catch(() => "Something went wrong")
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnFollow(userId)
                .then((data) => toast.success(`You unfollowed ${data.following.username}`))
                .catch(() => "Something went wrong")
        })
    }

    return (
        <>
            {!isSelf && 
                <Button
                    variant={isFollowing ? "secondary" : "primary"}
                    className="w-full"
                    onClick={isFollowing ? handleUnFollow : handleFollow}
                    disabled={isPending}
                >
                    {isFollowing ? "Following" : "Follow"}
                </Button>
            }
        </>
    )
}