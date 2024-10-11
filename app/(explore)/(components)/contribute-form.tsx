"use client";
import CustomFormField, {
  CustomFormFieldType,
} from "@/components/shared/custom-form-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { bookCategory } from "@/lib/constant";
import { BookFormValidation } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { uploadBook } from "@/lib/actions/user.actions";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {  X } from "lucide-react";



const ContributeForm = () => {
const [selectArr, setSelectArr] = useState<string[]>(bookCategory)
const [selectValuesArr, setSelectValuesArr] = useState<string[]>([])

  const router = useRouter()
  const { toast } = useToast()
  const {data:session} = useSession();
  const [isPending, startTransition] = useTransition();
  const [isFree, setIsFree] = useState(false);
  const form = useForm<z.infer<typeof BookFormValidation>>({
    resolver: zodResolver(BookFormValidation),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      isFree: false,
      price: '0',
      category:'',
      publisher: "",
      publishedAt: "",
    },
  });

  const handleValueChange = (val:string) => {
    setSelectArr((prevArr)=> prevArr.filter((newVal)=>newVal!==val))
    setSelectValuesArr((prevArr:string[])=> [...prevArr, val])

  }
  const handleRemoveValue = (val:string) => {
    setSelectArr((prevArr)=> [...prevArr, val])
    setSelectValuesArr((prevArr:string[])=> prevArr.filter((newVal)=>newVal!==val))
  }

  const onSubmit = async (values: z.infer<typeof BookFormValidation>) => {
    if(!session || !session?.user || !session?.user?.id) return;
    const formData = new FormData();
    formData.append('userId', session?.user?.id as string);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('author', values.author);
    formData.append('category', values.category);
    formData.append('categoryArr', JSON.stringify(selectValuesArr));
    formData.append('publisher', values.publisher);
    formData.append('publishedAt', values.publishedAt);
    formData.append('isFree', String(values.isFree)); // Convert boolean to string
    formData.append('price', values.isFree ? '0' : String(values.price)); // Convert number to string
    formData.append('bookCoverImg', values.bookCoverImg[0]); // File
    formData.append('bookPDF', values.bookPDF[0]); // File

    startTransition(() => {
      uploadBook(formData)
      .then((res:{success:boolean, message:string}) => {
        if(res.success){
          toast({
            title: res.message,
          })
          return router.push('/explore')
        }
        return toast({
          title: 'Upload Failed',
          variant: 'destructive',
        })
        })
        .catch((err: any) => {
       return toast({title: err, variant: 'destructive'})
        });
    });

  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Upload a Book</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-6"
        >
          <CustomFormField
            fieldType={CustomFormFieldType.INPUT}
            control={form.control}
            name="title"
            label="Book Title"
            placeholder="Image optimization"
          />
          <CustomFormField
            fieldType={CustomFormFieldType.TEXTAREA}
            control={form.control}
            name="description"
            label="Book Description"
          />

          <CustomFormField
            fieldType={CustomFormFieldType.INPUT}
            control={form.control}
            name="author"
            label="Author"
            placeholder="Addy Osmani"
          />

          <CustomFormField
            fieldType={CustomFormFieldType.INPUT_FILE}
            control={form.control}
            name="bookCoverImg"
            label="Cover Image"
            inputFileType="image/*"
          />
          <CustomFormField
            fieldType={CustomFormFieldType.INPUT_FILE}
            control={form.control}
            name="bookPDF"
            label="PDF File"
            inputFileType=".pdf"
          />

          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Free Book</FormLabel>
                  <FormDescription>Toggle if the book is free</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      setIsFree(checked);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {!isFree && (
            <CustomFormField
              fieldType={CustomFormFieldType.INPUT}
              control={form.control}
              name="price"
              label="Price"
              placeholder="$15"
            />
          )}

          {/* <CustomFormField
            fieldType={CustomFormFieldType.SELECT}
            control={form.control}
            name="category"
            label="Category"
            placeholder="Select a category"
          >
            {bookCategory.map((category) => (
              <SelectItem key={category} value={category}>
                <p>{category}</p>
              </SelectItem>
            ))}
          </CustomFormField> */}



<div className=''>
  {selectValuesArr.length > 0 && <div className="flex flex-row gap-x-2">
    {selectValuesArr.map((val:string) => (
      <div key={val} className="flex items-center bg-slate-700 px-2 py-1 rounded-md text-white gap-x-2">
      <p  className=" text-sm ">{val}</p>    
      <X size={17} onClick={()=>handleRemoveValue(val)} className="cursor-pointer" />
      </div>
    ))}
    </div>}
<FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={(val)=>{
                console.log(val)
                handleValueChange(val)
                field.onChange(val)

              }} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="shad-select-trigger">
                    <SelectValue placeholder="Select a multiple categories" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="shad-select-content text-white">
                  {
                    selectArr.map((val:string) => (
                      <SelectItem key={val} value={val}>{val}</SelectItem>
                      
                    ))
                  }
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
       

       </div>







          <CustomFormField
            fieldType={CustomFormFieldType.INPUT}
            control={form.control}
            name="publisher"
            label="Publisher"
            placeholder="Donkey Press"
          />

          <CustomFormField
            fieldType={CustomFormFieldType.INPUT}
            control={form.control}
            name="publishedAt"
            label="Published At"
            inputType="date"
          />

          <Button type="submit">{isPending ? "Uploading..." : "Upload"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default ContributeForm;
