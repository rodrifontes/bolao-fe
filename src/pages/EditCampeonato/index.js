import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Header from '../../components/Header';
import FormHeader from "../../components/FormHeader";
import FormCampeonato from "../../components/FormCampeonato";
import Loader from '../../components/Loader';

import CampeonatoService from '../../services/CampeonatoService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function EditTimes() {
  const [isLoading, setIsLoading] = useState(true);
  const [campeonatoNome, setCampeonatoNome] = useState('');

  const formCampeonatoRef = useRef(null);

  const { id } = useParams();
  const history = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadCampeonato() {
      try {
        const campeonato = await CampeonatoService.getCampeonatoById(
          id,
        );

        safeAsyncAction(() => {
          formCampeonatoRef.current.setFieldsValues(campeonato);

          setIsLoading(false);
          setCampeonatoNome(campeonato.nome);
        });
      } catch {
        safeAsyncAction(() => {
          history('/campeonatos');
          toast({
            type: 'danger',
            text: 'Campeonato não econtrado!',
          });
        });
      }
    }

    loadCampeonato();
  }, [id, safeAsyncAction])

  async function handleSubmit(formData) {
    try {
      const campeonato = {
        nome: formData.nome,
        nome_reduzido: formData.nomeReduzido,
        path_escudo: formData.pathEscudo,
      };

      const campeonatoData = await CampeonatoService.updateCampeonato(id, campeonato);

      setCampeonatoNome(campeonatoData.nome);

      toast({
        type: 'sucess',
        text: 'Campeonato alterado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o campeonato!',
      });
    }
  }

  return (
    <>
      <Header />

      <Loader isLoading={isLoading} />

      <FormHeader title={isLoading ? 'Carregando...' : `Editar ${campeonatoNome}`} />

      <FormCampeonato
        ref={formCampeonatoRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
