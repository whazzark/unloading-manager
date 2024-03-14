import { forEach } from "lodash";
import { z } from "zod";

import type { FieldConfig } from "./types";
import type { InputHTMLAttributes } from "react";
import type { DefaultValues } from "react-hook-form";

// TODO: This should support recursive ZodEffects but TypeScript doesn't allow circular type definitions.
export type ZodObjectOrWrapped =
  | z.ZodObject<any, any>
  | z.ZodEffects<z.ZodObject<any, any>>;

/**
 * Beautify a camelCase string.
 * e.g. "myString" -> "My String"
 */
export function beautifyObjectName(string: string) {
  // if numbers only return the string
  const objectNameStringify = string.replaceAll(/([A-Z])/g, " $1");

  const ret =
    objectNameStringify.charAt(0).toUpperCase() + objectNameStringify.slice(1);

  return ret;
}

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseSchema<T extends z.ZodAny | z.AnyZodObject = z.ZodAny>(
  schema: T | z.ZodEffects<T>,
): T | undefined {
  if (!schema) {
    return undefined;
  }

  if ("innerType" in schema._def) {
    return getBaseSchema(schema._def.innerType as T);
  }

  if ("schema" in schema._def) {
    return getBaseSchema(schema._def.schema as T);
  }

  return schema as T;
}

/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseType(schema: z.ZodAny): z.ZodFirstPartyTypeKind {
  const baseSchema = getBaseSchema(schema);

  return baseSchema?._def.typeName || z.ZodFirstPartyTypeKind.ZodString;
}

/**
 * Search for a "ZodDefault" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema: z.ZodAny): any {
  const typedSchema = schema as unknown as z.ZodDefault<
    z.ZodNumber | z.ZodString
  >;

  if (typedSchema._def.typeName === "ZodDefault") {
    return typedSchema._def.defaultValue();
  }

  if ("innerType" in typedSchema._def) {
    return getDefaultValueInZodStack(
      typedSchema._def.innerType as unknown as z.ZodAny,
    );
  }
  if ("schema" in typedSchema._def) {
    return getDefaultValueInZodStack(
      (typedSchema._def as any).schema as z.ZodAny,
    );
  }

  return undefined;
}

/**
 * Get all default values from a Zod schema.
 */
export function getDefaultValues<T extends z.ZodObject<any, any>>(
  schema: T,
  fieldConfig?: FieldConfig<z.infer<T>>,
) {
  type DefaultValuesType = DefaultValues<Partial<z.infer<T>>>;

  if (!schema) {
    return;
  }

  const { shape } = schema;
  const defaultValues = {} as DefaultValuesType;

  if (!shape) {
    return defaultValues;
  }

  forEach(shape, (_test, key) => {
    const item = shape[key] as z.ZodAny;

    if (getBaseType(item) === "ZodObject") {
      const defaultItems = getDefaultValues(
        getBaseSchema(item) as unknown as z.ZodObject<any, any>,
        fieldConfig?.[key] as FieldConfig<z.infer<T>>,
      );

      if (defaultItems !== null) {
        forEach(defaultItems, (_test1, defaultItemKey) => {
          const pathKey = `${key}.${defaultItemKey}` as keyof DefaultValuesType;

          defaultValues[pathKey] = defaultItems?.[defaultItemKey];
        });
      }
    } else {
      let defaultValue = getDefaultValueInZodStack(item);

      if (!defaultValue && fieldConfig?.[key]?.inputProps) {
        defaultValue = (fieldConfig?.[key]?.inputProps as unknown as any)
          .defaultValue;
      }
      if (defaultValue !== undefined) {
        defaultValues[key as keyof DefaultValuesType] = defaultValue;
      }
    }
  });

  return defaultValues;
}

export function getObjectFormSchema(
  schema: ZodObjectOrWrapped,
): z.ZodObject<any, any> {
  if (schema?._def.typeName === "ZodEffects") {
    const typedSchema = schema as z.ZodEffects<z.ZodObject<any, any>>;

    return getObjectFormSchema(typedSchema._def.schema);
  }

  return schema as z.ZodObject<any, any>;
}

/**
 * Convert a Zod schema to HTML input props to give direct feedback to the user.
 * Once submitted, the schema will be validated completely.
 */
export function zodToHtmlInputProps(
  schema:
    | z.ZodNumber
    | z.ZodString
    | z.ZodOptional<z.ZodNumber | z.ZodString>
    | any,
): InputHTMLAttributes<HTMLInputElement> {
  if (["ZodOptional", "ZodNullable"].includes(schema._def.typeName)) {
    const typedSchema = schema as z.ZodOptional<z.ZodNumber | z.ZodString>;

    return {
      ...zodToHtmlInputProps(typedSchema._def.innerType),
      required: false,
    };
  }
  const typedSchema = schema as z.ZodNumber | z.ZodString;

  if (!("checks" in typedSchema._def))
    return {
      required: true,
    };

  const { checks } = typedSchema._def;
  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    required: true,
  };
  const type = getBaseType(schema);

  checks.forEach((check) => {
    if (check.kind === "min") {
      if (type === "ZodString") {
        inputProps.minLength = check.value;
      } else {
        inputProps.min = check.value;
      }
    }
    if (check.kind === "max") {
      if (type === "ZodString") {
        inputProps.maxLength = check.value;
      } else {
        inputProps.max = check.value;
      }
    }
  });

  return inputProps;
}
