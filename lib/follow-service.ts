import { getSelf } from "@/lib/auth-service"
import { db } from "@/lib/db";

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();

        const followedUsers = db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocked: {
                        none: {
                            blockedId: self.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true
                            }
                        }
                    }
                }
            }
        })

        return followedUsers;
    } catch (error) {
        return [];
    }
}

export const isFollowingUser = async (id : string) => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: { id },
        })

        if (!otherUser) {
            throw new Error("User not found")
        }

        if (self.id == otherUser.id) {
            return true;
        }

        const isFollowing = await db.follow.findFirst({
            where: {
                followerId : self.id,
                followingId : id
            }
        })

        return !!isFollowing
    } catch {
        return false
    }
}

export const followUser = async (id : string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where : { id }
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id == self.id) {
        throw new Error(`Cannot follow ${otherUser.username}`)
    }

    const existingFollow = await db.follow.findFirst({
        where : {
            followerId: self.id,
            followingId: otherUser.id
        }
    })

    if (existingFollow) {
        throw new Error(`Already following ${otherUser.username}`)
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include: {
            following: true
        }
    })

    return follow;
}

export const unFollowUser = async (id : string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where : { id }
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id == self.id) {
        throw new Error(`Cannot follow ${otherUser.username}`)
    }

    const existingFollow = await db.follow.findFirst({
        where : {
            followerId: self.id,
            followingId: otherUser.id
        }
    })

    if (!existingFollow) {
        throw new Error("Not following")
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id
        },
        include: {
            following: true
        }
    })

    return follow
}