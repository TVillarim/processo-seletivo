import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cadastroTarefasStyle from "../cadastroTarefas/cadastroTarefas.scss"
import { userContext } from "../contextAPI/useContext";
import serviceAPI from "../../../services/serviceAPI";


export default function CadastraTarefa () {

    let navigate = useNavigate();

    const [tituloTarefa, setTituloTarefa] = useState("");
    const [prioridade, setPrioridade] = useState("Baixo");
    const [conteudoTarefa, setConteudoTarefa] = useState("");
    const [date, setDate] = useState("Sem data");
    const [finalizado, setFinalizado] = useState(false)

    const {
        listaTarefas,
        setListaTarefas,
        usuarioLogado
    } = React.useContext(userContext)

    const authTarefa = async () => {
        if(!checagemDoTituloDaTarefa()) {
            return;
        } else {
            const dataHora = new Date(date).getTime();
            const salvaTarefa = {
                nome: tituloTarefa,
                descricao: conteudoTarefa,
                prioridade: prioridade || "Baixa",
                dataTermino: dataHora,
                finalizada: finalizado || false 
            };

            const membro = JSON.parse(sessionStorage.getItem('membro'))
            const response = await serviceAPI.post(`api/tarefas/${membro.id}/criar`, salvaTarefa)
            navigate("/listagemTarefas");
        }
    };



    const checagemDoTituloDaTarefa = () => {
        if(tituloTarefa === undefined || tituloTarefa < 5) {
            alert('opa, você esqueceu de escolher um titulo para sua tarefa');
            return false;
        }

        return true
    };

    const backHome = () => {
        navigate("/listagemTarefas")
    }

    return(
        <>
            <div className="cadastro-tarefas-header-container">
                <header className="cadastro-tarefas-header">
                    <h1>Cadastro de tarefas</h1>
                    <a onClick={() => backHome()}>voltar para Listagem</a>
                </header>
            </div>

            <div className="section-cadastro-container">
                <section className="section-cadastro">
                    <div className="section-inputs">
                        <form>
                            <input
                                className="title-input" 
                                type="text" minLength={5} 
                                maxLength={50} 
                                placeholder="Digite o título da tarefa" 
                                value={tituloTarefa} 
                                onChange={event => setTituloTarefa(event.target.value)}
                            />
                            <textarea
                                className="content-input" 
                                name="textarea" 
                                maxLength={140} 
                                placeholder="Digite aqui o conteúdo da sua tarefa" 
                                value={conteudoTarefa}
                                onChange={event => setConteudoTarefa(event.target.value)} 

                            />

                            <div className="selecionar-prioridade">
                                <label>Selecionar prioridade da tarefa</label>
                                <select name="selecionar prioridade" id="prioridade" onChange={event => setPrioridade(event.target.value)}>
                                    <option value="Baixo" selected>Baixo</option>
                                    <option value="Médio">Médio</option>
                                    <option value="Alto">Alto</option>
                                </select>
                            </div>

                            <input className="date-input" type="date" onChange={event => setDate(event.target.value)}/>

                            <div className="finalizado">
                                <select name="status finalizado" id="finalizado" onChange={event => setFinalizado(event.target.value)}>
                                    <option value={false}>Não finalizado</option>
                                    <option value={true}>finalizado</option>
                                </select>
                            </div>

                            <input type="button" value="Submit" className="button-salvar-tarefa" onClick={() => authTarefa()}/>

                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}