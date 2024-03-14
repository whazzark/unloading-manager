"use client";

import React, { forwardRef } from "react";

import { Label } from "@/components/atoms";
import { classNames } from "@/libraries/classnames";

import { useFormField } from "./use-form-field";

import type * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

export const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={classNames({ "text-destructive": error }, className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
