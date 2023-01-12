import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import Router from '../../Router';

import { Container } from './styles';

import ToastContainer from '../Toast/ToastContainer';

import { AuthProvider } from '../../context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />

        <Container>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
