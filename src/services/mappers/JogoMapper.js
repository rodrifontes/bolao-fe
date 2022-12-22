import { formatIsoDate } from "../../utils/formatDate";

class JogoMapper {

  toPersistence(domainJogo) {
    return {
      id: domainJogo.id,
      campeonato_id: domainJogo.campeonatoId,
      fase_id: domainJogo.faseId,
      mandante_id: domainJogo.mandanteId,
      visitante_id: domainJogo.visitanteId,
      data: formatIsoDate(domainJogo.data),
      local: domainJogo.local,
    };
  }

  toDomain(persistenceJogo) {
    return {
      id: persistenceJogo.id,
      campeonato: {
        id: persistenceJogo.campeonato_id,
        nome: persistenceJogo.campeonato_nome,
      },
      fase: {
        id: persistenceJogo.fase_id,
        nome: persistenceJogo.fase_nome,
      },
      mandante: {
        id: persistenceJogo.mandante_id,
        nome: persistenceJogo.mandante_nome,
        nomeReduzido: persistenceJogo.mandante_nome_reduzido,
        pathEscudo: persistenceJogo.mandante_path_escudo,
        gols: persistenceJogo.gols_mandante,
      },
      visitante: {
        id: persistenceJogo.visitante_id,
        nome: persistenceJogo.visitante_nome,
        nomeReduzido: persistenceJogo.visitante_nome_reduzido,
        pathEscudo: persistenceJogo.visitante_path_escudo,
        gols: persistenceJogo.gols_visitante,
      },
      data: persistenceJogo.data,
      local: persistenceJogo.local,
    };
  }

}

export default new JogoMapper();
