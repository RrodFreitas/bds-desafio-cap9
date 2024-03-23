import "./styles.css";
import {NavLink, useHistory} from "react-router-dom";
import {isAuthenticated, getTokenData, removeDataAutenticate} from "util/requests";
import {useForm} from "react-hook-form";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../AuthContext";

const Navbar = () => {

    const {dadosAutContexto, setAuthContextData} = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated()) {
            setAuthContextData({
                authenticated: true,
                dataToken: getTokenData(),
            });
        } else {
            setAuthContextData({
                authenticated: false,
            });
        }
    }, [setAuthContextData]);

    const {handleSubmit} = useForm();
    const history = useHistory();

    const onSubmit = () => {
        removeDataAutenticate();
        setAuthContextData({
            authenticated: false,
        });
        history.replace("/");
    };
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-expand-lg navbar-light">
                <div
                    className="custom-navbar"
                    id="navbarSupportedContent">
                    <NavLink to="/" className="navbar-brand">
                        MovieFlix - Bootcamp 3.0 Dev Superior
                    </NavLink>
                    {dadosAutContexto.authenticated && (
                        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit(onSubmit)}>
                            <button
                                className="btn btn-outline-dark btn-sm my-2 my-sm-0"
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