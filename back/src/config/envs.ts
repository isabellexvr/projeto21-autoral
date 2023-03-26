import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

//dotenv-expand => adiciona variáveis na .env

export function loadEnvs() {
    //se for test, usará a .test, se for development, usará a .development; se não houver nenhum dos dois, será a .env usual
    const path =
        process.env.NODE_ENV === "test"
            ? ".env.test"
            : process.env.NODE_ENV === "development"
                ? ".env.development"
                : ".env";

    const chosenEnv = dotenv.config({ path });
    dotenvExpand.expand(chosenEnv);
}