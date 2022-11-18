import styled from 'styled-components';
import backgroundLogin from '../../assets/images/background-login.jpg';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url(${backgroundLogin});
  background-position: 30% 45%;
  background-size: cover;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 420px;
  @media(max-width: 800px) {
    max-width: 350px;
  }
  box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
  padding-top: 30px;
  padding-bottom: 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
`;

export const FormContent = styled.div`
  padding-left: 12%;
  padding-right: 12%;

  h3{
    text-align: center;
    margin-bottom: 1em;
    font-size: 24px;
    color: rgb(34, 34, 34);
    font-weight: 800;
  }

  p {
    text-align: right;
    font-size: 13px;
    padding-top: 10px;
    color: #7f7d7d;
    margin: 0;
  }

  a {
    color: #167bff;
  }
`;

export const Copyright = styled.div`
  width: 100%;
`;
