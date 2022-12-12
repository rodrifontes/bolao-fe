import { useRef } from 'react';
import FormHeader from '../../components/FormHeader';
import FormTime from '../../components/FormTime';
import Header from '../../components/Header';
import TimeService from '../../services/TimeService';
import toast from '../../utils/toast';

export default function NewTime() {
  const formTimeRef = useRef(null);

  async function handleSubmit(time) {
    try {
      await TimeService.createTime(time);

      formTimeRef.current.resetFields();

      toast({
        type: 'sucess',
        text: 'Time cadastrado com sucesso!',
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

      <FormHeader title="Novo time" />
      <FormTime
        ref={formTimeRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
