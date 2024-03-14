import React from "react";

import { Switch } from "@/components/atoms";
import { FormControl, FormItem } from "@/components/molecules";

import { FormLayoutLabel } from "../form-layout-label";
import { FormLayoutTooltip } from "../form-layout-tooltip";

import type { FormLayoutFieldProps } from "../types";

export interface FormLayoutSwitchFieldProps extends FormLayoutFieldProps {}

export function FormLayoutSwitchField(props: FormLayoutSwitchFieldProps) {
  const { label, isRequired, field, fieldConfigItem, fieldProps } = props;

  return (
    <div>
      <FormItem>
        <div className="flex items-center gap-3">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              {...fieldProps}
            />
          </FormControl>
          <FormLayoutLabel label={label} isRequired={isRequired} />
        </div>
      </FormItem>
      <FormLayoutTooltip {...fieldConfigItem} />
    </div>
  );
}
