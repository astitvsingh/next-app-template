// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

/**
 * Represents a single navigation link in the Navbar.
 */
interface NavLink {
  /**
   * Display label of the link.
   */
  label: string;

  /**
   * URL path the link points to.
   */
  href: string;
}

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
  logoSrc: string;

  /**
   * Logo alt text.
   */
  logoAlt: string;

  /**
   * Array of navigation links to display.
   */
  links: NavLink[];

  /**
   * Optional className for additional styling.
   */
  className?: string;

  /**
   * Optional callback for mobile menu toggle.
   */
  onMobileMenuToggle?: () => void;
}

export type { NavLink };
export type { Prop };