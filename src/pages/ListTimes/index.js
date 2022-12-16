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

import TimeService from '../../services/TimeService';

import toast from '../../utils/toast';

export default function ListTimes() {
  const [times, setTimes] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [timeBeingDeleted, setTimeBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredTimes = useMemo(() => {
    return times.filter((time) => (
      time.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [times, searchTerm])

  const loadTimes = useCallback(async () => {
    try {
      setIsLoading(true);

      const timesList = await TimeService.listTimes(orderBy);

      setHasError(false);
      setTimes(timesList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadTimes();
  }, [loadTimes]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadTimes();
  }

  function handleDeleteTime(time) {
    setTimeBeingDeleted(time);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteTime() {
    try {
      setIsLoadingDelete(true);

      await TimeService.deleteTime(timeBeingDeleted.id);

      setTimes(prevState => prevState.filter(
        (time) => time.id !== timeBeingDeleted.id
      ));
      handleCloseDeleteModal();

      toast({
        type: 'sucess',
        text: 'Time deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o time!',
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
          title={`Tem certeza que deseja remover o time "${timeBeingDeleted?.nome}"?`}
          confirmLabel="Deletar"
          onCancel={handleCloseDeleteModal}
          onConfirm={handleConfirmDeleteTime}
        >
          <p>Esta ação não poderá ser desfeita!</p>
        </Modal>

        <Link to="/administracao" className="voltar">
          <img src={arrow} alt="Back" />
          <span>Voltar</span>
        </Link>

        {
          times.length > 0 && (
            <InputSearchContainer>
              <input
                value={searchTerm}
                type="text"
                placeholder="Pesquisar time..."
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
                times.length > 0
                  ? 'space-between'
                  : 'center'
              )
          }
        >
          {(!hasError && times.length > 0) && (
            <strong>
              {filteredTimes.length}
              {filteredTimes.length === 1 ? ' time' : ' times'}
            </strong>
          )}
          <Link to="new">Novo time</Link>
        </HeaderForm>

        {
          hasError && (
            <ErrorContainer>
              <img src={sad} alt="Sad" />

              <div className="details">
                <strong>Ocorreu um erro ao obter os seus times!</strong>

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

              {(times.length < 1 && !isLoading) && (
                <EmptyListContainer>
                  <img src={emptyBox} alt="Empty box" />

                  <p>
                    Você ainda não tem nenhum time cadastrado!
                    Clique no botão <strong>"Novo time"</strong> à cima
                    para cadastrar o seu primeiro!
                  </p>
                </EmptyListContainer>
              )}

              {(times.length > 0 && filteredTimes.length < 1) &&
                <SearchNotFoundContainer>
                  <img src={magnifierQuestion} alt="Magnifier Question" />

                  <span>
                    Nenhum resultado foi encontrado para <strong>"{searchTerm}"</strong>
                  </span>
                </SearchNotFoundContainer>
              }

              {filteredTimes.length > 0 && (
                <ListHeader orderBy={orderBy}>
                  <button type="button" onClick={handleToggleOrderBy}>
                    <span>Nome</span>
                    <img src={arrow} alt="Arrow" />
                  </button>
                </ListHeader>
              )}

              {filteredTimes.map((time) => (
                <Card key={time.id}>
                  <div className="info">
                    <img src={time.pathEscudo} alt={time.nome} />
                    <span>{time.nome}</span>
                  </div>
                  <div className="actions">
                    <Link to={`/times/edit/${time.id}`}>
                      <img src={edit} alt="Edit" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteTime(time)}
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
