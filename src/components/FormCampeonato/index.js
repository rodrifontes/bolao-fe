import PropTypes from 'prop-types';
import { useState, forwardRef, useImperativeHandle } from 'react';

import useErrors from '../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';

const FormCampeonato = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [nome, setNome] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (campeonato) => {
      setNome(campeonato.nome ?? '');
    },
    resetFields: () => {
      setNome('');
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

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      nome,
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

FormCampeonato.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormCampeonato;
