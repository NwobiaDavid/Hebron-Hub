import Thread from "../models/thread.model";
import { connectToDB } from "../mongoose"

interface Params{
    text: string,
    author: string,
    communityId: string | null,
    path: string | null,
}

export default function createThread({text, author, communityId, path }:Params) {
  connectToDB()

  const createdThread = await Thread.create({
    text,
    author,
    community: null
  });
    return (
    <div>
      
    </div>
  )
}
