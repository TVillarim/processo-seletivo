import './Global.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/components/home/home";
import Login from './pages/components/login/login';
import CadastroMembro from "./pages/components/cadastrarMembro/cadastrarMembro";
import ListagemTarefas from "./pages/components/listagemTarefas/listagemTarefas";
import CadastroTarefas from "./pages/components/cadastroTarefas/cadastroTarefas";
import ErrorPage from './pages/components/errorPage/errorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Login/>}/>
        <Route path = "/cadastroMembro" element={<CadastroMembro/>}/>
        <Route path = "/cadastroTarefas" element={<CadastroTarefas/>}/>
        <Route path = "/listagemTarefas" element={<ListagemTarefas/>}/>
        <Route path = "/home" element={<Home/>}/>
        <Route path = "*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
