import { useCallback, useEffect, useState } from 'react';

import { Body, ErrorContainer } from './styles';

import sad from '../../assets/images/sad.svg';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import formatDate from '../../utils/formatDate';
import Placar from '../../components/Placar';

import PalpiteService from '../../services/PalpiteService';

import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';

export default function Palpite() {

  const [jogos, setJogos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { user } = useAuth();

  console.log('Palpite;')

  const loadJogos = useCallback(async () => {
    try {
      setIsLoading(true);

      if(!user.id) return;
      const jogosList = await PalpiteService.listJogos('asc', user.id);
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
  }, [user.id]);

  useEffect(() => {
    loadJogos();
  }, [loadJogos]);

  function handleTryAgain() {
    loadJogos();
  }

  async function handleSubmitPalpite(formData) {
    const palpite = {
      usuario_id: user.id,
      jogo_id: formData.jogoId,
      placar_mandante: formData.placarMandante,
      placar_visitante: formData.placarVisitante,
    };

    await PalpiteService.createPalpite(palpite);
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
          <Placar
            key={jogo.id}
            jogo={jogo}
            onSubmit={handleSubmitPalpite}
          />
        ))}

      </Body>
    </>
  );
}
