import "./styles.css";
import {NavLink, useHistory} from "react-router-dom";
import {getTokenData, isAuthenticated, removeDataAutenticate} from "util/requests";
import {useForm} from "react-hook-form";
import {useContext, useEffect} from "react";
import { AuthContext } from "../../AuthContext";

const Navbar = () => {

    const {dadosAutContexto, setDadosAutContexto} = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated()) {
            setDadosAutContexto({
                authenticated: true,
                dataToken: getTokenData(),
            });
        } else {
            setDadosAutContexto({
                authenticated: false,
            });
        }
    }, [setDadosAutContexto]);

    const {handleSubmit} = useForm();
    const history = useHistory();

    const onSubmit = () => {
        removeDataAutenticate();
        setDadosAutContexto({
            authenticated: false,
        });
        history.replace("/");
    };
    return (
        <>
            <nav className="navbar-container navbar-expand-sm navbar-expand-lg navbar-light">
                <div
                    className="custom-navbar-container"
                    id="navbarSupportedContent">
                    <NavLink to="/" className="navbar-title-container">
                        MovieFlix - Bootcamp 3.0 Dev Superior
                    </NavLink>
                    {dadosAutContexto.authenticated && (
                        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit(onSubmit)}>
                            <button
                                className="btn-container btn-outline-dark btn-sm my-2 my-sm-0"
                            >
                                SAIR
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;