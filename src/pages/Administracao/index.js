import { Link } from 'react-router-dom';

import { Container, Menu } from './styles';

export default function Administracao() {
  return (
    <Container>
      <Menu>
        <Link to="/times">
          Times
        </Link>
        <Link to="/campeonatos">
          Campeonatos
        </Link>
        <Link to="/times">
          Jogos
        </Link>
        <Link to="/times">
          Usuários
        </Link>
      </Menu>
    </Container>
  );
}
