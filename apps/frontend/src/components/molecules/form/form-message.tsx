import React, { forwardRef } from "react";

import { classNames } from "@/libraries/classnames";

import { useFormField } from "./use-form-field";

import type { HTMLAttributes } from "react";

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={classNames(
        "text-[0.8rem] font-medium text-destructive",
        className,
      )}
      {...props}
    >
      {body}
    </p>
  );
});
