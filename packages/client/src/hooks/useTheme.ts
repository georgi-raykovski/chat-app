import React from "react"
import { Theme } from "../styles";

type ThemeKey = 'light' | 'dark';
const THEME_KEY = 'themeKey';

const isValidThemeKey = (key: string): key is ThemeKey => {
  return key === 'light' || key === 'dark';
};

const getInitialLocalThemeKey = (): ThemeKey => {
  const themeKey = localStorage.getItem(THEME_KEY) ?? 'light';
  return isValidThemeKey(themeKey) ? themeKey : 'light';
};

export const useTheme = () => {
  const [themeKey, setThemeKey] = React.useState<ThemeKey>(getInitialLocalThemeKey);

  const onThemeSwitchHandler = React.useCallback(() => {
    const nextThemeKey = themeKey === 'light' ? 'dark' : 'light';
    setThemeKey(nextThemeKey);
    localStorage.setItem(THEME_KEY, nextThemeKey);
  }, [themeKey]);

  const currentTheme = Theme[themeKey];

  return { onThemeSwitchHandler, currentTheme }
}
