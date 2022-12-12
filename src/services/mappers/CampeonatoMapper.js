class CampeonatoMapper {
  toPersistence(domainCampeonato) {
    return {
      id: domainCampeonato.id,
      nome: domainCampeonato.nome,
    };
  }

  toDomain(persistenceCampeonato) {
    return {
      id: persistenceCampeonato.id,
      nome: persistenceCampeonato.nome,
    };
  }
}

export default new CampeonatoMapper();
