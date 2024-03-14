"use client";

import React, { createContext, forwardRef, useContext, useMemo } from "react";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { classNames } from "@/libraries/classnames";

import { toggleVariants } from "./toggle";

import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

export type ToggleGroupContextProps = VariantProps<typeof toggleVariants>;

export const ToggleGroupContext = createContext<ToggleGroupContextProps>({
  size: "default",
  variant: "default",
});

export const ToggleGroup = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => {
  const toggleGroupContext = useMemo<ToggleGroupContextProps>(() => {
    return {
      variant,
      size,
    };
  }, [size, variant]);

  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={classNames(
        "flex items-center justify-center gap-1",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={toggleGroupContext}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});

export const ToggleGroupItem = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={classNames(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size ?? size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
