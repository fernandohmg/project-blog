"use client";
import clsx from "clsx";
import { Moon, Rss, Sun } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import { DARK_COLORS, LIGHT_COLORS } from "@/constants";
import Cookie from "js-cookie";
import React from "react";
import styles from "./Header.module.css";

function Header({ theme, className, ...delegated }) {
  const [themeState, setThemeState] = React.useState(theme);

  function handleThemeChange() {
    const nextTheme = themeState === "light" ? "dark" : "light";

    setThemeState(nextTheme);

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    const themeColors = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    root.setAttribute("data-color-theme", nextTheme);
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <a href="/rss.xml" className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </a>
        <button className={styles.action} onClick={handleThemeChange}>
          {themeState === "light" ? (
            <Sun size="1.5rem" />
          ) : (
            <Moon size="1.5rem" />
          )}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
