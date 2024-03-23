import { useForm } from "react-hook-form";
import { requestBackendLogin, saveLocalStorage } from "util/requests";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

import "./styles.css";

type DadosForm = {
  username: string;
  password: string;
};

const Login = () => {
  const [temErro, setTemErro] = useState(false);
  const { register, handleSubmit, formState: {errors} } = useForm<DadosForm>();
  const { setAuthContextData } = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = (dadosForm: DadosForm) => {
    requestBackendLogin(dadosForm)
      .then((response) => {
        setTemErro(false);
        saveLocalStorage(response.data);
        setAuthContextData({
          authenticated: true
        });
        history.push("/movies");
      })
      .catch((error) => {
        setTemErro(true);
      });
  };

  return (
    <div className="card base-card login-card-container">
      <h1>LOGIN</h1>
      {temErro && (
        <div className="alert alert-danger">
          Erro de login! Verifique os dados informados...
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="mb-4 form-container">
          <input
            {...register("username",{
              required: "Campo obrigatório!"
            })}
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">{errors.username?.message}</div>
        </div>

        <div className="mb-2">
          <input
            {...register("password",{
              required: "Campo obrigatório!"
            })}
            type="password"
            className="form-control base-input"
            placeholder="Senha"
            name="password"
          />
          <div className="invalid-feedback d-block">{errors.password?.message}</div>
        </div>

        <div className="login-submit-container">
          <button type="submit" className="btn btn-warning btn-container">
            FAZER LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;