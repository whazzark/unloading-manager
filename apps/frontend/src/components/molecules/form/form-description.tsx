import React, { forwardRef } from "react";

import { classNames } from "@/libraries/classnames";

import { useFormField } from "./use-form-field";

import type { HTMLAttributes } from "react";

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={classNames("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
