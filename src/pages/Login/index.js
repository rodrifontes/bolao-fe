import { useState } from 'react';

import isEmailValid from '../../utils/isEmailValid';

import useErrors from '../../hooks/useErrors';

import { Container, Copyright, Form, FormContent } from './styles';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import { ButtonContainer } from '../../components/FormTime/styles';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

export default function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName
  } = useErrors();

  const isFormValid = (email && senha && errors.length === 0);

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function handleSenhaChange(event) {
    setSenha(event.target.value);

    if (!event.target.value) {
      setError({ field: 'senha', message: 'A senha é obrigatória.' });
    } else {
      removeError('senha');
    }
  }

  return (
    <Container>
      <Form>
        <FormContent>
          <h3>Login</h3>
          <FormGroup error={getErrorMessageByFieldName('email')}>
            <Input
              type="email"
              placeholder="E-mail *"
              value={email}
              onChange={handleEmailChange}
              error={getErrorMessageByFieldName('email')}
              disabled={isSubmitting}
            />
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName('senha')}>
            <Input
              type="password"
              placeholder="Senha *"
              value={senha}
              onChange={handleSenhaChange}
              error={getErrorMessageByFieldName('senha')}
              disabled={isSubmitting}
            />
          </FormGroup>

          <ButtonContainer>
            <Button
              type="submit"
              disabled={!isFormValid}
              isLoading={isSubmitting}
            >
              Logar
            </Button>
          </ButtonContainer>

          <p>
            <Link to="/recuperar-senha">Recuperar senha</Link>
          </p>
          <p>
            Não é cadastrado? <Link to="/cadastro-usuario">Cadastre-se</Link>
          </p>
        </FormContent>
      </Form>
    </Container>
  );
}
