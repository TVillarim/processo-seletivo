import React, { useEffect, useState } from "react";
import { userContext } from "../contextAPI/useContext";
import EditTarefas from "../editTarefas/modal.scss"
import serviceAPI from "../../../services/serviceAPI";

const Modal = (props) => {

    const {
        setShowModal,
        editarTarefa,
        usuarioLogado,
        setUsuarioLogado,
        setEditarTarefa
    } = React.useContext(userContext);

    useEffect(() => {

        setUsuarioLogado(JSON.parse(sessionStorage.getItem('membro')));

    }, [])

    const authTarefa = async (event) => {
            const editarTarefaPayload = {
                nome: editarTarefa.nome,
                descricao: editarTarefa.descricao,
                prioridade: editarTarefa.prioridade,
                dataTermino: new Date(editarTarefa.dataTermino).getTime(),
                finalizada: editarTarefa.finalizada 
            };

            console.log(editarTarefaPayload)

            const membro = JSON.parse(sessionStorage.getItem('membro'))
            await serviceAPI.put(`api/tarefas/${membro.id}/membro/${editarTarefa.id}/editar`, editarTarefaPayload);
            window.location.reload()
    };

    const handleEditInput = (target) => {
        const {value, name} = target;
        const tarefaEditada = {
            ...editarTarefa, 
            [name]: value
        }
        setEditarTarefa(tarefaEditada)
    }   

    if(!props.show) {
        return null
    }

    const deletarTarefa = async () => {
        await serviceAPI.delete(`api/tarefas/${editarTarefa.id}/deletar`);
        window.location.reload();
    }

    return(
        <div className="modal">
            <div className="modal-content">
                <section className="modal-section-container">
                    <div>
                        <form >
                            <input
                                name="nome"
                                className="title-input" 
                                type="text" minLength={5} 
                                maxLength={50} 
                                placeholder="Digite o título da tarefa" 
                                value={editarTarefa.nome} 
                                onChange={event => handleEditInput(event.target)}
                                />
                            <textarea
                                name="descricao"
                                className="content-input" 
                                type="textarea" 
                                maxLength={120} 
                                placeholder="digite aqui o conteúdo da sua tarefa" 
                                value={editarTarefa.descricao} 
                                onChange={event => handleEditInput(event.target)}
                            />

                            <div className="select-prioridade">
                                <label>Selecionar prioridade da tarefa</label>
                                <select name="prioridade" id="prioridade" value={editarTarefa.prioridade} onChange={event => handleEditInput(event.target)}>
                                    <option value="Baixo">Baixo</option>
                                    <option value="Médio">Médio</option>
                                    <option value="Alto">Alto</option>
                                </select>
                            </div>

                            <input name="dataTermino" className="date-input" type="date" value={new Date(editarTarefa.dataTermino).toLocaleDateString('en-CA')} onChange={event => handleEditInput(event.target)}/>

                            <div className="select-finalizado">
                                <select name="finalizada" id="finalizado" onChange={event => handleEditInput(event.target)}>
                                    <option value="Não finalizado">Não finalizado</option>
                                    <option value="finalizado">finalizado</option>
                                </select>
                            </div>
                            <input type="button" value="Editar" className="button-submit" onClick={(event) => authTarefa(event)} disabled={editarTarefa.membro.id !== usuarioLogado.id} />
                        </form>
                    </div>
                </section>
                <div className="buttons">
                    <button className="fechar" onClick={() => setShowModal(false)}>Fechar</button>
                    <button className="deletar" onClick={() => deletarTarefa()} disabled={editarTarefa.membro.id !== usuarioLogado.id}>Apagar tarefa</button>
                </div>
            </div>
        </div>
    )
        
    }
    
    export default Modal;