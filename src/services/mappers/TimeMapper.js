class TimeMapper {

  toPersistence(domainTime) {
    return {
      id: domainTime.id,
      nome: domainTime.nome,
      nome_reduzido: domainTime.nomeReduzido,
      path_escudo: domainTime.pathEscudo,
    };
  }

  toDomain(persistenceTime) {
    return {
      id: persistenceTime.id,
      nome: persistenceTime.nome,
      nomeReduzido: persistenceTime.nome_reduzido,
      pathEscudo: persistenceTime.path_escudo,
    };
  }

}

export default new TimeMapper();
