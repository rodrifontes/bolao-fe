class FaseMapper {
  toDomain(persistenceFase) {
    return {
      id: persistenceFase.id,
      nome: persistenceFase.nome,
    }
  }
}

export default new FaseMapper();
