import React from "react";

import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Unloading Manager</span>,
  project: {
    link: "https://github.com/whazzark/unloading-manager",
  },
  docsRepositoryBase:
    "https://github.com/whazzark/unloading-manager/apps/documentation",
  footer: {
    text: "Unloading Manager documentation",
  },
};

export default config;
