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
import { SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { uploadFile } from "@/lib/actions/firebase.actions";
import { bookCategory } from "@/lib/constant";
import { BookFormValidation } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

const ContributeForm = () => {
  const [progress, setProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const [isFree, setIsFree] = useState(false);
  const form = useForm<z.infer<typeof BookFormValidation>>({
    resolver: zodResolver(BookFormValidation),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      isFree: false,
      price: 0,
      category: "",
      publisher: "",
      publishedAt: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof BookFormValidation>) => {
    console.log(data);
    uploadFile(
      data.bookCoverImg[0],
      (progress) => setProgress(progress), // Update progress
      ({ downloadURL }) => {
        setDownloadURL(downloadURL);
        setUploading(false);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      }
    );
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
              inputType="number"
              placeholder="$15"
            />
          )}

          <CustomFormField
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
          </CustomFormField>

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

          <Button type="submit">{uploading ? "Uploading..." : "Upload"}</Button> 
          <div>{progress}% Uploaded </div>
          <p>{downloadURL}</p>

        </form>
      </Form>
    </div>
  );
};

export default ContributeForm;
