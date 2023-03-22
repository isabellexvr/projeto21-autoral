import { createContext, useState, useContext, Dispatch, SetStateAction, ReactNode } from "react";
import { colors } from "../assets/colors";

type ThemeDetails = {
    backgroundColor: string,
    fontColor: string
}

interface ThemeContextInterface {
    theme: ThemeDetails,
    setTheme: Dispatch<SetStateAction<ThemeDetails>>
} 

const ThemeContext = createContext<Partial<ThemeContextInterface>>({});

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

export function useToken() {
    const context = useContext(ThemeContext);
    const { theme, setTheme } = context;
    return ({ theme, setTheme });
}