import React from "react";

import { Input } from "@/components/atoms";
import { FormControl, FormItem, FormMessage } from "@/components/molecules";

import { FormLayoutLabel } from "../form-layout-label";
import { FormLayoutTooltip } from "../form-layout-tooltip";

import type { FormLayoutFieldProps } from "../types";

export interface FormLayoutInputFieldProps extends FormLayoutFieldProps {}

export function FormLayoutInputField(props: FormLayoutInputFieldProps) {
  const { label, isRequired, fieldConfigItem, fieldProps } = props;

  const { showLabel = true, ...fieldPropsWithoutShowLabel } = fieldProps;
  const type = fieldProps.type || "text";

  return (
    <div className="flex flex-row  items-center space-x-2">
      <FormItem className="flex w-full flex-col justify-start">
        {showLabel && <FormLayoutLabel label={label} isRequired={isRequired} />}
        <FormControl>
          <Input type={type} {...fieldPropsWithoutShowLabel} />
        </FormControl>
        <FormLayoutTooltip {...fieldConfigItem} />
        <FormMessage />
      </FormItem>
    </div>
  );
}
