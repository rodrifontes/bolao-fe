import { useState } from 'react';
import delay from '../../utils/delay';
import Input from '../Input';
import { Card } from './styles';
import formatDate from '../../utils/formatDate';

export default function Placar({ jogo, onSubmit }) {

  const [placarMandante, setPlacarMandante] = useState(jogo.palpite_placar_mandante ?? '');
  const [placarVisitante, setPlacarVisitante] = useState(jogo.palpite_placar_visitante ?? '');
  const [jogoId] = useState(jogo.id);
  const [apostaLiberada, setApostaLiberada] = useState(isApostaLiberada);
  const [message, setMessage] = useState();

  function handlePlacarMandante(event) {
    if (isApostaLiberada()) {
      setPlacarMandante(event.target.value);
      if (event.target.value && placarVisitante) {
        palpitar(event.target.value, placarVisitante);
      }
    } else {
      setApostaLiberada(false);
    }
  }

  function handlePlacarVisitante(event) {
    if (isApostaLiberada()) {
      setPlacarVisitante(event.target.value);
      if (placarMandante && event.target.value) {
        palpitar(placarMandante, event.target.value);
      }
    } else {
      setApostaLiberada(false);
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

  function isApostaLiberada() {
    const dataJogo = new Date(jogo.data);
    const dataLimitePalpite = new Date(dataJogo.setMinutes(dataJogo.getMinutes() - 30));
    const dataAtual = new Date();
    if (dataLimitePalpite > dataAtual)
      return true;
    else
      return false;
  }

  return (
    <Card>
      <div className="info-partida">
        <strong>{jogo.campeonato_nome}</strong>
        <small>{formatDate(jogo.data)}</small>
        <small>{jogo.local}</small>
      </div>

      <div className="times">
        <div className="time">
          <span className='nome'>{jogo.mandante_nome}</span>
          <span className='nome_reduzido'>{jogo.mandante_nome_reduzido}</span>
          <img src={jogo.mandante_path_escudo} alt={jogo.mandante_nome} />
        </div>

        {apostaLiberada && (
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

        {!apostaLiberada && (
          <div className="resultado">
            <span className="palpite">{placarMandante} x {placarVisitante}</span>
            <span className="resultado_jogo">Final: {jogo.gols_mandante} x {jogo.gols_visitante}</span>
          </div>
        )}

        <div className="time">
          <img src={jogo.visitante_path_escudo} alt={jogo.visitante_nome} />
          <span className='nome'>{jogo.visitante_nome}</span>
          <span className='nome_reduzido'>{jogo.visitante_nome_reduzido}</span>
        </div>
      </div>

      {/*(jogo.gols_mandante && jogo.gols_visitante) && (
        <div className="pontuacao">2 Pontos</div>
      )*/}

      {(message) && (
        <div className="mensagem">{message}</div>
      )}
    </Card>
  );
}
