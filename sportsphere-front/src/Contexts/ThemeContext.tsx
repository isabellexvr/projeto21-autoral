import { createContext, useState, useContext, Dispatch, SetStateAction, ReactNode } from "react";
import { colors } from "../assets/colors";

export const themes = {
    darkTheme: {
        backgroundColor: colors.black,
        fontColor: colors.white
    },
    lightTheme: {
        backgroundColor: colors.white,
        fontColor: colors.black
    },
}

type ThemeDetails = {
    backgroundColor: string,
    fontColor: string
}

interface ThemeContextInterface {
    theme: ThemeDetails,
    setTheme: Dispatch<SetStateAction<ThemeDetails>>
} 

const defaultState = {
    theme: themes.lightTheme,
    setTheme: (theme: ThemeDetails) => {}
} as ThemeContextInterface

const ThemeContext = createContext(defaultState);

type UserProviderProps = {
    children: ReactNode
}

export default function ThemeProvider({ children }: UserProviderProps) {

    const [theme, setTheme] = useState<ThemeDetails>({backgroundColor: colors.white, fontColor: colors.black});

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    const { theme, setTheme } = context;
    return ({ theme, setTheme });
}