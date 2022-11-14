import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [signed, setSigned] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    setToken(token);
    setUser(user);
    setSigned(token ? true : false);
  }, []);

  function logout() {
    setUser('');
    setToken('');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ signed, user, token, logout }}>
      {children}
    </AuthContext.Provider >
  );

}

