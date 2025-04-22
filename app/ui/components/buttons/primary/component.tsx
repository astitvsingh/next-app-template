// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
import React from "react";
import { BaseButton } from "../base";
import type { Prop } from "./prop";


/**
 * PrimaryButton component.
 *
 * @description
 * A primary button component that extends the base button with primary styling.
 *
 * @param prop Prop
 * @returns React.JSX.Element
 *
 * @example
 * <PrimaryButton label="Submit" onClick={() => console.log('Submitted!')} />
 */
function Component(prop: Prop): React.JSX.Element {
  return <BaseButton {...prop} variant="primary" />;
}

export { Component };
