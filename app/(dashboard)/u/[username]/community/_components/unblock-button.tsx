"use client"

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
    userId: string;
}

export const UnblockButton = ({
    userId
}: UnblockButtonProps) => {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            onUnblock(userId)
            .then((result) => {
                toast.success(`User ${result.blocked.username} unblocked`)
            })
            .catch(() => toast.error("Something went wrong"));
        })
    }

    return (
        <Button
            variant="link"
            size="sm"
            className="text-blue-500 w-full"
            onClick={onClick}
            disabled={isPending}
        >
            Unblock
        </Button>
    )
}