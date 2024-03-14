import React, { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms";
import { FormControl, FormItem, FormMessage } from "@/components/molecules";

import { FormLayoutLabel } from "../form-layout-label";
import { FormLayoutTooltip } from "../form-layout-tooltip";
import { getBaseSchema } from "../utils";

import type { FormLayoutFieldProps } from "../types";
import type { z } from "zod";

export interface FormLayoutEnumFieldProps extends FormLayoutFieldProps {}

export function FormLayoutEnumField(props: FormLayoutEnumFieldProps) {
  const {
    label: formLabel,
    isRequired,
    field,
    fieldConfigItem,
    zodItem,
    fieldProps,
  } = props;

  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values;

  const values: [string, string][] = Array.isArray(baseValues)
    ? baseValues.map((value) => {
        return [value, value];
      })
    : Object.entries(baseValues);

  const findItem = useCallback(
    (value: any) => {
      return values.find((item) => {
        return item[0] === value;
      });
    },
    [values],
  );

  return (
    <FormItem>
      <FormLayoutLabel label={formLabel} isRequired={isRequired} />
      <FormControl>
        <Select
          defaultValue={field.value}
          onValueChange={field.onChange}
          {...fieldProps}
        >
          <SelectTrigger className={fieldProps.className}>
            <SelectValue placeholder={fieldConfigItem.inputProps?.placeholder}>
              {field.value ? findItem(field.value)?.[1] : "Select an option"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {values.map(([value, label]) => {
              return (
                <SelectItem key={value} value={label}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </FormControl>
      <FormLayoutTooltip {...fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
