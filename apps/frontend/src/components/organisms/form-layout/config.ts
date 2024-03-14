import { FormLayoutCheckboxField } from "./fields/checkbox";
import { FormLayoutDateField } from "./fields/date";
import { FormLayoutEnumField } from "./fields/enum";
import { FormLayoutFileField } from "./fields/file";
import { FormLayoutInputField } from "./fields/input";
import { FormLayoutNumberField } from "./fields/number";
import { FormLayoutRadioGroupField } from "./fields/radio-group";
import { FormLayoutSwitchField } from "./fields/switch";
import { FormLayoutTextareaField } from "./fields/textarea";

import type { FormLayoutFieldProps } from "./types";
import type { ReactNode } from "react";
import type { z } from "zod";

export type FormLayoutFieldType =
  | "checkbox"
  | "date"
  | "select"
  | "radio"
  | "switch"
  | "textarea"
  | "number"
  | "file"
  | "fallback";

export const FORM_LAYOUT_FIELDS_COMPONENTS: Record<
  FormLayoutFieldType,
  (props: FormLayoutFieldProps) => ReactNode
> = {
  checkbox: FormLayoutCheckboxField,
  date: FormLayoutDateField,
  select: FormLayoutEnumField,
  radio: FormLayoutRadioGroupField,
  switch: FormLayoutSwitchField,
  textarea: FormLayoutTextareaField,
  number: FormLayoutNumberField,
  file: FormLayoutFileField,
  fallback: FormLayoutInputField,
};

export const DEFAULT_ZOD_HANDLERS: Partial<
  Record<z.ZodFirstPartyTypeKind, FormLayoutFieldType>
> = {
  ZodString: "fallback",
  ZodBoolean: "checkbox",
  ZodDate: "date",
  ZodEnum: "select",
  ZodNativeEnum: "select",
  ZodNumber: "number",
  ZodBigInt: "number",
};
