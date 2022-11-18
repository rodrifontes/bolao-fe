import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MD5 from "crypto-js/md5";

import isEmailValid from '../../utils/isEmailValid';
import useAuth from '../../hooks/useAuth';

import useErrors from '../../hooks/useErrors';

import { Container, Form, FormContent } from './styles';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import { ButtonContainer } from '../../components/FormTime/styles';
import Button from '../../components/Button';

import UsuarioService from '../../services/UsuarioService';

import toast from '../../utils/toast';

export default function Login() {

  const navigate = useNavigate();
  const auth = useAuth();

  /*
  useEffect(() => {
    if (auth.token) navigate('/palpite');
  }, [auth.token, navigate]);
  */

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

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      setIsSubmitting(true);

      await auth.login(email, senha);

      navigate('/palpite');
    } catch (error) {
      toast({
        type: 'danger',
        text: error.message,
      });
      setIsSubmitting(false);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} noValidate>
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
