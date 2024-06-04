"use server"

import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    try {
        const blockDetails = await blockUser(id);
        revalidatePath("/")
        if (blockDetails) {
            revalidatePath(`/${blockDetails.blocked.username}`)
        }
        return blockDetails;
    } catch (error) {
        throw new Error(`Internal error : ${error}`)
    }
}

export const onUnblock = async (id: string) => {
    try {
        const unblockDetails = await unblockUser(id);
        revalidatePath("/")
        if (unblockDetails) {
            revalidatePath(`/${unblockDetails.blocked.username}`)
        }
        return unblockDetails;
    } catch (error) {
        throw new Error(`Internal error : ${error}`)
    }
}