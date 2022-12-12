class ResultadoMapper {

  toPersistence(domainResultado) {
    return {
      id: domainResultado.id,
      gols_mandante: domainResultado.golsMandante,
      gols_visitante: domainResultado.golsVisitante,
    }
  }

}

export default new ResultadoMapper();
