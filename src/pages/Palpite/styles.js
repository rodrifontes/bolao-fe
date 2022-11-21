import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  margin-top: 32px;
  max-width: 800px;
  width: 100%;
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
