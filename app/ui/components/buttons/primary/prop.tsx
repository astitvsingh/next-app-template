// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

import type { BaseButtonProp } from "../base";

// /**
//  * PrimaryButton properties.
//  *
//  * @extends BaseButtonProp
//  */
// type Prop = Omit<BaseButtonProp, "variant">;

/**
 * PrimaryButton properties.
 *
 * Extends BaseButtonProp but enforces the variant to be "primary".
 */
interface Prop extends Omit<BaseButtonProp, "variant"> {
  variant?: "primary";
}

export type { Prop };
