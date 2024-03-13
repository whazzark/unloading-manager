import React, { Fragment } from "react";

import {
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/atoms";

import type { PropsWithChildren, ReactNode } from "react";

export interface AuthenticationTemplateProps extends PropsWithChildren {
  title: string;
  description: string;
  footer: ReactNode;
}

export function AuthenticationTemplate(props: AuthenticationTemplateProps) {
  const { children, description, footer, title } = props;

  return (
    <Fragment>
      <CardHeader className="items-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="flex justify-center">{footer}</CardFooter>
    </Fragment>
  );
}
