"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { Input } from "@/components/ui/input"
import { createRoomAction } from "./actions"
import { Router } from "lucide-react"
import { useRouter } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  githubRepo: z.string().min(1).max(250),
  languages: z.string().min(1).max(50),
})


export function CreateRoomForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        description: "",
        githubRepo: "",
        languages: "",
      }
  });

    /**
     * Handles the form submission.
     *
     * @param {z.infer<typeof formSchema>} values - The form values inferred from the formSchema.
     */
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const room = await createRoomAction(values);
        router.push("/");
        
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public room name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
              <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormDescription>
                What you will be coding on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repo</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />  

        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormDescription>
                List the primary programming language used in your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )

}