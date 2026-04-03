import { useState } from "react";
import "./produto.css";

function Produto({texto, preco, descricao}) {

    return(
        
        <div className="cardProduto">
            <img src="https://placehold.co/100" />
            <h3>Produto: {texto}</h3>
            <h4>Preço: R${preco}</h4>
            <p>Descrição: {descricao}</p>
        </div>
    )
}

export default Produto;