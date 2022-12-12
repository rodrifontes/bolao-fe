class PalpiteMapper {

  toPersistence(domainPalpite) {
    return {
      id: domainPalpite.id,
      usuario_id: domainPalpite.usuarioId,
      jogo_id: domainPalpite.jogoId,
      placar_mandante: domainPalpite.placarMandante,
      placar_visitante: domainPalpite.placarVisitante,
    };
  }

  toDomain(persistencePalpite) {
    return {
      id: persistencePalpite.id,
      campeonato: {
        id: persistencePalpite.campeonato_id,
        nome: persistencePalpite.campeonato_nome,
      },
      fase: {
        id: persistencePalpite.fase_id,
        nome: persistencePalpite.fase_nome,
      },
      mandante: {
        id: persistencePalpite.mandante_id,
        nome: persistencePalpite.mandante_nome,
        nomeReduzido: persistencePalpite.mandante_nome_reduzido,
        pathEscudo: persistencePalpite.mandante_path_escudo,
        gols: persistencePalpite.gols_mandante,
        palpite: persistencePalpite.palpite_placar_mandante,
      },
      visitante: {
        id: persistencePalpite.visitante_id,
        nome: persistencePalpite.visitante_nome,
        nomeReduzido: persistencePalpite.visitante_nome_reduzido,
        pathEscudo: persistencePalpite.visitante_path_escudo,
        gols: persistencePalpite.gols_visitante,
        palpite: persistencePalpite.palpite_placar_visitante,
      },
      data: persistencePalpite.data,
      local: persistencePalpite.local,
    };
  }

}

export default new PalpiteMapper();
