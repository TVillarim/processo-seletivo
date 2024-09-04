import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginStyles from "../login/login.scss";
import serviceAPI from "../../../services/serviceAPI";
import { userContext } from "../contextAPI/useContext";

export default function Login () {

    let navigate = useNavigate();

    const {

        setUsuarioLogado
    } = React.useContext(userContext)

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    
    const cadastrarMembro = () => {
        navigate("/cadastroMembro")
    }

    const logar = async () => {
        if(!validarUsuario()) {
            return;
        } else {
            const loginPayload = {
                email: email,
                senha: senha
            }

            setEmail("");
            setSenha("");
            setError("");
            sessionStorage.removeItem('membro');
            navigate("/home");

            const response = await serviceAPI.post("api/membros/login", loginPayload);
            setUsuarioLogado(response.data)
            sessionStorage.setItem('membro', JSON.stringify(response.data));
            console.log(response)
        }
    }
    


    const validarUsuario = () => {
        if(email === undefined || email < 1 ||
            senha === undefined || senha < 1) {
            setError("Necessário preencher este campo!")
            return false;
        }

        return true;     
    }



    return(
        <>
            <div className="header-container">
                <header className="header">
                    <h1>Desafio Viitra</h1>
                    <h3>- To-do-list -</h3>
                </header>
            </div>

            <div className="section-container">
                <section className="section">
                    <div className="section-login-container">
                        <div>
                            <h2>Olá, seja bem vindo!</h2>
                        </div>
                        <div className="input-section">
                            <span>{error}</span>
                                <input 
                                    type="email" 
                                    minLength={5} 
                                    placeholder="Digite o seu email:" 
                                    value={email} 
                                    onChange={event => setEmail(event.target.value)}
                                />
                            <span>{error}</span>    
                                <input 
                                    type="password" 
                                    placeholder="Digite sua senha:" 
                                    value={senha} 
                                    onChange={event => setSenha(event.target.value)}
                                />
                        </div>
                        <div className="buttons">
                            <button onClick={() => cadastrarMembro()}>Cadastre-se</button>
                            <button onClick={() => logar()}>Entrar</button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}