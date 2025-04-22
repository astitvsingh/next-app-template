// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
import React from "react";
import clsx from "clsx";
import type { Prop } from "./prop";
import styles from "./style.module.css";

/**
 * BaseButton component.
 *
 * @description
 * A reusable base button component that can be extended and customized.
 *
 * @param prop Prop
 * @returns React.JSX.Element
 *
 * @example
 * <BaseButton label="Click me" onClick={() => console.log('Button clicked!')} />
 */
function Component(prop: Prop): React.JSX.Element {
  const { label } = prop;

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center",
        "rounded-md font-medium",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        styles.button
      )}
    >
      <span>{label}</span>
    </button>
  );
}

export { Component };
