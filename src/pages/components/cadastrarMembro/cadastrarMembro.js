import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginStyles from "../cadastrarMembro/cadastrarMembro.scss";
import serviceAPI from "../../../services/serviceAPI";

export default function Login () {

    let navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const voltarParaLogin = () => {
        navigate("/")
    }


    const cadastrar = async () => {
        if(!validarUsuario()) {
            return;
        } else {
            const cadastrado = {
                nome: name,
                email: email,
                senha: senha
            }

            const response = await serviceAPI.post("api/membros/criar", cadastrado) 
            console.log(response)

            setName("");
            setEmail("");
            setSenha("");
            setError("");
            console.log(cadastrado)
            navigate("/")
        }
    }

    const validarUsuario = () => {
        if(name === undefined || name < 1 ||
            senha === undefined || senha < 1 ||
            email === undefined || email < 1 ) {
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
                    <h3>- tela de cadastro -</h3>
                </header>
            </div>

            <div className="section-container">
                <section className="section">
                    <div className="section-signin-container">
                        <div>
                            <h2>Cadastre-se aqui!</h2>
                        </div>
                        <div className="input-section">
                            <span>{error}</span>
                                <input 
                                    type="name" 
                                    minLength={5} 
                                    placeholder="Digite o seu nome de usuário:" 
                                    value={name} 
                                    onChange={event => setName(event.target.value)}
                                />

                            <span>{error}</span>    
                                <input 
                                    type="email" 
                                    placeholder="Digite seu email:" 
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
                            <button onClick={() => voltarParaLogin()}>Voltar</button>
                            <button onClick={() => cadastrar()}>Cadastrar</button>
                        </div>
                        
                    </div>
                </section>
            </div>
        </>
    )
}