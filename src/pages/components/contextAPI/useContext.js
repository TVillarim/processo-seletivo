import React, { useState } from "react";

export const userContext = React.createContext({});


export const UserProvider = (props) => {

  const [listaTarefas, setListaTarefas] = useState([]);

  const [tarefasCadastradas, setTarefasCadastradas] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [usuarioLogado, setUsuarioLogado] = useState({});

  const [editarTarefa, setEditarTarefa] = useState({})





  return (
    <userContext.Provider value={{
        listaTarefas, setListaTarefas,
        tarefasCadastradas, setTarefasCadastradas,
        showModal, setShowModal,
        usuarioLogado, setUsuarioLogado,
        editarTarefa, setEditarTarefa
    }}>

      {props.children}
    </userContext.Provider>
  )
}