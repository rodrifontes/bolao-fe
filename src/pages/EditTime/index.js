import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Header from '../../components/Header';
import FormHeader from "../../components/FormHeader";
import FormTime from "../../components/FormTime";
import Loader from '../../components/Loader';

import TimeService from '../../services/TimeService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function EditTimes() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeNome, setTimeNome] = useState('');

  const formTimeRef = useRef(null);

  const { id } = useParams();
  const history = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadTime() {
      try {
        const time = await TimeService.getTimeById(
          id,
        );

        safeAsyncAction(() => {
          formTimeRef.current.setFieldsValues(time);

          setIsLoading(false);
          setTimeNome(time.nome);
        });
      } catch {
        safeAsyncAction(() => {
          history('/times');
          toast({
            type: 'danger',
            text: 'Time não econtrado!',
          });
        });
      }
    }

    loadTime();
  }, [id, safeAsyncAction, history])

  async function handleSubmit(time) {
    try {
      const timeData = await TimeService.updateTime(id, time);

      setTimeNome(timeData.nome);

      toast({
        type: 'sucess',
        text: 'Time alterado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o time!',
      });
    }
  }

  return (
    <>
      <Header />

      <Loader isLoading={isLoading} />

      <FormHeader title={isLoading ? 'Carregando...' : `Editar ${timeNome}`} />

      <FormTime
        ref={formTimeRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
