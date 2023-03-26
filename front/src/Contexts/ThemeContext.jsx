import { useContext, useState, createContext } from "react";
import { colors } from "../Services/Constants/colors";

export const themes = {
  darkTheme: {
    backgroundColor: colors.black,
    fontColor: colors.white,
  },
  lightTheme: {
    backgroundColor: colors.white,
    fontColor: colors.black,
  },
};

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.lightTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  const { theme, setTheme } = context;
  return { theme, setTheme };
}
