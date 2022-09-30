import { Link } from 'react-router-dom';

import { Container, Menu } from './styles';

export default function Administracao() {
  return (
    <Container>
      <Menu>
        <Link to="/Times">
          Times
        </Link>
        <Link to="/Times">
          Campeonatos
        </Link>
        <Link to="/Times">
          Jogos
        </Link>
        <Link to="/Times">
          Usuários
        </Link>
      </Menu>
    </Container>
  );
}
