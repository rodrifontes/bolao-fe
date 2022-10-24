import { Link } from 'react-router-dom';
import Header from '../../components/Header';

import { Container, Menu } from './styles';

export default function Administracao() {
  return (
    <>
      <Header />
      <Container>
        <Menu>
          <Link to="/times">
            Times
          </Link>
          <Link to="/campeonatos">
            Campeonatos
          </Link>
          <Link to="/jogos/new">
            Jogos
          </Link>
          <Link to="/times">
            Usuários
          </Link>
        </Menu>
      </Container>
    </>
  );
}
