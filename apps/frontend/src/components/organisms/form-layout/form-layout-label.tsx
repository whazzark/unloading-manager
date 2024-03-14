import React from "react";

import { FormLabel } from "@/components/molecules";
import { classNames } from "@/libraries/classnames";

export interface FormLayoutLabelProps {
  label: string;
  isRequired: boolean;
  className?: string;
}

export function FormLayoutLabel(props: FormLayoutLabelProps) {
  const { label, isRequired, className } = props;

  return (
    <FormLabel className={classNames(className)}>
      {label}
      {isRequired && <span className="text-destructive"> *</span>}
    </FormLabel>
  );
}
