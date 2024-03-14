import React, { useCallback, useState } from "react";

import { Trash2 } from "lucide-react";

import { Input } from "@/components/atoms";
import { FormControl, FormItem, FormMessage } from "@/components/molecules";

import { FormLayoutLabel } from "../form-layout-label";
import { FormLayoutTooltip } from "../form-layout-tooltip";

import type { FormLayoutFieldProps } from "../types";
import type { ChangeEvent } from "react";

export interface FormLayoutFileFieldProps extends FormLayoutFieldProps {}

export function FormLayoutFileField(props: FormLayoutFileFieldProps) {
  const { label, isRequired, fieldConfigItem, fieldProps, field } = props;

  const { showLabel = true, ...fieldPropsWithoutShowLabel } = fieldProps;

  const [file, setFile] = useState<string>();
  const [fileName, setFileName] = useState<string>();

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetedFile = e.target.files?.[0];

      if (!targetedFile) {
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setFile(reader.result as string);
        setFileName(targetedFile.name);
        field.onChange(reader.result as string);
      };
      reader.readAsDataURL(targetedFile);
    },
    [field],
  );

  const handleRemoveClick = useCallback(() => {
    setFile(undefined);
  }, []);

  return (
    <FormItem>
      {showLabel && <FormLayoutLabel label={label} isRequired={isRequired} />}
      {!file && (
        <FormControl>
          <Input
            type="file"
            {...fieldPropsWithoutShowLabel}
            value=""
            onChange={handleFileChange}
          />
        </FormControl>
      )}
      {file && (
        <div className="flex h-[40px] w-full flex-row items-center justify-between space-x-2 rounded-sm border p-2 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-white dark:text-black dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0">
          <p>{fileName}</p>
          <button
            type="button"
            aria-label="Remove image"
            onClick={handleRemoveClick}
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
      <FormLayoutTooltip {...fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
