"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { useDropzone } from "react-dropzone"
import { X } from "lucide-react"
import Image from "next/image"
import { UserUpdateFormSchema } from "@/lib/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { updateUserProfile } from "@/lib/actions/user.actions"



export default function UpdateUserProfileForm({userId,userData} : {userId:string,userData:string}) {

    const parseUserData = JSON.parse(userData)

    const {data:session} = useSession()
    const router = useRouter()
    const {toast} = useToast()

  const [profileImage, setProfileImage] = useState<string | File | null>(parseUserData?.image)
  const [coverImage, setCoverImage] = useState<string | File | null>(parseUserData?.coverImage)

  const form = useForm<z.infer<typeof UserUpdateFormSchema>>({
    resolver: zodResolver(UserUpdateFormSchema),
    defaultValues: {
      name: parseUserData?.name || "",
      location: parseUserData?.location || "",
      twitterUrl:   parseUserData?.twitterUrl || "",
      instagramUrl: parseUserData?.instagramUrl || "",
      bio: parseUserData?.bio || "",
    },
  })

  async function onSubmit(values: z.infer<typeof UserUpdateFormSchema>) {

    if(!userId || userId.length <=0){
        toast({
            title:'Please Log In to perfrom this action',
            variant:'destructive',
        })
        return router.push('/auth/sign-in')
    }
    const fromData = new FormData();
    fromData.append('name',values.name)
    values.location && fromData.append('location',values.location)
    values.twitterUrl && fromData.append('twitterUrl',values.twitterUrl)
    values.instagramUrl && fromData.append('instagramUrl',values.instagramUrl)
    values.bio && fromData.append('bio',values.bio)
    profileImage && fromData.append('profileImage',profileImage)
    coverImage && fromData.append('coverImage',coverImage)
    fromData.append('userId', session?.user?.id as string)

    const res = await updateUserProfile(fromData)
console.log({res})

  }

  const profileDropzone = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles:any) => setProfileImage(acceptedFiles[0]),
  })

  const coverDropzone = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles:any) => setCoverImage(acceptedFiles[0]),
  })

  return (
    <div className="container mx-auto p-6 0 text-white">
      <h1 className="text-2xl font-bold mb-6">Update Your Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormLabel>Profile Image</FormLabel>
              <div
                {...profileDropzone.getRootProps()}
                className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-gray-500 transition-colors"
              >
                <input {...profileDropzone.getInputProps()} />
                {profileImage ? (
                  <div className="relative">
                    <Image
                      src={typeof profileImage === "string" ? profileImage :  URL.createObjectURL(profileImage)}
                      alt="Profile Preview"
                      className="mx-auto max-h-48 rounded object-cover"
                      width={300}
                      height={300}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        setProfileImage(null)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <p>Drag n drop a profile image here, or click to select one</p>
                )}
              </div>
            </div>
            <div>
              <FormLabel>Cover Image</FormLabel>



              <div
                {...coverDropzone.getRootProps()}
                className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-gray-500 transition-colors"
              >
                <input {...coverDropzone.getInputProps()} />
                {coverImage ? (
                  <div className="relative">
                    <Image
                      src={typeof coverImage === "string" ? coverImage : URL.createObjectURL(coverImage)}
                      alt="Cover Preview"
                      className="mx-auto max-h-48 rounded object-cover"
                      width={300}
                      height={300}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        setCoverImage(null)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <p>Drag n drop a cover image here, or click to select one</p>
                )}
              </div>




            </div>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Khalid khan" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Killa Saifullah" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://twitter.com/yourusername" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagramUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://instagram.com/yourusername" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself"
                    className="shad-textArea py-2 px-3"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can write up to 500 characters about yourself.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Update Profile</Button>
        </form>
      </Form>
    </div>
  )
}