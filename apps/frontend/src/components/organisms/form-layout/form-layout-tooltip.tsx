import React from "react";

import type { FieldConfigItem } from "@/components/organisms/form-layout/types";

export interface FormLayoutTooltipProps extends FieldConfigItem {}

export function FormLayoutTooltip(props: FormLayoutTooltipProps) {
  const { description } = props;

  if (!description) {
    return;
  }

  return <p className="text-sm text-gray-500 dark:text-white">{description}</p>;
}
