import "./styles.css";
import { ReactComponent as ImgStar } from "assets/images/Star.svg";
import { Avaliacao } from "assets/types/Avaliacao";

type Props = {
  avaliacao: Avaliacao;
}

const Avaliacoes = ({ avaliacao } : Props) => {
  return (
    <>
      <div className="avaliador-container">
        <ImgStar />
        <p>{avaliacao.user.name}</p>
      </div>
      <div className="card-aval-container">
        <div className="card base-card card-avaliacao">
          <p>{avaliacao.text}</p>
        </div>
      </div>
    </>
  );
};
export default Avaliacoes;
