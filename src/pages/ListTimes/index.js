import { Link } from 'react-router-dom';
import { useState } from 'react';

import {
  Card,
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import toast from '../../utils/toast';

import america_mg from '../../assets/images/escudos/america-mg.svg';
import atletico_pr from '../../assets/images/escudos/atletico-pr.svg';
import atletico_go from '../../assets/images/escudos/atletico-go.svg';

export default function ListTimes() {
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //const [hasError, setHasError] = useState(false);
  //const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  //const [contactBeingDeleted, setcontactBeingDeleted] = useState(null);
  //const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar time..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header
        justifyContent='space-between'
      >
        <strong>
          3 times
        </strong>
        <Link to="/new">Novo Time</Link>
      </Header>

      <ListHeader orderBy={orderBy}>
        <button type="button" onClick={handleToggleOrderBy}>
          <span>Nome</span>
          <img src={arrow} alt="Arrow" />
        </button>
      </ListHeader>

      <Card>
        <div className="time">
          <img src={america_mg} alt="América MG" />
          <span>América MG</span>
        </div>
        <div className="actions">
          <Link to={`/edit/1`}>
            <img src={edit} alt="Edit" />
          </Link>
          <button
            type="button"
            onClick={() => alert('oi')}
          >
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>

      <Card>
        <div className="time">
          <img src={atletico_pr} alt="Atlético PR" />
          <span>Atlético PR</span>
        </div>
        <div className="actions">
          <Link to={`/edit/1`}>
            <img src={edit} alt="Edit" />
          </Link>
          <button
            type="button"
            onClick={() => alert('oi')}
          >
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>

      <Card>
        <div className="time">
          <img src={atletico_go} alt="Atlético GO" />
          <span>Atlético GO</span>
        </div>
        <div className="actions">
          <Link to={`/edit/1`}>
            <img src={edit} alt="Edit" />
          </Link>
          <button
            type="button"
            onClick={() => alert('oi')}
          >
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>
    </Container>
  );
}
