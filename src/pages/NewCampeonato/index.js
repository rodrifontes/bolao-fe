import { useRef } from 'react';
import FormHeader from '../../components/FormHeader';
import FormCampeonato from '../../components/FormCampeonato';
import CampeonatoService from '../../services/CampeonatoService';
import toast from '../../utils/toast';
import Header from '../../components/Header';

export default function NewCampeonato() {
  const formCampeonatoRef = useRef(null);

  async function handleSubmit(campeonato) {
    try {
      await CampeonatoService.createCampeonato(campeonato);

      formCampeonatoRef.current.resetFields();

      toast({
        type: 'sucess',
        text: 'Campeonato cadastrado com sucesso!',
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

      <FormHeader title="Novo campeonato" />
      <FormCampeonato
        ref={formCampeonatoRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
