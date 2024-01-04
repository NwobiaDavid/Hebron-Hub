import CommunityCard from "@/components/cards/CommunityCard";
import { UserCard } from "@/components/cards/UserCard";
import { profileTabs } from "@/components/constants";
import PostThread from "@/components/forms/PostThread";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { ThreadsTab } from "@/components/shared/ThreadsTab";
import { fetchCommunities } from "@/lib/actions/community.action";
import { fetchUser, fetchUsers } from "@/lib/actions/usser.actions";
import { currentUser } from "@clerk/nextjs"
import Image from "next/image";
import {redirect} from 'next/navigation'


    


const Page = async() => {
    const user = await currentUser()
    if(!user) return null;
    const userInfo = await fetchUser(user.id)

    
    if(!userInfo?.onboarded) redirect('/onboarding')

    const result = await fetchCommunities({
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    })
    
    return(
        <section>
            <h1 className="head-text mb-10">
                Search
            </h1>

            <div  >
                {result.communities.length == 0 ? (
                    <p className="no-result" >No community</p>
                ): (
                    <>
                    {result.communities.map((community)=> (
                        <CommunityCard
                        key={community.id}
                        id={community.name}
                        username={community.username}
                        imgUrl={community.image}
                        bio={community.bio}
                        members={community.members}
                        />
                    ))}
                    </>
                ) }
            </div>
        </section>
    )
}


export default Page
