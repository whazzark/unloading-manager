import React, { createContext, useMemo } from "react";

import { Controller } from "react-hook-form";

import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, ...props }: ControllerProps<TFieldValues, TName>) {
  const formFieldContext = useMemo<FormFieldContextValue>(() => {
    return { name };
  }, [name]);

  return (
    <FormFieldContext.Provider value={formFieldContext}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  );
}
