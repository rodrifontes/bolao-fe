import { useCallback, useEffect, useState } from 'react';

import { Body, Card, ErrorContainer } from './styles';

import sad from '../../assets/images/sad.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import formatDate from '../../utils/formatDate';

import JogoService from '../../services/JogoService';

import toast from '../../utils/toast';
import Header from '../../components/Header';

export default function Palpite() {

  const [jogos, setJogos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadJogos = useCallback(async () => {
    try {
      setIsLoading(true);

      const jogosList = await JogoService.listJogos();
      const newList = jogosList.map((jogo) => {
        return {
          ...jogo,
          data: formatDate(jogo.data),
        }
      });

      setHasError(false);
      setJogos(newList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJogos();
  }, [loadJogos]);

  function handleTryAgain() {
    loadJogos();
  }

  return (
    <>
      <Header />

      <Body>
        <Loader isLoading={isLoading} />

        {
          hasError && (
            <ErrorContainer>
              <img src={sad} alt="Sad" />

              <div className="details">
                <strong>Ocorreu um erro ao obter os seus jogos!</strong>

                <Button type="Button" onClick={handleTryAgain}>
                  Tentar novamente
                </Button>
              </div>
            </ErrorContainer>
          )
        }

        {jogos.map((jogo) => (
          <Card key={jogo.id}>
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
              <div className="placar"><Input />x<Input /></div>
              <div className="time">
                <img src={jogo.visitante_path_escudo} alt={jogo.visitante_nome} />
                <span>{jogo.visitante_nome}</span>
              </div>
            </div>
          </Card>
        ))}

        {/*
      <Card>
        <div className="info-partida">
          <strong>Campeonato Brasileiro 2022</strong>
          <small>Sex, 14 de Jan às 21:00</small>
          <small>Arena da Baixada</small>
        </div>

        <div className="times">
          <div className="time">
            <span>Avaí</span>
            <img src={avai} alt="Avaí" />
          </div>
          <div className="resultado">
            <span className="resultado_jogo">2 x 1</span>
            <span className="palpite">(1 x 1)</span>
          </div>
          <div className="time">
            <img src={botafogo} alt="Botafogo" />
            <span>Botafogo</span>
          </div>
        </div>

        <div className="pontuacao">
          0 Pontos
        </div>
      </Card>
      */}
      </Body>
    </>
  );
}
