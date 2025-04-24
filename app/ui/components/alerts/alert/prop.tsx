// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

/**
 * NavbarProp interface.
 *
 * @description
 * Props interface for the Navbar component.
 */
interface Prop {
  /**
   * Logo image source URL.
   */

  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error" | "info";
}

export type { Prop };