import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

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
            text: 'Contato não econtrado!',
          });
        });
      }
    }

    loadTime();
  }, [id, safeAsyncAction])

  async function handleSubmit(formData) {
    try {
      const time = {
        nome: formData.nome,
        nome_reduzido: formData.nomeReduzido,
        path_escudo: formData.pathEscudo,
      };

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
