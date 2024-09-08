"use server"

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

export const onBlock = async (id: string) => {
    try {
        const self = await getSelf();

        let blockDetails;
        try {
            blockDetails = await blockUser(id);
        } catch {
            // This means user is a guest
        }

        try {
            await roomService.removeParticipant(self.id, id);
        } catch {
            // This means user is not in room
        }

        revalidatePath(`/u/${self.username}/community`)
        return blockDetails;
    } catch (error) {
        throw new Error(`Internal error : ${error}`)
    }
}

export const onUnblock = async (id: string) => {
    try {
        const self = await getSelf();
        const unblockDetails = await unblockUser(id);
        revalidatePath(`/u/${self.id}/community`);
        return unblockDetails;
    } catch (error) {
        throw new Error(`Internal error : ${error}`)
    }
}