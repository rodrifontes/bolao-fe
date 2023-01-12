import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';

import Login from './pages/Login';
import RecuperarSenha from './pages/RecuperarSenha';
import NewUsuarioLogin from './pages/NewUsuarioLogin';

import Palpite from './pages/Palpite';

import Administracao from './pages/Administracao';

import ListTimes from './pages/ListTimes';
import NewTime from './pages/NewTime';
import EditTime from './pages/EditTime';

import ListCampeonatos from './pages/ListCampeonatos';
import NewCampeonato from './pages/NewCampeonato';
import EditCampeonato from './pages/EditCampeonato';

import ListJogos from './pages/ListJogos';
import NewJogo from './pages/NewJogo';

import Regulamento from './pages/Regulamento';

export default function Router() {

  const { isLogged } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro-usuario" element={<NewUsuarioLogin />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/palpite" element={isLogged ? <Palpite /> : <Login />} />
      <Route path="/administracao" element={isLogged ? <Administracao /> : <Login />} />
      <Route path="/times" element={isLogged ? <ListTimes /> : <Login />} />
      <Route path="/times/new" element={isLogged ? <NewTime /> : <Login />} />
      <Route path="/times/edit/:id" element={isLogged ? <EditTime /> : <Login />} />
      <Route path="/campeonatos" element={isLogged ? <ListCampeonatos /> : <Login />} />
      <Route path="/campeonatos/new" element={isLogged ? <NewCampeonato /> : <Login />} />
      <Route path="/campeonatos/edit/:id" element={isLogged ? <EditCampeonato /> : <Login />} />
      <Route path="/jogos" element={isLogged ? <ListJogos /> : <Login />} />
      <Route path="/jogos/new" element={isLogged ? <NewJogo /> : <Login />} />
      <Route path="/regulamento" element={isLogged ? <Regulamento /> : <Login />} />
    </Routes>
  );
}
