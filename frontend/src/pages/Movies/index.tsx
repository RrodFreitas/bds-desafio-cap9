import { Movie } from "assets/types/movie";
import { Page } from "assets/types/spring";
import { AxiosRequestConfig } from "axios";
import { MovieFilterData } from "components/Filter";
import { useCallback } from "react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { requestBackend } from "util/requests";
import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterData : MovieFilterData;
}

const Movies = () => {
  const [page, setPage] = useState<Page<Movie>>();
  const [controlComponentsData] = useState<ControlComponentsData>(
    {
    activePage: 0,
    filterData: { genre: null}
  });
  
  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: "/movies",
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="container my-1 movies-container">
      <div className="row ">
        {page?.content.map((item) => (
          <div key={item.id} className="col-sm-6 col-lg-3">
            <Link to={"/moviedetail/" + item.id.toString()}>
              <div>
                    <h4>{item.title}</h4>
              </div>
                </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
