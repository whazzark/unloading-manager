import React from "react";

import { Button } from "@/components/atoms";

import type { ReactNode } from "react";

export interface FormSubmitButtonProps {
  children?: ReactNode;
  className?: string;
}

export function FormLayoutSubmit(props: FormSubmitButtonProps) {
  const { children = "Submit", className } = props;

  return (
    <Button type="submit" className={className}>
      {children}
    </Button>
  );
}
