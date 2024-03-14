import React from "react";

import { Input } from "@/components/atoms";
import { FormControl, FormItem, FormMessage } from "@/components/molecules";

import { FormLayoutLabel } from "../form-layout-label";
import { FormLayoutTooltip } from "../form-layout-tooltip";

import type { FormLayoutFieldProps } from "../types";

export interface FormLayoutNumberFieldProps extends FormLayoutFieldProps {}

export function FormLayoutNumberField(props: FormLayoutNumberFieldProps) {
  const { label, isRequired, fieldConfigItem, fieldProps } = props;

  const { showLabel = true, ...fieldPropsWithoutShowLabel } = fieldProps;

  return (
    <FormItem>
      {showLabel && <FormLayoutLabel label={label} isRequired={isRequired} />}
      <FormControl>
        <Input type="number" {...fieldPropsWithoutShowLabel} />
      </FormControl>
      <FormLayoutTooltip {...fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
