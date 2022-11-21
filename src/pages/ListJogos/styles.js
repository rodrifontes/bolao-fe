import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  margin-top: 32px;
  max-width: 800px;
  width: 100%;

  .voltar {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-bottom: 16px;

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
    }

    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }
  }
`;

export const HeaderForm = styled.header`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 32px;
  padding-bottom: 16px;

  strong {
    font-size: 24px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;

export const ErrorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  .details {
    margin-left: 24px;

    strong {
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
      margin-bottom: 8px;
    }
  }
`;
