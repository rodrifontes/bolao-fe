import { Link, useNavigate } from 'react-router-dom';

import { Container, Menu, BtnHeader } from './styles';

import logo from '../../assets/images/logo.svg';

import useAuth from "../../hooks/useAuth";

export default function Header() {

  let navigate = useNavigate();
  const auth = useAuth();

  function logout() {
    auth.logout();
    navigate('/');
  }

  return (
    <Container>
      <img src={logo} alt="BolãoRFC" />
      <Menu>
        <Link to="/palpite">Palpites</Link>
        <Link to="#">Ranking</Link>
        <Link to="/regulamento">Regulamento</Link>
      </Menu>
      {auth.user.email === 'rodrifontes@gmail.com' && (
        <BtnHeader primary>
          <Link to="/administracao" > Admin </Link>
        </BtnHeader>
      )}
      <BtnHeader>
        <Link
          to={'..'}
          onClick={logout}
        >
          Sair
        </Link>
      </BtnHeader>
    </Container>
  );
}
