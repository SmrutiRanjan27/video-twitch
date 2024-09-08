"use server"

import { followUser, unFollowUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
    try {
        const followDetails = await followUser(id);
        revalidatePath("/")
        if (followDetails) {
            revalidatePath(`/user/${followDetails.following.username}`)
        }
        return followDetails;
    } catch (error) {
        throw new Error(`Internal error : ${error}`)
    }
}

export const onUnFollow = async (id: string) => {
    try {
        const unFollowDetails = await unFollowUser(id);
        revalidatePath("/")
        if (unFollowDetails) {
            revalidatePath(`/user/${unFollowDetails.following.username}`)
        }
        return unFollowDetails;
    } catch (error) {
        throw new Error(`Internal error : ${error}`)
    }
}