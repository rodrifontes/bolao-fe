import { useCallback, useEffect, useState } from 'react';

import { Container, ErrorContainer, HeaderForm } from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import sad from '../../assets/images/sad.svg';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import FormResultado from '../../components/FormResultado';

import JogoService from '../../services/JogoService';

import Header from '../../components/Header';
import { Link } from 'react-router-dom';

export default function ListJogos() {

  const [jogos, setJogos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadJogos = useCallback(async () => {
    try {
      setIsLoading(true);

      const jogosList = await JogoService.listJogos('asc');

      const newList = jogosList.map((jogo) => {
        return jogo;
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

  async function handleSubmitResultado(formData) {
    const resultado = {
      gols_mandante: formData.golsMandante,
      gols_visitante: formData.golsVisitante,
    };

    await JogoService.updateResultado(formData.jogoId, resultado);
  }

  return (
    <>
      <Header />

      <Container>
        <Loader isLoading={isLoading} />

        <Link to="/administracao" className="voltar">
          <img src={arrow} alt="Back" />
          <span>Voltar</span>
        </Link>

        <HeaderForm>
          <Link to="new">Novo jogo</Link>
        </HeaderForm>

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
          <FormResultado
            key={jogo.id}
            jogo={jogo}
            onSubmit={handleSubmitResultado}
          />
        ))}

      </Container>
    </>
  );
}
