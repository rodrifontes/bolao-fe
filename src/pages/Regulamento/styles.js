import styled from 'styled-components';

export const Container = styled.div`
   margin: 0 auto;
   margin-top: 32px;
   margin-bottom: 32px;
   max-width: 1200px;
   @media(max-width: 800px) {
    max-width: 350px;
  }
   width: 100%;

   h3 {
    text-align: center;
   }

   strong {
    flex-wrap: wrap;
    flex-direction: row;
   }

   p{
    margin-top: 16px;
    text-align: justify;
   }
`;
