import { useContext } from 'react';

import { ThemeContext } from '../contexts/ThemeContext';
import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';

export function ToggleTheme() {
  const { theme, setTheme } = useContext(ThemeContext);

  function handleToggleTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <span onClick={handleToggleTheme}>
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </span>
  );
}
