import { currentUser } from "@clerk/nextjs";

import {UserCard} from "../cards/UserCard";

import { fetchCommunities } from "@/lib/actions/community.action";
import { fetchUsers } from "@/lib/actions/usser.actions";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 4,
  });

  const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });

  return (
    <section className='custom-scrollbar rightsidebar '>
      <div className='flex flex-1 flex-col justify-start px-10 py-2 pt-3 rounded-2xl mx-5 bg-gray-200 '>
        <h3 className='text-heading4-medium '>
          Suggested Communities
        </h3>

        <div className='mt-7 flex w-[300px] flex-col gap-9'>
          {suggestedCOmmunities.communities.length > 0 ? (
            <>
              {suggestedCOmmunities.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType='Community'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>
              No communities yet
            </p>
          )}
        </div>
      </div>

      <div className='flex px-10 flex-1 flex-col bg-gray-200  mx-5 rounded-2xl pt-3 py-2 justify-start'>
        <h3 className='text-heading4-medium '>Similar Minds</h3>
        <div className='mt-7 flex w-[300px] flex-col gap-10'>
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>No users yet</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;