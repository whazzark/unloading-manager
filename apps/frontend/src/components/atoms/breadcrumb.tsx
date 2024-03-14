import React, { forwardRef } from "react";

import { ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";

import { classNames } from "@/libraries/classnames";

import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

export const Breadcrumb = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<"nav"> & {
    separator?: ReactNode;
  }
>(({ ...props }, ref) => {
  return <nav ref={ref} aria-label="breadcrumb" {...props} />;
});

export const BreadcrumbList = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => {
  return (
    <ol
      ref={ref}
      className={classNames(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
});

export const BreadcrumbItem = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={classNames("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
});

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={classNames(
        "transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
});

export const BreadcrumbPage = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={classNames("font-normal text-foreground", className)}
      {...props}
    />
  );
});

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={classNames("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}

export function BreadcrumbEllipsis({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={classNames(
        "flex h-9 w-9 items-center justify-center",
        className,
      )}
      {...props}
    >
      <DotsHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
}
