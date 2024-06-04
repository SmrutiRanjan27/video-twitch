import { getRecommended } from "@/lib/recommended-service"
import { Recommended } from "./recommended"
import { Toggle } from "./toggle"
import { Wrapper } from "./wrapper"
import { getFollowedUsers } from "@/lib/follow-service"
import { Following } from "./following"

export const SideBar = async () => {
    const data = await getRecommended();
    const following = await getFollowedUsers();

    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Following data={following} />
                <Recommended data={data}/>
            </div>
        </Wrapper>
    )
}