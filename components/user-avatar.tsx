"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { VariantProps, cva } from "class-variance-authority"
import { LiveBadge } from "@/components/live-badge"
import { Skeleton } from "./ui/skeleton"

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-8 w-8",
                lg: "h-14 w-18"
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)


interface UserAvatarProps 
    extends VariantProps<typeof avatarSizes> {
    username : string
    imageUrl: string
    isLive?: boolean
    showBadge?: boolean
}

export const UserAvatar = ({
    username,
    imageUrl,
    isLive,
    showBadge,
    size
}: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;

    return (
        <div className="relative">
            <Avatar
                className={cn(
                    isLive && "ring-2 ring-rose-500 border border-background",
                    avatarSizes({ size })
                )}
            >
                <AvatarImage src={imageUrl} className="pbject-cover"/>
                <AvatarFallback className="flex items-center justify-center uppercase w-full h-full">
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && 
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            }
        </div>
    )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {};

export const UserAvatarSkeleton = ({
    size
}: UserAvatarSkeletonProps) => {
    return (
        <Skeleton 
            className={cn(
                "rounded-full",
                avatarSizes({ size })
            )}
        />
    )
}