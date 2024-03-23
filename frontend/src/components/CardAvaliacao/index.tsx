import { useForm } from "react-hook-form";
import { requestBackendReview } from "util/requests";
import "./styles.css";

type Props = {
  movieId: string;
  onNewReview: Function;
}

type DadosForm = {
  text: string;
  movieId: string;
}

const Cardavaliacao = ({ movieId, onNewReview } : Props) => {
    
const { register, handleSubmit, formState: {errors}, setValue } = useForm<DadosForm>();

const onSubmit = (dadosForm: DadosForm) => {
    dadosForm.movieId=movieId;
    requestBackendReview(dadosForm).then(() => {
      setValue("text", "");
      onNewReview(); 
    });    
};

  return (
    <div className="avaliacao-card-container">
      <form onSubmit={handleSubmit(onSubmit)} className="input-container">
          <input
            {...register("text",{
              required: "Campo obrigatório!"
            })}
            type="text"
            className="mb-3 form-control avaliacao-input-container"
            placeholder="Deixe aqui sua avaliação"
            name="text"
          />
          <div className="invalid-feedback d-block">{errors.text?.message}</div>
        <div className="avaliacao-submit-container">
            <button type="submit" className="btn btn-warning avaliacao-custom-btn-container">SALVAR AVALIAÇÃO</button>
        </div>
      </form>
    </div>
  );
};
export default Cardavaliacao;