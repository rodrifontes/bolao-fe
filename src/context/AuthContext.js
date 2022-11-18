import { useState, createContext, useEffect } from 'react';
import MD5 from "crypto-js/md5";
import UsuarioService from '../services/UsuarioService';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    setToken(token);
    setUser(JSON.parse(user));
    setIsLogged(token ? true : false);
  }, []);

  function logout() {
    setUser('');
    setToken('');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  async function login(email, senha) {
    const { access_token, user } = await UsuarioService.login({
      email,
      senha: MD5(senha).toString(),
    });
    console.log(access_token, user);

    sessionStorage.setItem('token', access_token);
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setToken(access_token);

  }

  return (
    <AuthContext.Provider value={{ isLogged, user, token, login, logout }}>
      {children}
    </AuthContext.Provider >
  );

}

