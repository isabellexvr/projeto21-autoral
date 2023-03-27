import { useContext, useState, createContext } from "react";

const UserInfoContext = createContext();

export default function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfo() {
  const context = useContext(UserInfoContext);
  const { userInfo, setUserInfo } = context;
  return { userInfo, setUserInfo };
}
