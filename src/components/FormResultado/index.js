import { useState } from 'react';
import delay from '../../utils/delay';
import Input from '../Input';
import { Card } from './styles';
import formatDate from '../../utils/formatDate';

export default function FormResultado({ jogo, onSubmit }) {

  const [golsMandante, setGolsMandante] = useState(jogo.gols_mandante ?? '');
  const [golsVisitante, setGolsVisitante] = useState(jogo.gols_visitante ?? '');
  const [jogoId] = useState(jogo.id);
  const [message, setMessage] = useState();

  function handlesGolsMandate(event) {
    setGolsMandante(event.target.value);
    if (event.target.value && golsVisitante) {
      handleResultado(event.target.value, golsVisitante);
    }
  }

  function handleGolsVisitante(event) {
    setGolsVisitante(event.target.value);
    if (golsMandante && event.target.value) {
      handleResultado(golsMandante, event.target.value);
    }
  }

  async function handleResultado(golsMandante, golsVisitante) {
    try {
      setMessage('Salvando...');

      await onSubmit({
        jogoId, golsMandante, golsVisitante
      });

      setMessage('Resultado salvo!');
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
        <small>{formatDate(jogo.data)}</small>
        <small>{jogo.local}</small>
      </div>

      <div className="times">
        <div className="time">
          <span className='nome'>{jogo.mandante_nome}</span>
          <span className='nome_reduzido'>{jogo.mandante_nome_reduzido}</span>
          <img src={jogo.mandante_path_escudo} alt={jogo.mandante_nome} />
        </div>

        <div className="placar">
          <Input
            value={golsMandante}
            onChange={handlesGolsMandate}
          />
          x
          <Input
            value={golsVisitante}
            onChange={handleGolsVisitante}
          />
        </div>

        <div className="time">
          <img src={jogo.visitante_path_escudo} alt={jogo.visitante_nome} />
          <span className='nome'>{jogo.visitante_nome}</span>
          <span className='nome_reduzido'>{jogo.visitante_nome_reduzido}</span>
        </div>
      </div>

      {(message) && (
        <div className="mensagem">{message}</div>
      )}
    </Card>
  );
}
