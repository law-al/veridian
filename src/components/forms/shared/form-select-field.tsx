import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { formSchema } from '@/declaration';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/tiptap-utils';

interface SelectData {
  value: string;
  item: string;
}

interface SelectItems {
  label: string;
  data: SelectData[];
}

export function FormSelectField({
  form,
  name,
  label,
  items,
  placeholder,
  required = true,
  submitting = false,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  name: keyof z.infer<typeof formSchema>;
  label: string;
  items: SelectItems[];
  placeholder: string;
  required?: boolean;
  submitting?: boolean;
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
            <Select
              disabled={submitting}
              onValueChange={field.onChange}
              defaultValue={field.value as string}
            >
              <SelectTrigger
                className={cn(
                  'w-[180px] md:w-full bg-white !text-base !h-[45px] !border-2 border-gray-300 active:border-purple-500 focus:border-purple-500 focus-within:border-purple-500 focus-visible:border-purple-500 ring-0 hover:ring-0 active:ring-0 focus:ring-0 focus-within:ring-0 focus-visible:ring-0',
                  submitting && 'cursor-not-allowed'
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectGroup key={item.label}>
                    <SelectLabel>{item.label}</SelectLabel>
                    {item.data.map((data) => (
                      <SelectItem key={data.value} value={data.value}>
                        {data.item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
