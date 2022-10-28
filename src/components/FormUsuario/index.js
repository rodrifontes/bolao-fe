import PropTypes from 'prop-types';
import { useState, forwardRef, useImperativeHandle } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';

import { Form, ButtonContainer } from './style';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';

const FormUsuario = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName
  } = useErrors();

  const isFormValid = (
    nome &&
    email &&
    telefone &&
    senha &&
    confirmarSenha
    && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (usuario) => {
      setNome(usuario.nome ?? '');
      setEmail(usuario.email ?? '');
      setTelefone(formatPhone(usuario.telefone ?? ''));
      setSenha(usuario.senha ?? '');
    },
    resetFields: () => {
      setNome('');
      setEmail('');
      setTelefone('');
      setSenha('');
    },
  }), []);

  function handleNomeChange(event) {
    setNome(event.target.value);

    if (!event.target.value) {
      setError({ field: 'nome', message: 'O nome é obrigatório.' });
    } else {
      removeError('nome');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function handleTelefoneChange(event) {
    setTelefone(formatPhone(event.target.value));

    if (!event.target.value) {
      setError({ field: 'telefone', message: 'Telefone é obrigatório.' });
    } else {
      removeError('telefone');
    }
  }

  function handleSenhaChange(event) {
    setSenha(event.target.value);

    if (!event.target.value) {
      setError({ field: 'senha', message: 'A senha é obrigatória.' });
    } else {
      removeError('senha');
      if ((confirmarSenha) && (confirmarSenha !== event.target.value)) {
        setError({
          field: 'confirmarSenha',
          message: 'A senha não confere com o confirmar senha.'
        });
      } else {
        removeError('confirmarSenha');
      }
    }

  }

  function handleConfirmarSenhaChange(event) {
    setConfirmarSenha(event.target.value);

    if (!event.target.value) {
      setError({ field: 'confirmarSenha', message: 'O confirmar senha é obrigatório.' });
      return;
    }

    if ((event.target.value) && (senha) && (event.target.value !== senha)) {
      setError({ field: 'confirmarSenha', message: 'A senha não confere com o confirmar senha.' });
      return;
    }

    removeError('confirmarSenha');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    console.log({
      nome, email, telefone, senha,
    });

    await onSubmit({
      nome, email, telefone, senha,
    });

    setIsSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('nome')}>
        <Input
          type="nome"
          placeholder="Nome *"
          value={nome}
          onChange={handleNomeChange}
          error={getErrorMessageByFieldName('nome')}
          disabled={isSubmitting}
        />
      </FormGroup>

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

      <FormGroup error={getErrorMessageByFieldName('telefone')}>
        <Input
          type="telefone"
          placeholder="Telefone *"
          value={telefone}
          onChange={handleTelefoneChange}
          maxLength="15"
          error={getErrorMessageByFieldName('telefone')}
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

      <FormGroup error={getErrorMessageByFieldName('confirmarSenha')}>
        <Input
          type="password"
          placeholder="Confirmar Senha *"
          value={confirmarSenha}
          onChange={handleConfirmarSenhaChange}
          error={getErrorMessageByFieldName('confirmarSenha')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          Cadastre-se
        </Button>
      </ButtonContainer>
    </Form>
  );

});

FormUsuario.prototype = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default FormUsuario;
