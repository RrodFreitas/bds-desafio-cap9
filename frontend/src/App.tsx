import { useState } from "react";
import "./App.css";
import { AuthContext, AuthContextData } from "./AuthContext";
import Routes from "./Routes";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [dadosAutContexto, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider
      value={{ dadosAutContexto, setAuthContextData }}
    >
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;