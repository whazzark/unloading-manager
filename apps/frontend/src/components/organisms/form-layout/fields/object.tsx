import React, { Fragment } from "react";

import { useFormContext } from "react-hook-form";
import { z } from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms";
import { FormField } from "@/components/molecules";

import { DEFAULT_ZOD_HANDLERS, FORM_LAYOUT_FIELDS_COMPONENTS } from "../config";
import { resolveDependencies } from "../dependencies";
import {
  beautifyObjectName,
  getBaseSchema,
  getBaseType,
  zodToHtmlInputProps,
} from "../utils";

// eslint-disable-next-line import/no-cycle
import { FormLayoutArrayField } from "./array";

import type { FormLayoutFieldType } from "../config";
import type { Dependency, FieldConfig, FieldConfigItem } from "../types";
import type { useForm } from "react-hook-form";

export interface FormLayoutObjectFieldProps<T extends z.ZodObject<any, any>> {
  schema: T | z.ZodEffects<T>;
  form: ReturnType<typeof useForm>;
  fieldConfig?: FieldConfig<z.infer<T>>;
  path?: string[];
  dependencies?: Dependency<z.infer<T>>[];
}

function DefaultParent({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

export function FormLayoutObjectField<T extends z.ZodObject<any, any>>(
  props: FormLayoutObjectFieldProps<T>,
) {
  const { schema, form, fieldConfig, path = [], dependencies = [] } = props;

  const { watch } = useFormContext(); // Use useFormContext to access the watch function

  if (!schema) {
    return;
  }
  const { shape } = getBaseSchema<T>(schema) || {};

  if (!shape) {
    return;
  }

  const handleIfZodNumber = (item: z.ZodAny) => {
    const isZodNumber = (item as any)._def.typeName === "ZodNumber";
    const isInnerZodNumber =
      (item._def as any).innerType?._def?.typeName === "ZodNumber";

    if (isZodNumber) {
      // eslint-disable-next-line no-param-reassign
      (item as any)._def.coerce = true;
    } else if (isInnerZodNumber) {
      // eslint-disable-next-line no-param-reassign
      (item._def as any).innerType._def.coerce = true;
    }

    return item;
  };

  return (
    <Accordion type="multiple" className="space-y-5 border-none">
      {Object.keys(shape).map((name) => {
        let item = shape[name] as z.ZodAny;

        item = handleIfZodNumber(item);
        const zodBaseType = getBaseType(item);
        const itemName = item._def.description ?? beautifyObjectName(name);
        const key = [...path, name].join(".");

        const {
          isHidden,
          isDisabled,
          isRequired: isRequiredByDependency,
          overrideOptions,
        } = resolveDependencies(dependencies, name, watch);

        if (isHidden) {
          return;
        }

        if (zodBaseType === "ZodObject") {
          return (
            <AccordionItem key={key} value={name} className="border-none">
              <AccordionTrigger>{itemName}</AccordionTrigger>
              <AccordionContent className="p-2">
                <FormLayoutObjectField
                  schema={item as unknown as z.ZodObject<any, any>}
                  form={form}
                  path={[...path, name]}
                  fieldConfig={
                    (fieldConfig?.[name] ?? {}) as FieldConfig<
                      z.infer<typeof item>
                    >
                  }
                />
              </AccordionContent>
            </AccordionItem>
          );
        }
        if (zodBaseType === "ZodArray") {
          return (
            <FormLayoutArrayField
              key={key}
              name={name}
              item={item as unknown as z.ZodArray<any>}
              form={form}
              fieldConfig={fieldConfig?.[name] ?? {}}
              path={[...path, name]}
            />
          );
        }

        const fieldConfigItem: FieldConfigItem = fieldConfig?.[name] ?? {};
        const zodInputProps = zodToHtmlInputProps(item);
        const isRequired =
          isRequiredByDependency ||
          zodInputProps.required ||
          fieldConfigItem.inputProps?.required ||
          false;

        if (overrideOptions) {
          item = z.enum(overrideOptions) as unknown as z.ZodAny;
        }

        return (
          <FormField
            key={key}
            control={form.control}
            name={key}
            render={({ field }) => {
              const inputType: FormLayoutFieldType =
                fieldConfigItem.fieldType ??
                DEFAULT_ZOD_HANDLERS[zodBaseType] ??
                "fallback";

              const InputComponent =
                typeof inputType === "function"
                  ? inputType
                  : FORM_LAYOUT_FIELDS_COMPONENTS[inputType];

              const ParentElement =
                fieldConfigItem.renderParent ?? DefaultParent;

              const defaultValue = fieldConfigItem.inputProps?.defaultValue;
              const value = field.value ?? defaultValue ?? "";

              const fieldProps = {
                ...zodToHtmlInputProps(item),
                ...field,
                ...fieldConfigItem.inputProps,
                disabled: fieldConfigItem.inputProps?.disabled || isDisabled,
                ref: undefined,
                value,
              };

              if (InputComponent === undefined) {
                return <Fragment />;
              }

              return (
                <ParentElement key={`${key}.parent`}>
                  <InputComponent
                    zodInputProps={zodInputProps}
                    field={field}
                    fieldConfigItem={fieldConfigItem}
                    label={itemName}
                    isRequired={isRequired}
                    zodItem={item}
                    fieldProps={fieldProps}
                    className={fieldProps.className}
                  />
                </ParentElement>
              );
            }}
          />
        );
      })}
    </Accordion>
  );
}
