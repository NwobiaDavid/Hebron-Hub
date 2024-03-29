import { profileTabs } from "@/components/constants";
import PostThread from "@/components/forms/PostThread";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { ThreadsTab } from "@/components/shared/ThreadsTab";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { fetchUser } from "@/lib/actions/usser.actions";
import { currentUser } from "@clerk/nextjs"
import Image from "next/image";
import {redirect} from 'next/navigation'

export default async function page({params}: {params: {id: string}}) {
    const user = await currentUser()
    if(!user) return null;
    const userInfo = await fetchUser(params.id)

    if(!userInfo?.onboarded) redirect('/onboarding')
    
  return (
    <section>
        <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
         />
         <div className="mt-9">
            <Tabs defaultValue="threads" className="w-full" >
                <TabsList className="tab" >
                    {profileTabs.map((tab)=> (
                        <TabsTrigger key={tab.label} className="tab w-full " value={tab.value} >
                            <Image
                            src={tab.icon}
                            alt={tab.label}
                            width={24}
                            height={24}
                            className="object-contain"
                             />
                             <p className="max-sm:hidden">{tab.label}</p>
                             {tab.label === 'Thoughts'&& (
                                <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-tiny-medium  ">
                                    {userInfo?.threads?.length}
                                </p>
                             )}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {profileTabs.map((tab)=> (
                    <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full" >
                        <ThreadsTab
                        currentUserId={user.id}
                        accountId={userInfo.id}
                        accountType="User"
                         />
                    </TabsContent>
                ))}
            </Tabs>
         </div>
    </section>
  )
}
