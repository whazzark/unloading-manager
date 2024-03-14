import React, { forwardRef } from "react";

import { Slot } from "@radix-ui/react-slot";

import { useFormField } from "./use-form-field";

import type { ComponentPropsWithoutRef, ElementRef } from "react";

export const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-invalid={!!error}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`
      }
      {...props}
    />
  );
});
