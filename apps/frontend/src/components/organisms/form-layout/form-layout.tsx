"use client";

import React, { useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/molecules";
import { FormLayoutSubmit } from "@/components/organisms/form-layout/form-layout-submit";
import { classNames } from "@/libraries/classnames";

import { FormLayoutObjectField } from "./fields/object";
import { getDefaultValues, getObjectFormSchema } from "./utils";

import type { Dependency, FieldConfig } from "./types";
import type { ZodObjectOrWrapped } from "./utils";
import type { ReactNode } from "react";
import type { DefaultValues } from "react-hook-form";
import type { z } from "zod";

export interface FormLayoutProps<T extends ZodObjectOrWrapped> {
  formSchema: T;
  className?: string;
  dependencies?: Dependency<z.infer<T>>[];
  fieldConfig?: FieldConfig<z.infer<T>>;
  values?: Partial<z.infer<T>>;
  submitButtonLabel?: ReactNode;
  onSubmit?: (values: z.infer<T>) => void;
}

export function FormLayout<T extends ZodObjectOrWrapped>(
  props: FormLayoutProps<T>,
) {
  const {
    formSchema,
    submitButtonLabel = "Submit",
    values: valuesProp,
    onSubmit,
    fieldConfig,
    className,
    dependencies,
  } = props;

  const objectFormSchema = getObjectFormSchema(formSchema);

  const defaultValues = getDefaultValues(objectFormSchema, fieldConfig) as
    | DefaultValues<z.infer<typeof objectFormSchema>>
    | undefined;

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    values: valuesProp,
  });

  const formValues = form.watch();

  const handleSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      const parsedValues = formSchema.safeParse(values);

      if (!parsedValues.success) {
        return;
      }

      onSubmit?.(parsedValues.data);
    },
    [formSchema, onSubmit],
  );

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          className={classNames("space-y-5", className)}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormLayoutObjectField
            schema={objectFormSchema}
            form={form}
            dependencies={dependencies}
            fieldConfig={fieldConfig}
          />

          <FormLayoutSubmit className="w-full">
            {submitButtonLabel}
          </FormLayoutSubmit>
        </form>
      </Form>
    </div>
  );
}
