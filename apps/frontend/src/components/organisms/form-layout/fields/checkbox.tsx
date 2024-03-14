import React, { Fragment } from "react";

import { Checkbox } from "@/components/atoms";
import { FormControl, FormItem } from "@/components/molecules";

import { FormLayoutLabel } from "../form-layout-label";
import { FormLayoutTooltip } from "../form-layout-tooltip";

import type { FormLayoutFieldProps } from "../types";

export interface FormLayoutCheckboxFieldProps extends FormLayoutFieldProps {}

export function FormLayoutCheckboxField(props: FormLayoutCheckboxFieldProps) {
  const { label, isRequired, field, fieldConfigItem, fieldProps } = props;

  const { value, onChange } = field;

  return (
    <Fragment>
      <FormItem>
        <div className="mb-3 flex items-center gap-3">
          <FormControl>
            <Checkbox
              checked={value}
              onCheckedChange={onChange}
              {...fieldProps}
            />
          </FormControl>
          <FormLayoutLabel label={label} isRequired={isRequired} />
        </div>
      </FormItem>
      <FormLayoutTooltip {...fieldConfigItem} />
    </Fragment>
  );
}
