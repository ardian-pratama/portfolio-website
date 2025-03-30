import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import useTheme from '../hooks/useTheme.jsx';

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size='icon'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
