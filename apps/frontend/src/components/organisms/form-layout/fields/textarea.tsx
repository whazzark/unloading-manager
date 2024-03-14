import React from "react";

import { Textarea } from "@/components/atoms";
import { FormControl, FormItem, FormMessage } from "@/components/molecules";

import { FormLayoutLabel } from "../form-layout-label";
import { FormLayoutTooltip } from "../form-layout-tooltip";

import type { FormLayoutFieldProps } from "../types";

export interface FormLayoutTextareaFieldProps extends FormLayoutFieldProps {}

export function FormLayoutTextareaField(props: FormLayoutTextareaFieldProps) {
  const { label, isRequired, fieldConfigItem, fieldProps } = props;

  const { showLabel = true, ...fieldPropsWithoutShowLabel } = fieldProps;

  return (
    <FormItem>
      {showLabel && <FormLayoutLabel label={label} isRequired={isRequired} />}
      <FormControl>
        <Textarea {...fieldPropsWithoutShowLabel} />
      </FormControl>
      <FormLayoutTooltip {...fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
