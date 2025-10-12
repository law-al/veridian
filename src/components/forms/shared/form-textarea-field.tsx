import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { formSchema } from '@/declaration';
import { z } from 'zod';
import { Textarea } from '../../ui/textarea';

export default function FormTextareaField({
  form,
  name,
  label,
  placeholder,
  required = true,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  name: keyof z.infer<typeof formSchema>;
  label: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-base'>
            {label}
            {required && <span className='font-bold text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className='bg-white resize-none !text-base !h-[45px] !border-2 border-gray-300 active:border-purple-500 focus:border-purple-500focus-within:ring-0 focus-visible:border-purple-500 ring-0 hover:ring-0 active:ring-0 focus:ring-0 focus-within:ring-0 focus-visible:ring-0'
              cols={30}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
