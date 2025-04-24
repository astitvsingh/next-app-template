// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

// export * from "./buttons";
// export * as Buttons from "./buttons";
// export * as ButtonComponents from "./buttons";

// export * from "./navs";
// export * as Navs from "./navs";
// export * as NavComponents from "./navs";
// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
import * as Alerts from "./alerts";
import * as Buttons from "./buttons";
import * as Sections from "./sections";
import * as Navs from "./navs";

const Components = {
  Alerts,
  ...Alerts,
  Buttons,
  ...Buttons,
  Sections,
  ...Sections,
  Navs,
  ...Navs,
};

export * from "./alerts";
export * as AlertsComponents from "./alerts";
export * from "./buttons";
export * as ButtonsComponents from "./buttons";
export * from "./navs";
export * as NavsComponents from "./navs";
export * from "./sections";
export * as SectionsComponents from "./sections";
export { Components };
