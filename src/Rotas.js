import { Routes, Route } from 'react-router-dom';
import Palpite from './pages/Palpite';

import Administracao from './pages/Administracao';
import ListTimes from './pages/ListTime';
import NewTimes from './pages/NewTime';
import EditTimes from './pages/EditTime';

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Palpite />} />
      <Route path="/palpite" element={<Palpite />} />
      <Route path="/administracao" element={<Administracao />} />
      <Route path="/times" element={<ListTimes />} />
      <Route path="/times/new" element={<NewTimes />} />
      <Route path="/times/edit/:id" element={<EditTimes />} />
    </Routes>
  );
}
