import { Link } from 'react-router-dom';

import { Container, Menu, BtnHeader } from './styles';

import logo from '../../assets/images/logo.svg';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="BolãoRFC" />
      <Menu>
        <Link to="#">Bolões</Link>
        <Link to="/palpite">Palpites</Link>
        <Link to="#">Regulamentos</Link>
      </Menu>
      <BtnHeader primary>
        <Link to="/administracao" > Admin </Link>
      </BtnHeader>
      <BtnHeader>
        <Link to="#"> Sair </Link>
      </BtnHeader>
    </Container>
  );
}
