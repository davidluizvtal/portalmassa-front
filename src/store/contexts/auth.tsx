import { login } from "@pages/Login/services";
import { updateOnline } from "@pages/User/services";
import jwt_decode from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IErrorResponse } from "@services/index";
import { showErrorToast } from "@shared/toast/error/toast-error";

interface IUser {
  role: string;
  username: string;
  id: string;
}
interface AuthUser {
  username: string;
  sub: string;
  role: {
    id: string;
    name: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
  };
  iat: number;
  exp: number;
}

interface AuthContextType {
  token: string;
  user: IUser | null;
  signIn: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  signOut: (id: string, online?: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(() => {
    const user = localStorage.getItem("@vtal:user");

    if (user) {
      return JSON.parse(user);
    }

    return null;
  });

  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("@vtal:access_token");

    if (token) {
      return token;
    }

    return "";
  });

  const navigate = useNavigate();

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const { data } = await login({ username, password });

      const {
        sub,
        role: { name },
      }: AuthUser = jwt_decode(data.access_token);

      localStorage.setItem(
        "@vtal:user",
        JSON.stringify({ id: sub, username, role: name })
      );

      localStorage.setItem("@vtal:access_token", data.access_token);

      setUser({ id: sub, username, role: name });

      setToken((data as { access_token: string }).access_token);

      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: IErrorResponse | any) {
      showErrorToast({ message: err.message });
    }
  };

  const signOut = (id: string, online = false) => {
    if (id) {
      updateOnline(id, online);
    }

    setToken("");
    localStorage.clear();
    navigate("/auth/login");
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          user,
          signIn,
          signOut,
        }}
      >
        <Toaster />
        {children}
      </AuthContext.Provider>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
