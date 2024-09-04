import React from "react";
import axios from "axios";


export default axios.create({
    baseURL: `https://viitra-api-desafio.herokuapp.com/`
  });