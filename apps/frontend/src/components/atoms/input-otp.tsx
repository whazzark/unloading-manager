"use client";

import React, { forwardRef } from "react";

import { DashIcon } from "@radix-ui/react-icons";
import { OTPInput } from "input-otp";

import { classNames } from "@/libraries/classnames";

import type { SlotProps } from "input-otp";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

export const InputOTP = forwardRef<
  ElementRef<typeof OTPInput>,
  ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, ...props }, ref) => {
  return (
    <OTPInput
      ref={ref}
      containerClassName={classNames("flex items-center gap-2", className)}
      {...props}
    />
  );
});

export const InputOTPGroup = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames("flex items-center", className)}
      {...props}
    />
  );
});

export const InputOTPSlot = forwardRef<
  ElementRef<"div">,
  SlotProps & ComponentPropsWithoutRef<"div">
>(({ char, hasFakeCaret, isActive, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});

export const InputOTPSeparator = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => {
  return (
    <div ref={ref} role="separator" {...props}>
      <DashIcon />
    </div>
  );
});
