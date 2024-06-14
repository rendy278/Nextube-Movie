"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";

const formSchema = z.object({
  input: z.string().min(2).max(30),
});

const SearchInput = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/search/${data.input}`);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="text-black w-full flex items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search Movie..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="p-2 text-white bg-red-500  border border-black"
        >
          Search
        </button>
      </form>
    </Form>
  );
};

export default SearchInput;
