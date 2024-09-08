"use client"

import { onBlock, onUnblock } from "@/actions/block"
import { onFollow, onUnFollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
    selfId: string
    userId: string
    isFollowing: boolean
    hasBlocked: boolean
}

export const Actions = ({
    selfId,
    userId,
    isFollowing,
    hasBlocked,
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

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`You blocked ${data?.blocked.username}`))
                .catch(() => "Something went wrong")
        })
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`You unblocked ${data.blocked.username}`))
                .catch(() => "Something went wrong")
        })
    }

    return (
        <>
            {!isSelf && 
            <div>
                <Button
                    variant={isFollowing ? "secondary" : "primary"}
                    className="w-full"
                    onClick={isFollowing ? handleUnFollow : handleFollow}
                    disabled={isPending || hasBlocked}
                >
                    {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button
                    variant={hasBlocked ? "secondary" : "destructive"}
                    className="w-full"
                    onClick={hasBlocked ? handleUnblock : handleBlock}
                    disabled={isPending}
                >
                    {hasBlocked ? "Unblock" : "Block"}
                </Button>
            </div>
            }
        </>
    )
}