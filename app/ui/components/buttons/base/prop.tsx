// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";

/**
 * BaseButtonProp interface.
 *
 * @description
 * Props interface for the BaseButton component.
 */
interface Prop {
  /**
   * Label of the button.
   */
  label: string;

  /**
   * Variant of the button.
   */
  variant?: "primary" | "secondary" | "tertiary";

  /**
   * Size of the button.
   */
  size?: "small" | "medium" | "large";

  /**
   * Type of the button.
   */
  type?: "button" | "submit" | "reset";

  /**
   * Optional icon to display inside the button.
   */
  icon?: React.ReactNode;

  /**
   * Loading state of the button.
   */
  loading?: boolean;

  /**
   * Disabled state of the button.
   */
  disabled?: boolean;

  /**
   * Additional CSS classes.
   */
  className?: string;

  /**
   * Optional click handler.
   */
  onClick?: () => void;

  /**
   * Optional href for link buttons.
   */
  href?: string;

  /**
   * Optional target for link buttons.
   */
  target?: "_blank" | "_self" | "_parent" | "_top";

  /**
   * Optional rel attribute for link buttons.
   */
  rel?: string;
}

export type { Prop };
