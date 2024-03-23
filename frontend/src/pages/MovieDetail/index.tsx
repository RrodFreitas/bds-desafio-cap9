import { AxiosRequestConfig } from "axios";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avaliacoes from "../../components/Avaliacoes";
import Cardavaliacao from "components/CardAvaliacao";
import { requestBackend, hasAnyRoles } from "util/requests";
import "./styles.css";
import { Avaliacao } from "assets/types/Avaliacao";
import { Movie } from "assets/types/movie";

type UrlParams = {
  movieId: string;
};

type ListaAvaliacoes = Avaliacao[];

const Moviedetail = () => {
  const { movieId } = useParams<UrlParams>();
  const [movie, setMovie] = useState<Movie>();
  const [listaAvaliacoes, setListaAvaliacoes] = useState<ListaAvaliacoes>();

  const getFilmData = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  const getAvalic = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setListaAvaliacoes(response.data);
    });
  }, [movieId]);

  useEffect(() => {
    getFilmData();
    getAvalic();
  }, [getAvalic, getFilmData]);

  return (
    <>
      <div className="movie-detail-card-description">
        <h2>{movie?.title}</h2>
      </div>

      {hasAnyRoles(["ROLE_MEMBER"]) && (
        <div className="avaliacao-container">
          <Cardavaliacao movieId={movieId} onNewReview={getAvalic} />
        </div>
      )}

      <div className="card base-card lista-avaliacoes-container">
        {listaAvaliacoes?.length !== 0 ? (
          listaAvaliacoes?.map((aval) => (
            <Avaliacoes key={aval.id} avaliacao={aval} />
          ))
        ) : (
          <h4>Não existem avaliações</h4>
        )}
      </div>
    </>
  );
};

export default Moviedetail;
