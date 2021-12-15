import { Container, Menu, MenuItens, BtnHeader } from './styles';

import logo from '../../assets/images/logo.svg';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="BolãoRFC" />
      <Menu>
        <MenuItens href="#">Palpites</MenuItens>
        <MenuItens href="#">Classificação</MenuItens>
        <MenuItens href="#">Regulamentos</MenuItens>
      </Menu>
      <BtnHeader href="#"> Sair </BtnHeader>
    </Container>
  );
}
