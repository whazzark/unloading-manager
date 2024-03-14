import React from "react";

import { Plus, Trash } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Separator,
} from "@/components/atoms";

import { beautifyObjectName } from "../utils";

// eslint-disable-next-line import/no-cycle
import { FormLayoutObjectField } from "./object";

import type { useForm } from "react-hook-form";
import type { z } from "zod";

export interface FormLayoutArrayFieldProps {
  name: string;
  item: z.ZodArray<any>;
  form: ReturnType<typeof useForm>;
  path?: string[];
  fieldConfig?: any;
}

export function FormLayoutArrayField(props: FormLayoutArrayFieldProps) {
  const { name, item, form, path = [], fieldConfig } = props;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });

  const title = item._def.description ?? beautifyObjectName(name);

  return (
    <AccordionItem value={name} className="border-none">
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        {fields.map((_field, index) => {
          const key = _field.id;

          return (
            <div key={key} className="mt-4 flex flex-col">
              <FormLayoutObjectField
                schema={item._def.type as z.ZodObject<any, any>}
                form={form}
                fieldConfig={fieldConfig}
                path={[...path, index.toString()]}
              />
              <div className="my-4 flex justify-end">
                <Button
                  variant="secondary"
                  size="icon"
                  type="button"
                  className="hover:bg-zinc-300 hover:text-black focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:hover:text-black dark:hover:ring-0 dark:hover:ring-offset-0 dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0"
                  onClick={() => {
                    return remove(index);
                  }}
                >
                  <Trash className="size-4 " />
                </Button>
              </div>

              <Separator />
            </div>
          );
        })}
        <Button
          type="button"
          variant="secondary"
          className="mt-4 flex items-center"
          onClick={() => {
            return append({});
          }}
        >
          <Plus className="mr-2" size={16} />
          Add
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
