import React from "react";

import {
  DatePicker,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/molecules";

import { FormLayoutLabel } from "../form-layout-label";
import { FormLayoutTooltip } from "../form-layout-tooltip";

import type { FormLayoutFieldProps } from "../types";

export interface FormLayoutDateFieldProps extends FormLayoutFieldProps {}

export function FormLayoutDateField(props: FormLayoutDateFieldProps) {
  const { label, isRequired, field, fieldConfigItem, fieldProps } = props;

  return (
    <FormItem>
      <FormLayoutLabel label={label} isRequired={isRequired} />
      <FormControl>
        <DatePicker
          date={field.value}
          setDate={field.onChange}
          {...fieldProps}
        />
      </FormControl>
      <FormLayoutTooltip {...fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
