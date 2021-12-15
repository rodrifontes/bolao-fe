import styled from 'styled-components';

export const Container = styled.header`
  background-color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  justify-content: space-between;
  padding: 0 15vw;
  height: 10vh;
  align-items: center;
`;

export const Menu = styled.nav`
  width: 100%;
  padding: 24px;
  font-size: 16px;

  @media(max-width: 800px) {
    display: none;
  }
`;

export const MenuItens = styled.a`
  text-decoration: none;
  color: #fff;
  padding: 8px;
`;

export const BtnHeader = styled.a`
  text-align: center;
  text-decoration: none;
  border-radius: 3px;
  padding: 5px 20px;
  margin: 0 10px;
  font-weight: 600;
  border: 2px solid #fff;

  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
`;
