import { useState } from 'react';
import delay from '../../utils/delay';
import Input from '../Input';
import { Card } from './styles';

export default function Placar({ jogo, onSubmit }) {

  const [placarMandante, setPlacarMandante] = useState(jogo.palpite_placar_mandante ?? '');
  const [placarVisitante, setPlacarVisitante] = useState(jogo.palpite_placar_visitante ?? '');
  const [jogoId] = useState(jogo.id);
  const [message, setMessage] = useState();

  function handlePlacarMandante(event) {
    setPlacarMandante(event.target.value);
    if (event.target.value && placarVisitante) {
      palpitar(event.target.value, placarVisitante);
    }
  }

  function handlePlacarVisitante(event) {
    setPlacarVisitante(event.target.value);
    if (placarMandante && event.target.value) {
      palpitar(placarMandante, event.target.value);
    }
  }

  async function palpitar(placarMandante, placarVisitante) {
    try {
      setMessage('Salvando...');

      await onSubmit({
        jogoId, placarMandante, placarVisitante
      });

      setMessage('Palpite salvo!');
      await delay(500);
    } catch {
      setMessage('Erro ao registar o palpite :(');
      await delay(500);
    } finally {
      setMessage('');
    }
  }

  return (
    <Card>
      <div className="info-partida">
        <strong>{jogo.campeonato_nome}</strong>
        <small>{jogo.data}</small>
        <small>{jogo.local}</small>
      </div>

      <div className="times">
        <div className="time">
          <span>{jogo.mandante_nome}</span>
          <img src={jogo.mandante_path_escudo} alt={jogo.mandante_nome} />
        </div>

        {(!jogo.gols_mandante && !jogo.gols_visitante) && (
          <div className="placar">
            <Input
              value={placarMandante}
              onChange={handlePlacarMandante}
            />
            x
            <Input
              value={placarVisitante}
              onChange={handlePlacarVisitante}
            />
          </div>
        )}

        {(jogo.gols_mandante && jogo.gols_visitante) && (
          <div className="resultado">
            <span className="resultado_jogo">{jogo.gols_mandante} x {jogo.gols_visitante}</span>
            <span className="palpite">({placarMandante} x {placarVisitante})</span>
          </div>
        )}

        <div className="time">
          <img src={jogo.visitante_path_escudo} alt={jogo.visitante_nome} />
          <span>{jogo.visitante_nome}</span>
        </div>
      </div>

      {(jogo.gols_mandante && jogo.gols_visitante) && (
        <div className="pontuacao">0 Pontos</div>
      )}

      {(message) && (
        <div className="pontuacao">{message}</div>
      )}
    </Card>
  );
}
