import { useState } from 'react';
import delay from '../../utils/delay';
import Input from '../Input';
import { Card } from './styles';
import formatDate from '../../utils/formatDate';

export default function Placar({ jogo, onSubmit }) {

  const [placarMandante, setPlacarMandante] = useState(jogo.mandante.palpite ?? '');
  const [placarVisitante, setPlacarVisitante] = useState(jogo.visitante.palpite ?? '');
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
        <strong>{jogo.campeonato.nome}</strong>
        <small>{formatDate(jogo.data)}</small>
        <small>{jogo.local}</small>
      </div>

      <div className="times">
        <div className="time">
          <span className='nome'>{jogo.mandante.nome}</span>
          <span className='nome_reduzido'>{jogo.mandante.nomeReduzido}</span>
          <img src={jogo.mandante.pathEscudo} alt={jogo.mandante.nome} />
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
            <span className="resultado_jogo">Final: {jogo.mandante.gols} x {jogo.visitante.gols}</span>
          </div>
        )}

        <div className="time">
          <img src={jogo.visitante.pathEscudo} alt={jogo.visitante.nome} />
          <span className='nome'>{jogo.visitante.nome}</span>
          <span className='nome_reduzido'>{jogo.visitante.nomeReduzido}</span>
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
