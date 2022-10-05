import { useRef } from 'react';
import FormHeader from '../../components/FormHeader';
import FormTime from '../../components/FormTime';
import TimeService from '../../services/TimeService';
import toast from '../../utils/toast';

export default function NewTimes() {
  const formTimeRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const time = {
        nome: formData.nome,
        nome_reduzido: formData.nomeReduzido,
      };

      await TimeService.createTime(time);

      formTimeRef.current.resetFields(time);

      toast({
        type: 'sucess',
        text: 'Times Cadastrado com sucesso!',
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
      <FormHeader title="Novo Time" />
      <FormTime
        ref={formTimeRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
