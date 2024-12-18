import { Button, Icon } from "@gravity-ui/uikit";
import { Moon, Sun } from "@gravity-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import { changeTheme, selectCurrentTheme } from "../model/slice";

export const ThemeToggleButton = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectCurrentTheme);
    const isDark = theme === 'dark';

    const toggleTheme = () => {
        if (isDark) {
            dispatch(changeTheme('light'));
        } else {
            dispatch(changeTheme('dark'));
        }
    }

    return (
        <Button size="l" view="outlined" onClick={toggleTheme}>
            <Icon data={isDark ? Moon : Sun} />
        </Button>
    )
};

export default ThemeToggleButton;
