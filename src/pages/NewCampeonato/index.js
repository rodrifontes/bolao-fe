import { useRef } from 'react';
import FormHeader from '../../components/FormHeader';
import FormCampeonato from '../../components/FormCampeonato';
import CampeonatoService from '../../services/CampeonatoService';
import toast from '../../utils/toast';

export default function NewCampeonato() {
  const formCampeonatoRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const campeonato = {
        nome: formData.nome,
      };

      await CampeonatoService.createCampeonato(campeonato);

      formCampeonatoRef.current.resetFields(campeonato);

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
      <FormHeader title="Novo campeonato" />
      <FormCampeonato
        ref={formCampeonatoRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
