import { Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import RotaPrivada from "components/PrivateRoute";
import Movies from "./pages/Movies";
import history from "util/history";
import Home from "./pages/Home";
import Moviedetail from "pages/MovieDetail";


const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <RotaPrivada path="/movies">
          <Movies />
        </RotaPrivada>
        <RotaPrivada path="/moviedetail/:movieId">
          <Moviedetail />
        </RotaPrivada>
      </Switch>
    </Router>
  );
};

export default Routes;