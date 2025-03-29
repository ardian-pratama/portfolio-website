import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/features/theme/themeSlice.js';

export default function ThemeButton() {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  return (
    <Button
      size='icon'
      onClick={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
