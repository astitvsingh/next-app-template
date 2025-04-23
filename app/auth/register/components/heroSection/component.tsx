// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
import React, { useEffect, useState } from "react";
import type { Prop } from "./prop";
import styles from "./style.module.css";
import { BaseButton } from "@/app";

/**
 * HeroSection component.
 *
 * @param prop Prop
 * @returns React.JSX.Element
 */
function Component(prop: Prop): React.JSX.Element {
  const { heading, description, backgroundImages } = prop;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [backgroundImages.length]);

  return (
    <section
      className={`flex flex-col justify-between h-screen ${styles.heroSection} transition-all duration-1000`}
      style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
    >
      {/* Heading at the top */}
      <div className="text-center mt-28 text-white">
        <h1 className="text-5xl font-bold sm:mb-28">{heading}</h1>
      </div>

      {/* Description and Button at the bottom */}
      <div className="text-center mb-20 text-white">
        <p className="text-2xl mb-4">{description}</p>
        <button className="bg-blue-600 text-2xl text-white-600 py-2 px-6 rounded-full hover:bg-orange-600">
          Paw some UDAWG
        </button>
      </div>
    </section>
  );
}

export { Component };
