import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  width: 100%;
  max-width: 800px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  strong {
    display: block;
    font-size: 16px;
  }

  small {
    display: block;
  }

  img {
    width: 50px;
    height: 50px;
    margin: 8px
  }

  .info-partida {
    text-align: center;
  }

  .times {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .time {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33%;

    span {
      text-align: center;
    }

    .nome {
      @media(max-width: 800px) {
        display: none;
      }
    }

    .nome_reduzido {
      text-transform: uppercase;
      @media(min-width: 800px) {
        display: none;
      }
    }
  }

  .placar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 33%;
  }

  Input {
    width: 50px;
    border-color: ${({ theme }) => theme.colors.primary.lighter};
    font-weight: bold;
    text-align: center;
  }

  .resultado {
    text-align: center;


    span {
      display: block;
    }

    .resultado_jogo {
      font-size: 24px;
      font-weight: bold;
    }

    .palpite {
      font-size: 16px;
    }
  }

  .pontuacao {
    margin-top: 16px;
    text-align: center;
    font-weight: bold;
  }

`;
