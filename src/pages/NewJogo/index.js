import { useRef } from 'react';
import FormHeader from '../../components/FormHeader';
import FormJogo from '../../components/FormJogo';
import JogoService from '../../services/JogoService';
import toast from '../../utils/toast';

export default function NewJogo() {
  const formJogoRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const jogo = {
        mandante_id: formData.mandanteId,
        visitante_id: formData.visitanteId,
        campeonato_id: formData.campeonatoId,
        fase_id: formData.faseId,
        data: formData.data,
        local: formData.local,
      };

      await JogoService.createJogo(jogo);

      formJogoRef.current.resetFields(jogo);

      toast({
        type: 'sucess',
        text: 'Jogo cadastrado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o jogo!',
      });
    }
  }

  return (
    <>
      <FormHeader title="Novo Jogo" />
      <FormJogo
        ref={formJogoRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
