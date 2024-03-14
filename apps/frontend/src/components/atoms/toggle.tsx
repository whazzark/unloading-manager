"use client";

import React, { forwardRef } from "react";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { classNames } from "@/libraries/classnames";

import type { ComponentPropsWithoutRef, ElementRef } from "react";

export const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const Toggle = forwardRef<
  ElementRef<typeof TogglePrimitive.Root>,
  ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={classNames(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
});
