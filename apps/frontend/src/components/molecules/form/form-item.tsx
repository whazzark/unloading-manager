import React, { createContext, forwardRef, useId, useMemo } from "react";

import { classNames } from "@/libraries/classnames";

import type { HTMLAttributes } from "react";

export interface FormItemContextValue {
  id: string;
}

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

export const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();

  const formItemContext = useMemo<FormItemContextValue>(() => {
    return { id };
  }, [id]);

  return (
    <FormItemContext.Provider value={formItemContext}>
      <div
        ref={ref}
        className={classNames("space-y-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
});
