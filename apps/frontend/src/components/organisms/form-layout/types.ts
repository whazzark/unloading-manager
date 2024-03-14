import type { FormLayoutFieldType } from "./config";
import type {
  InputHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import type { z } from "zod";

/**
 * A FormInput component can handle a specific Zod type (e.g. "ZodBoolean")
 */
export interface FormLayoutFieldProps {
  zodInputProps: InputHTMLAttributes<HTMLInputElement>;
  field: ControllerRenderProps<FieldValues, any>;
  fieldConfigItem: FieldConfigItem;
  label: string;
  isRequired: boolean;
  fieldProps: any;
  zodItem: z.ZodAny;
  className?: string;
}

export interface FieldConfigItemInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  showLabel?: boolean;
}

export interface FieldConfigItem {
  description?: ReactNode;
  inputProps?: FieldConfigItemInputProps;
  fieldType?: FormLayoutFieldType;

  renderParent?: (props: PropsWithChildren) => ReactElement | null;
}

export type FieldConfig<SchemaType extends z.infer<z.ZodObject<any, any>>> = {
  // If SchemaType.key is an object, create a nested FieldConfig, otherwise FieldConfigItem
  [Key in keyof SchemaType]?: SchemaType[Key] extends object
    ? FieldConfig<z.infer<SchemaType[Key]>>
    : FieldConfigItem;
};

export enum DependencyType {
  DISABLES,
  REQUIRES,
  HIDES,
  SETS_OPTIONS,
}

interface BaseDependency<T extends z.infer<z.ZodObject<any, any>>> {
  sourceField: keyof T;
  type: DependencyType;
  targetField: keyof T;
  when: (sourceFieldValue: any, targetFieldValue: any) => boolean;
}

export interface ValueDependency<T extends z.infer<z.ZodObject<any, any>>>
  extends BaseDependency<T> {
  type:
    | DependencyType.DISABLES
    | DependencyType.REQUIRES
    | DependencyType.HIDES;
}

export type EnumValues = readonly [string, ...string[]];

export interface OptionsDependency<T extends z.infer<z.ZodObject<any, any>>>
  extends BaseDependency<T> {
  type: DependencyType.SETS_OPTIONS;
  options: EnumValues;
}

export type Dependency<T extends z.infer<z.ZodObject<any, any>>> =
  | ValueDependency<T>
  | OptionsDependency<T>;
