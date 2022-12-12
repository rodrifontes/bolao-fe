class UsuarioMapper {

  toDomain(persistenceUsuario) {
    return {
      id: persistenceUsuario.id,
      nome: persistenceUsuario.nome,
      email: persistenceUsuario.email,
      telefone: persistenceUsuario.telefone,
      senha: persistenceUsuario.senha,
    };
  }

  toPersistence(domainUsuario) {
    return {
      id: domainUsuario.id,
      nome: domainUsuario.nome,
      email: domainUsuario.email,
      telefone: domainUsuario.telefone,
      senha: domainUsuario.senha,
    };
  }

}

export default new UsuarioMapper();
