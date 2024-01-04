import { UserCard } from "@/components/cards/UserCard";
import { profileTabs } from "@/components/constants";
import PostThread from "@/components/forms/PostThread";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { ThreadsTab } from "@/components/shared/ThreadsTab";
import { fetchUser, fetchUsers } from "@/lib/actions/usser.actions";
import { currentUser } from "@clerk/nextjs"
import Image from "next/image";
import {redirect} from 'next/navigation'


    


const Page = async() => {
    const user = await currentUser()
    if(!user) return null;
    const userInfo = await fetchUser(user.id)

    
    if(!userInfo?.onboarded) redirect('/onboarding')

    const result = await fetchUsers({
        userId: user.id,
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
                {result.users.length == 0 ? (
                    <p className="no-result" >No users</p>
                ): (
                    <>
                    {result.users.map((person)=> (
                        <UserCard
                        key={person.id}
                        id={person.name}
                        username={person.username}
                        imgUrl={person.image}
                        personType='User'
                        />
                    ))}
                    </>
                ) }
            </div>
        </section>
    )
}


export default Page
