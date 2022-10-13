import { Routes, Route } from 'react-router-dom';
import Palpite from './pages/Palpite';

import Administracao from './pages/Administracao';

import ListTimes from './pages/ListTimes';
import NewTime from './pages/NewTime';
import EditTime from './pages/EditTime';

import ListCampeonatos from './pages/ListCampeonatos';
import NewCampeonato from './pages/NewCampeonato';
import EditCampeonato from './pages/EditCampeonato';

import NewJogo from './pages/NewJogo';

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Palpite />} />
      <Route path="/palpite" element={<Palpite />} />
      <Route path="/administracao" element={<Administracao />} />
      <Route path="/times" element={<ListTimes />} />
      <Route path="/times/new" element={<NewTime />} />
      <Route path="/times/edit/:id" element={<EditTime />} />
      <Route path="/campeonatos" element={<ListCampeonatos />} />
      <Route path="/campeonatos/new" element={<NewCampeonato />} />
      <Route path="/campeonatos/edit/:id" element={<EditCampeonato />} />
      <Route path="/jogos/new" element={<NewJogo />} />
    </Routes>
  );
}
