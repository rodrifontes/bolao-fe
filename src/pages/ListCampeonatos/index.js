import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo, useCallback } from 'react';

import {
  Card,
  Container,
  InputSearchContainer,
  HeaderForm,
  ListHeader,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import CampeonatoService from '../../services/CampeonatoService';

import toast from '../../utils/toast';

export default function ListCampeonatos() {
  const [campeonatos, setCampeonatos] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [campeonatoBeingDeleted, setCampeonatoBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredCampeoantos = useMemo(() => {
    return campeonatos.filter((campeonato) => (
      campeonato.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [campeonatos, searchTerm])

  const loadCampeonatos = useCallback(async () => {
    try {
      setIsLoading(true);

      const campeonatosList = await CampeonatoService.listCampeonatos(orderBy);

      setHasError(false);
      setCampeonatos(campeonatosList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadCampeonatos();
  }, [loadCampeonatos])

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadCampeonatos();
  }

  function handleDeleteCampeonato(campeonato) {
    setCampeonatoBeingDeleted(campeonato);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setCampeonatoBeingDeleted(null);
  }

  async function handleConfirmDeleteCampeonato() {
    try {
      setIsLoadingDelete(true);

      await CampeonatoService.deleteCampeonato(campeonatoBeingDeleted.id);

      setCampeonatos(prevState => prevState.filter(
        (campeonato) => campeonato.id !== campeonatoBeingDeleted.id
      ));
      handleCloseDeleteModal();

      toast({
        type: 'sucess',
        text: 'Campeonato deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o campeonato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <>
      <Header />

      <Container>
        <Loader isLoading={isLoading} />

        <Modal
          danger
          isLoading={isLoadingDelete}
          visible={isDeleteModalVisible}
          title={`Tem certeza que deseja remover o campeonato "${campeonatoBeingDeleted?.nome}"?`}
          confirmLabel="Deletar"
          onCancel={handleCloseDeleteModal}
          onConfirm={handleConfirmDeleteCampeonato}
        >
          <p>Esta ação não poderá ser desfeita!</p>
        </Modal>

        <Link to="/administracao" className="voltar">
          <img src={arrow} alt="Back" />
          <span>Voltar</span>
        </Link>

        {
          campeonatos.length > 0 && (
            <InputSearchContainer>
              <input
                value={searchTerm}
                type="text"
                placeholder="Pesquisar campeonato..."
                onChange={handleChangeSearchTerm}
              />
            </InputSearchContainer>
          )
        }

        <HeaderForm
          justifyContent={
            hasError
              ? 'flex-end'
              : (
                campeonatos.length > 0
                  ? 'space-between'
                  : 'center'
              )
          }
        >
          {(!hasError && campeonatos.length > 0) && (
            <strong>
              {filteredCampeoantos.length}
              {filteredCampeoantos.length === 1 ? ' campeonato' : ' campeonatos'}
            </strong>
          )}
          <Link to="new">Novo campeonato</Link>
        </HeaderForm>

        {
          hasError && (
            <ErrorContainer>
              <img src={sad} alt="Sad" />

              <div className="details">
                <strong>Ocorreu um erro ao obter os seus campeonatos!</strong>

                <Button type="Button" onClick={handleTryAgain}>
                  Tentar novamente
                </Button>
              </div>
            </ErrorContainer>
          )
        }

        {
          !hasError && (
            <>

              {(campeonatos.length < 1 && !isLoading) && (
                <EmptyListContainer>
                  <img src={emptyBox} alt="Empty box" />

                  <p>
                    Você ainda não tem nenhum campeonato cadastrado!
                    Clique no botão <strong>"Novo campeonato"</strong> à cima
                    para cadastrar o seu primeiro!
                  </p>
                </EmptyListContainer>
              )}

              {(campeonatos.length > 0 && filteredCampeoantos.length < 1) &&
                <SearchNotFoundContainer>
                  <img src={magnifierQuestion} alt="Magnifier Question" />

                  <span>
                    Nenhum resultado foi encontrado para <strong>"{searchTerm}"</strong>
                  </span>
                </SearchNotFoundContainer>
              }

              {filteredCampeoantos.length > 0 && (
                <ListHeader orderBy={orderBy}>
                  <button type="button" onClick={handleToggleOrderBy}>
                    <span>Nome</span>
                    <img src={arrow} alt="Arrow" />
                  </button>
                </ListHeader>
              )}

              {filteredCampeoantos.map((campeonato) => (
                <Card key={campeonato.id}>
                  <div className="info">
                    <span>{campeonato.nome}</span>
                  </div>
                  <div className="actions">
                    <Link to={`/campeonatos/edit/${campeonato.id}`}>
                      <img src={edit} alt="Edit" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteCampeonato(campeonato)}
                    >
                      <img src={trash} alt="Delete" />
                    </button>
                  </div>
                </Card>
              ))}
            </>
          )
        }
      </Container>
    </>
  );
}
