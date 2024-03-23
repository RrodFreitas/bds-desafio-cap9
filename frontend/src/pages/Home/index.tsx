import { ReactComponent as ImgPrincipal } from "assets/images/InitialScreen.svg";
import Cardlogin from "components/CardLogin";
import { isAuthenticated } from "util/requests";
import "./styles.css";
import history from 'util/history';

const Home = () => {
  return (
    <div className="geral-container container-fluid">
      <div className="left-container">
        <h1>Avaliação de filmes</h1>
        <p>Diga o que achou do seu filme favorito</p>
        <div className="img-container">
          <ImgPrincipal />
        </div>
      </div>
      {!isAuthenticated() ? (
      <div className="right-container">
        <Cardlogin />
      </div>) : (history.push("/movies"))
      }
    </div>
  );
};

export default Home;