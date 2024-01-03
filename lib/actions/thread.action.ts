"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import { connectToDB } from "../mongoose"
import User from "../models/user.model";

interface Params{
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export default async function createThread({text, author, communityId, path }:Params) {
  try {
    connectToDB()

  const createdThread = await Thread.create({
    text,
    author,
    community: null
  });

  await User.findByIdAndUpdate(author,{
    $push: {threads: createdThread._id}
  })

  revalidatePath(path)
  } catch (error:any) {
    throw new Error(`error creating thead: ${error.message}`)
  }

}

export async function fetchPosts(pageNumber=1, pageSize=20){
   try {
    connectToDB();

    console.log('inside fetch post---------------------------------------')
    const skipAmount = (pageNumber-1)*pageSize;

    const postsQuery = Thread.find({ parentId: {$in: [null, undefined]} })
    .sort({createdAt: 'desc'})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({path: 'author', model: User})
    .populate({
        path: 'children',
        populate: {
            path: 'author',
            model: User,
            select: "_id name parentId image"
        }
    })

    const totalPostsCount = await Thread.countDocuments({parentId: {$in:[null, undefined]}})
    const posts = await postsQuery.exec();
    const isNext = totalPostsCount > skipAmount + posts.length;

    console.log('bottom of fetch post--------------------------------------------')
    return {posts, isNext}
   } catch (error: any) {
    throw new Error(`error fetching thread ${error.message}`)
   }
}

// export async function fetchPosts(pageNumber = 1, pageSize = 20) {
//   connectToDB();

//   // Calculate the number of posts to skip based on the page number and page size.
//   const skipAmount = (pageNumber - 1) * pageSize;

//   // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
//   const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
//     .sort({ createdAt: "desc" })
//     .skip(skipAmount)
//     .limit(pageSize)
//     .populate({
//       path: "author",
//       model: User,
//     })
//     .populate({
//       path: "children", // Populate the children field
//       populate: {
//         path: "author", // Populate the author field within children
//         model: User,
//         select: "_id name parentId image", // Select only _id and username fields of the author
//       },
//     });
//   }

export async function fetchThreadById (id:string){
  connectToDB()
  try {
    const thread = await Thread.findById(id)
    .populate({
      path: 'author',
      model: User,
      select: "_id name image"
    })
    .populate({
      path: 'children',
      populate: [
        {
          path: 'author',
          model: User,
          select: "_id id name parentId image"
        },
        {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: "_id id name parentId image"
          }
        }
      ]
    }).exec()

    return thread;
  } catch (error:any) {
    throw new Error(`error fetching the thread ${error.message}`)
  }
}

export async function addCommentToThread(
  threadId:string,
  commentText: string,
  userId: string,
  path: string
){
  connectToDB()
  try{
    const originalThread = await Thread.findById(threadId)

    if(!originalThread){
      throw new Error("thread not found")
    }

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId
    })

    const savedCommentThread = await commentThread.save()

    originalThread.children.push(savedCommentThread._id);

    await originalThread.save()

    revalidatePath(path);

  }catch(error:any){
    throw new Error(`error adding comment to thread ${error.message}`)
  }
}