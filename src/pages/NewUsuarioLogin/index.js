import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormUsuario from '../../components/FormUsuario';

import { Container, ContainerForm, FormContent } from './styles';

import UsuarioService from '../../services/UsuarioService';

import toast from '../../utils/toast';

export default function NewUsuarioLogin() {
  const formUsuarioRef = useRef(null);

  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      const usuario = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha,
      };

      await UsuarioService.createUsuario(usuario);

      formUsuarioRef.current.resetFields();

      navigate('/login');

      toast({
        type: 'sucess',
        text: 'Usuário Cadastrado com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: error.message,
      });
    }
  }

  return (
    <Container>
      <ContainerForm>
        <FormContent>
          <h3>Cadastre-se</h3>

          <FormUsuario
            ref={formUsuarioRef}
            buttonLabel="Cadastrar"
            onSubmit={handleSubmit}
          />

          <p>
            Já possui uma conta? <Link to="/login">Login</Link>
          </p>
        </FormContent>
      </ContainerForm>
    </Container>
  );
}
