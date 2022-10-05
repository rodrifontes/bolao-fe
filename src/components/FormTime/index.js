import PropTypes from 'prop-types';
import { useState, forwardRef, useImperativeHandle } from 'react';

import useErrors from '../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';

const FormTime = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [nome, setNome] = useState('');
  const [nomeReduzido, setNomeReduzido] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (time) => {
      setNome(time.nome ?? '');
      setNomeReduzido(time.nomeReduzido ?? '');
    },
    resetFields: () => {
      setNome('');
      setNomeReduzido('');
    }
  }), [])

  function handleNomeChange(event) {
    setNome(event.target.value);

    if (!event.target.value) {
      setError({ field: 'nome', message: 'Nome é obrigatório.' });
    } else {
      removeError('nome');
    }
  }

  function handleNomeReduzidoChange(event) {
    setNomeReduzido(event.target.value);

    if (!event.target.value) {
      setError({ field: 'nomeReduzido', message: 'Nome reduzido é obrigatório.' });
    } else {
      removeError('nomeReduzido');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      nome, nomeReduzido,
    });

    setIsSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('nome')}>
        <Input
          placeholder="Nome *"
          value={nome}
          onChange={handleNomeChange}
          error={getErrorMessageByFieldName('nome')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('nomeReduzido')}>
        <Input
          placeholder="Nome Reduzido *"
          value={nomeReduzido}
          onChange={handleNomeReduzidoChange}
          error={getErrorMessageByFieldName('nomeReduzido')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

FormTime.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormTime;
