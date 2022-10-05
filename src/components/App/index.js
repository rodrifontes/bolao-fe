import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import Header from '../Header';
import Rotas from '../../Rotas';

import { Container, Body } from './styles';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <Container>
          <Header />
          <Body>
            <Rotas />
          </Body>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
