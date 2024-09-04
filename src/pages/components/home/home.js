import React from "react";
import { useNavigate } from "react-router-dom";
import homeStyle from "../home/home.scss";

export default function Home () {

    const navigate = useNavigate()

    const RedirecionarParaTelaCadastro = () => {
        navigate("/cadastroMembro");
    }

    const RedirecionarParaTelaDeListagem = () => {
        navigate("/listagemTarefas");
    }

    return(
        <>
            <div className="header-container">
                <header className="header">
                    <div>
                        <h1>Home page</h1>
                    </div>
                </header>
            </div>

            <div className="section-home-container">
                <section className="section-container">
                    <h1>
                        Seja bem vindo, o que você deseja ?
                    </h1>
                <div className="section-buttons">
                    <button onClick={() => RedirecionarParaTelaDeListagem()}>Ir para listagem de tarefas</button>
                    <button onClick={() => RedirecionarParaTelaCadastro()}>Ir para a tela de cadastro</button>
                </div>
                    
                </section>
            </div>
        </>
    )
}