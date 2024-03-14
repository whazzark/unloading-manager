import { useContext } from "react";

import { useFormContext } from "react-hook-form";

import { FormFieldContext } from "./form-field";
import { FormItemContext } from "./form-item";

export const useFormField = () => {
  const { getFieldState, formState } = useFormContext();

  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);

  const { id } = itemContext;
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
