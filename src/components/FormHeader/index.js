import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from './styles';

import arrow from '../../assets/images/icons/arrow.svg';

export default function FormHeader({ title }) {
  const navigate = useNavigate();

  return (
    <Container>
      <Link
        to={'..'}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        <img src={arrow} alt="Back" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
