import React from "react";

import Image from "next/image";

import type { PropsWithChildren } from "react";

export default function AuthenticationLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="flex flex-1 flex-row">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/3 xl:w-7/12">
          <div className="flex justify-center mb-4">
            <Image
              src="/vercel.svg"
              width={200}
              height={80}
              alt="Authentication logo"
            />
          </div>

          {children}
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative shadow">
        <Image
          fill={true}
          className="object-cover"
          src="/authentication-background.jpeg"
          alt="Authentication background image"
        />
      </div>
    </div>
  );
}
