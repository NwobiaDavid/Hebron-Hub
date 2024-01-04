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
import { Textarea } from "../ui/textarea";
import { useOrganization } from "@clerk/nextjs";

// import { updateUser } from "@/lib/actions/usser.actions";
import { threadValidation } from "@/lib/validations/thread";
import createThread from "@/lib/actions/thread.action";

interface Props{
    user: {
        id:string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

//   const [files, setFiles] = useState<File[]>([])
//   const { startUpload } = useUploadThing("media")
//   const router = useRouter()
//   const pathname = usePathname()

//     const form = useForm({
//         resolver: zodResolver(threadValidation),
//         defaultValues: {
//             thread: '',
//             accountId: userId
//         }
//     })

// interface Props {
//   userId: string;
// }

export default function PostThread({userId}:{userId:string}) {
  const router = useRouter()
  const pathname = usePathname()
  const { organization } = useOrganization()

    const form = useForm({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: '',
            accountId: userId
        }
    })

    const onSubmit = async(values: z.infer<typeof threadValidation>) => {
      
      await createThread({
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname
        });

        router.push("/")
    }
  return (
    <Form {...form} >
    <form 
    className="mt-10 flex flex-col justify-start gap-10 " 
    onSubmit={form.handleSubmit(onSubmit)} >
        <FormField
        control={form.control}
        name="thread"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-3 w-full " >
            <FormLabel className="text-base-semibold text-light-2 " >
                Content
            </FormLabel>
            <FormControl className="border border-dark-4 bg-dark-3 text-light-1 no-focus " >
              <Textarea
              rows={15}
              {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="bg-primary-500">
        POST thread
        </Button>
    </form>
    </Form>
  )
}
