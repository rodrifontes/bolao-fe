import styled from 'styled-components';

export const Container = styled.header`
  margin-bottom: 24px;
  margin: 0 auto;
  margin-top: 32px;
  max-width: 800px;
  width: 100%;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
    }

    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }
  }

  h1 {
    font-size: 24px;
  }
`;
