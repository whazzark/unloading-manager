import React from "react";

import { classNames } from "@/libraries/classnames";

import type { HTMLAttributes } from "react";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        "animate-pulse rounded-md bg-primary/10",
        className,
      )}
      {...props}
    />
  );
}
