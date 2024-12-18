import {ThemeProvider as GThemeProvider} from '@gravity-ui/uikit';
import { useSelector } from 'react-redux';
import { selectCurrentTheme } from '../model/slice';

export interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const theme = useSelector(selectCurrentTheme);
    console.log(theme);
    
    return <GThemeProvider theme={theme}>{children}</GThemeProvider>
}

export default ThemeProvider;