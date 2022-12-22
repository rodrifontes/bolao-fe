import { useRef } from 'react';
import FormHeader from '../../components/FormHeader';
import FormJogo from '../../components/FormJogo';
import Header from '../../components/Header';
import JogoService from '../../services/JogoService';
import toast from '../../utils/toast';

export default function NewJogo() {
  const formJogoRef = useRef(null);

  async function handleSubmit(jogo) {
    try {
      await JogoService.createJogo(jogo);

      formJogoRef.current.resetFields();

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
      <Header />

      <FormHeader title="Novo Jogo" />

      <FormJogo
        ref={formJogoRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
