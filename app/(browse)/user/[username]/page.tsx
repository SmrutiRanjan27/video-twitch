import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { getSelf } from "@/lib/auth-service";
import { hasBlockedUser, isBlockedByUser } from "@/lib/block-service";

interface UserPageParams {
    params: {
        username: string
    }
}

const UserPage = async ({params} : UserPageParams) => {
    const user = await getUserByUsername(params.username);
    const self = await getSelf();

    if (!user) {
        notFound();
    }

    const isBlocked = await isBlockedByUser(user.id)

    if (isBlocked) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const hasBlocked = await hasBlockedUser(user.id);

    return (
        <div>
            <p>User Name : {user.username}</p>
            <p>id : {user.id}</p>
            <p>is following : {`${isFollowing}`}</p>
            <Actions 
                selfId={self.id} 
                userId={user.id}
                isFollowing={isFollowing}
                hasBlocked={hasBlocked}
            />
        </div>
    )
}

export default UserPage;