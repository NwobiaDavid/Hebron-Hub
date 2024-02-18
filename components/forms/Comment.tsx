"use client"

import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
    Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";

// import { updateUser } from "@/lib/actions/usser.actions";
import { commentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.action";
// import createThread from "@/lib/actions/thread.action";


interface Props{
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}


const Comment = ({threadId, currentUserImg, currentUserId}:Props) => {
    const router = useRouter()
  const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: '',
        }
    })

    const onSubmit = async(values: z.infer<typeof commentValidation>) => {
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname );

        form.reset();
    }

  return (
    <Form {...form} >
    <form 
    className="comment-form " 
    onSubmit={form.handleSubmit(onSubmit)} >
        <FormField
        control={form.control}
        name="thread"
        render={({ field }) => (
          <FormItem className="flex gap-3 items-center w-full " >
            <FormLabel >
                <Image 
                src={currentUserImg}
                alt="profile pic"
                width={48}
                height={48}
                className="rounded-full object-contain " />
            </FormLabel>
            <FormControl className="border-none bg-transparent  " >
              <Input
              type="text"
              placeholder="comment..."
              className="no-focus outline-none"
              {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="submit" className="comment-form_btn text-black font-semibold bg-yellow-400 hover:bg-yellow-500 duration-200 ">
        Reply
        </Button>
    </form>
    </Form>
  )
}

export default Comment
