import React, { forwardRef } from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { classNames } from "@/libraries/classnames";

import { buttonVariants } from "./button";

import type { ButtonProps } from "./button";
import type { ComponentProps } from "react";

export function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={classNames("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export const PaginationContent = forwardRef<
  HTMLUListElement,
  ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={classNames("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
});

export const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => {
    return <li ref={ref} className={classNames("", className)} {...props} />;
  },
);

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  ComponentProps<"a">;

export function PaginationLink({
  className,
  isActive,
  size = "icon",
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={classNames(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function PaginationPrevious({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={classNames("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={classNames("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>Next</span>
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={classNames(
        "flex h-9 w-9 items-center justify-center",
        className,
      )}
      {...props}
    >
      <DotsHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
