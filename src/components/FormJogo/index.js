import PropTypes from 'prop-types';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import TimeService from '../../services/TimeService';
import CampeonatoService from '../../services/CampeonatoService';
import FaseService from '../../services/FaseService';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';
import Select from '../Select';

import { maskDate } from '../../utils/formatDate';

const FormJogo = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [mandanteId, setMandanteId] = useState('');
  const [mandantes, setMandantes] = useSafeAsyncState([]);
  const [isLoadingMandantes, setIsloadingMandantes] = useSafeAsyncState(true);
  const [visitanteId, setVisitanteId] = useState('');
  const [visitantes, setVisitantes] = useSafeAsyncState([]);
  const [isLoadingVisitantes, setIsloadingVisitantes] = useSafeAsyncState(true);
  const [campeonatoId, setCampeonatoId] = useState('');
  const [campeonatos, setCampeonatos] = useSafeAsyncState([]);
  const [isLoadingCampeonatos, setIsloadingCampeonatos] = useSafeAsyncState(true);
  const [faseId, setFaseId] = useState('');
  const [fases, setFases] = useSafeAsyncState([]);
  const [isLoadingFases, setIsloadingFases] = useSafeAsyncState(true);
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName
  } = useErrors();

  const isFormValid = (
    campeonatoId &&
    faseId &&
    visitanteId &&
    mandanteId &&
    data &&
    errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (jogo) => {
      setMandanteId(jogo.mandante.id ?? '');
      setVisitanteId(jogo.visitante.id ?? '');
      setCampeonatoId(jogo.campeonato.id ?? '');
      setFaseId(jogo.fase.id ?? '');
      setData(jogo.data ?? '');
      setLocal(jogo.local ?? '');
    },
    resetFields: () => {
      setMandanteId('');
      setVisitanteId('');
      setCampeonatoId('');
      setFaseId('');
      setData('');
      setLocal('');
    }
  }), []);

  useEffect(() => {
    async function loadMandates() {
      try {
        const mandantesList = await TimeService.listTimes();

        setMandantes(mandantesList);
      } catch { } finally {
        setIsloadingMandantes(false);
      }
    }

    loadMandates();
  }, [setMandantes, setIsloadingMandantes]);

  useEffect(() => {
    async function loadVisitantes() {
      try {
        const visitantesList = await TimeService.listTimes();

        setVisitantes(visitantesList);
      } catch { } finally {
        setIsloadingVisitantes(false);
      }
    }

    loadVisitantes();
  }, [setVisitantes, setIsloadingVisitantes]);

  useEffect(() => {
    async function loadCampeonatos() {
      try {
        const cammpeonatosList = await CampeonatoService.listCampeonatos();

        setCampeonatos(cammpeonatosList);
      } catch { } finally {
        setIsloadingCampeonatos(false);
      }
    }

    loadCampeonatos();
  }, [setCampeonatos, setIsloadingCampeonatos]);

  useEffect(() => {
    async function loadFases() {
      try {
        const fasesList = await FaseService.listFases();

        setFases(fasesList);
      } catch { } finally {
        setIsloadingFases(false);
      }
    }

    loadFases();
  }, [setFases, setIsloadingFases]);

  function handleDataChange(event) {
    setData(maskDate(event.target.value));

    if (!event.target.value) {
      setError({ field: 'data', message: 'A data do jogo é obrigatória.' });
    } else {
      removeError('data');
    }
  }

  function handleLocalChange(event) {
    setLocal(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      mandanteId, visitanteId, campeonatoId, faseId, data, local,
    });

    setIsSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup isLoading={isLoadingCampeonatos}>
        <Select
          value={campeonatoId}
          onChange={(event) => setCampeonatoId(event.target.value)}
          disabled={isLoadingCampeonatos || isSubmitting}
        >
          <option value="">Selecione o campeonato...</option>

          {campeonatos.map((campeonato) => (
            <option key={campeonato.id} value={campeonato.id}>
              {campeonato.nome}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup isLoading={isLoadingFases}>
        <Select
          value={faseId}
          onChange={(event) => setFaseId(event.target.value)}
          disabled={isLoadingFases || isSubmitting}
        >
          <option value="">Selecione a fase...</option>

          {fases.map((fase) => (
            <option key={fase.id} value={fase.id}>
              {fase.nome}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup isLoading={isLoadingMandantes}>
        <Select
          value={mandanteId}
          onChange={(event) => setMandanteId(event.target.value)}
          disabled={isLoadingMandantes || isSubmitting}
        >
          <option value="">Selecione o time mandante...</option>

          {mandantes.map((mandante) => (
            <option key={mandante.id} value={mandante.id}>
              {mandante.nome}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup isLoading={isLoadingVisitantes}>
        <Select
          value={visitanteId}
          onChange={(event) => setVisitanteId(event.target.value)}
          disabled={isLoadingVisitantes || isSubmitting}
        >
          <option value="">Selecione o time visitante...</option>

          {visitantes.map((visitante) => (
            <option key={visitante.id} value={visitante.id}>
              {visitante.nome}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('data')}>
        <Input
          placeholder="Data *"
          value={data}
          maxLength="15"
          onChange={handleDataChange}
          error={getErrorMessageByFieldName('data')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('local')}>
        <Input
          placeholder="Local"
          value={local}
          onChange={handleLocalChange}
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

FormJogo.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormJogo;
