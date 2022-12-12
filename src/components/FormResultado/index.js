import { useState } from 'react';
import delay from '../../utils/delay';
import Input from '../Input';
import { Card } from './styles';
import formatDate from '../../utils/formatDate';

export default function FormResultado({ jogo, onSubmit }) {

  const [golsMandante, setGolsMandante] = useState(jogo.mandante.gols ?? '');
  const [golsVisitante, setGolsVisitante] = useState(jogo.visitante.gols ?? '');
  const [id] = useState(jogo.id);
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
        id, golsMandante, golsVisitante
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
        <strong>{jogo.campeonato.nome}</strong>
        <small>{formatDate(jogo.data)}</small>
        <small>{jogo.local}</small>
      </div>

      <div className="times">
        <div className="time">
          <span className='nome'>{jogo.mandante.nome}</span>
          <span className='nome_reduzido'>{jogo.mandante.nomereduzido}</span>
          <img src={jogo.mandante.pathEscudo} alt={jogo.mandante.nome} />
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
          <img src={jogo.visitante.pathEscudo} alt={jogo.visitante.nome} />
          <span className='nome'>{jogo.visitante.nome}</span>
          <span className='nome_reduzido'>{jogo.visitante.nomeReduzido}</span>
        </div>
      </div>

      {(message) && (
        <div className="mensagem">{message}</div>
      )}
    </Card>
  );
}
