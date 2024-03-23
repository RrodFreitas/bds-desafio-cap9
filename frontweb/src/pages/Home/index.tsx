import { ReactComponent as ImgTelaLogin } from 'assets/images/InitialScreen.svg';
import './styles.css';

const Home = () => {
  return (
    <div className="geral-container container-fluid">
      <div className="left-container">
        <h1>Avaliação de filmes</h1>
        <p>Diga o que achou do seu filme favorito</p>
        <div className="img-container">
          <ImgTelaLogin />
        </div>
      </div>
      <div className="right-container"></div>
    </div>
  );
};

export default Home;
