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
import * as Buttons from "./buttons";
import * as Navs from "./navs";
const Components = {
  Buttons,
  ...Buttons,
  Navs,
  ...Navs,
};

export * from "./buttons";
export * from "./navs";
export { Components };
