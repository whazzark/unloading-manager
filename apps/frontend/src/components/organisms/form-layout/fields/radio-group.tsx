import React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/atoms";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/molecules";

import { FormLayoutLabel } from "../form-layout-label";
import { FormLayoutTooltip } from "../form-layout-tooltip";
import { getBaseSchema } from "../utils";

import type { FormLayoutFieldProps } from "../types";
import type { z } from "zod";

export interface FormLayoutRadioGroupFieldProps extends FormLayoutFieldProps {}

export function FormLayoutRadioGroupField(
  props: FormLayoutRadioGroupFieldProps,
) {
  const { label, isRequired, field, zodItem, fieldProps, fieldConfigItem } =
    props;

  const baseSchema = getBaseSchema(zodItem) as unknown as z.ZodEnum<any>;
  const baseValues = baseSchema._def.values;

  const values: string[] = Array.isArray(baseValues)
    ? baseValues
    : Object.entries(baseValues).map((item) => {
        return item[0];
      });

  return (
    <div>
      <FormItem>
        <FormLayoutLabel label={label} isRequired={isRequired} />
        <FormControl>
          <RadioGroup
            defaultValue={field.value}
            onValueChange={field.onChange}
            {...fieldProps}
          >
            {values?.map((value: any) => {
              return (
                <FormItem
                  key={value}
                  className="mb-2 flex items-center gap-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className="font-normal">{value}</FormLabel>
                </FormItem>
              );
            })}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
      <FormLayoutTooltip {...fieldConfigItem} />
    </div>
  );
}
