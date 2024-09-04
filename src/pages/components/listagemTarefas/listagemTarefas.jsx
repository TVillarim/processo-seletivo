import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../contextAPI/useContext";
import listagemTarefas from "../listagemTarefas/listagemTarefas.scss";
import Modal from "../editTarefas/modal";
import serviceAPI from "../../../services/serviceAPI";

export default function ListagemTarefas () {
    const navigate = useNavigate();

    const {
        listaTarefas,
        setListaTarefas,
        tarefasCadastradas,
        setTarefasCadastradas,
        showModal,
        setShowModal,
        usuarioLogado,
        setEditarTarefa
    } = React.useContext(userContext);

    useEffect(() => {
        if(listaTarefas.length === 0) {
            setTarefasCadastradas("Nenhuma tarefa cadastrada");
        } else {
            setTarefasCadastradas("")
        }
    }, [listaTarefas]);

    const criarTarefa = () => {
        navigate("/cadastroTarefas");
    };

    useEffect( () => {
        async function fetchData() {

            const response = await serviceAPI.get("api/tarefas");
            setListaTarefas(response.data)
        }
        fetchData()
    }, [])

    const voltarParaHome = () => {
        navigate("/home");
    };

    const verificaDonoTarefa = (tarefas) => {
        const membroLogado = JSON.parse(sessionStorage.getItem('membro'));
        if(tarefas.membro.id == membroLogado.id) {
            return(
                <div style={{color: "green", fontWeight: "900"}}>Minha tarefa</div>
            )
        }
    };

    const handleEditTarefa = (tarefas) => {
        console.log(tarefas)
        setEditarTarefa(tarefas)
        setShowModal(true)
    }

    const removerMembro = async () => {
        const membro = JSON.parse(sessionStorage.getItem('membro'));
        await serviceAPI.delete(`api/membros/${membro.id}/delete`);
        sessionStorage.removeItem('membro')
        navigate("/")
    }

    return(
        <>
            <div className="tarefas-header-container">
                <header className="header-tarefas">
                    <div className="header-box">
                        <h1>
                            Listagem de tarefas |
                        </h1>
                        <button onClick={() => removerMembro()} className="apagar-usuario-button">Apagar Usuário</button>
                        <Modal show={showModal}/>
                        <div className="mini-text">
                            <a onClick={() => voltarParaHome()}>voltar para Home</a>
                            <a onClick={() => criarTarefa()}>criar nova tarefa</a>
                        </div>
                    </div>
                </header>
            </div>

            <div className="section-listaTarefas-container">

                    <h1>{tarefasCadastradas}</h1>

                <section className="section-listaTarefas">
                    <div>
                        {listaTarefas.map((tarefas, index) => {
                            return(
                                <div onClick={() => handleEditTarefa(tarefas)} className="lista" key={index} id={index}>
                                    {verificaDonoTarefa(tarefas)}
                                    <h3 className="title">{tarefas.nome}</h3>
                                    <p><strong className="prioridade">Nível de prioridade:</strong>{tarefas.prioridade}</p>
                                    <p><strong className="status">Status:</strong>{tarefas.finalizada == true ? "finalizado" : "não finalizado"}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </>
    )
}