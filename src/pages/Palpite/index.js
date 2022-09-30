import { Container, Card } from './styles';

import america_mg from '../../assets/images/escudos/america-mg.svg';
import atletico_pr from '../../assets/images/escudos/atletico-pr.svg';
import atletico_go from '../../assets/images/escudos/atletico-go.svg';
import atletico_mg from '../../assets/images/escudos/atletico-mg.svg';
import avai from '../../assets/images/escudos/avai.svg';
import botafogo from '../../assets/images/escudos/botafogo.svg';

import Input from '../../components/Input';

export default function Palpite() {
  return (
    <Container>
      <Card>
        <div className="info-partida">
          <strong>Campeonato Brasileiro 2022</strong>
          <small>Sex, 14 de Jan às 21:00</small>
          <small>Arena da Baixada</small>
        </div>

        <div className="times">
          <div className="time">
            <span>América MG</span>
            <img src={america_mg} alt="América MG" />
          </div>
          <div className="placar"><Input />x<Input /></div>
          <div className="time">
            <img src={atletico_pr} alt="Atlético PR" />
            <span>Atlético PR</span>
          </div>
        </div>
      </Card>

      <Card>
        <div className="info-partida">
          <strong>Campeonato Brasileiro 2022</strong>
          <small>Sex, 14 de Jan às 21:00</small>
          <small>Arena da Baixada</small>
        </div>

        <div className="times">
          <div className="time">
            <span>Atlético GO</span>
            <img src={atletico_go} alt="Atlético GO" />
          </div>
          <div className="placar"><Input />x<Input /></div>
          <div className="time">
            <img src={atletico_mg} alt="Atlético MG" />
            <span>Atlético MG</span>
          </div>
        </div>
      </Card>

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
    </Container>
  );
}
