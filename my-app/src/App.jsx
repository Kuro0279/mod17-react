import React, { useEffect, useState } from "react";
import "./App.css"

function FormularioProduto({ aoAdicionar }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(null);

  function handleImagem(event) {
    const arquivo = event.target.files[0];
    if (arquivo) {
      setImagem(URL.createObjectURL(arquivo));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    aoAdicionar({ nome, preco, descricao, imagem });
    setNome("");
    setPreco("");
    setDescricao("");
    setImagem(null);
  }

  return (
    <div>
      <h1>Lista de produtos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        /> <br />
        <input
          type="number"
          placeholder="Preço do produto"
          value={preco}
          onChange={e => setPreco(e.target.value)}
          required
        /> <br />
        <input
          type="text"
          placeholder="Descrição do produto"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
        /> <br />
        <input
          type="file"
          accept="image/*"
          onChange={handleImagem}
          required
        /> <br />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  function adicionarProduto(produto) {
    setProdutos([...produtos, produto]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (carregando) {
    return (
      <h1>
        Carregando produtos...
      </h1>
    )
  }

  return (
    <>
      <FormularioProduto aoAdicionar={adicionarProduto} />
      <div className="amostra">
        {produtos.map((prod, idx) => (
          <div key={idx} className="cardProduto">
            {prod.imagem && <img src={prod.imagem} alt={prod.nome} className="imagemCard" />}
            <p className="nome textoCard" >{prod.nome}</p>
            <p className="preco textoCard">R${prod.preco}</p>
            <p className="descricao textoCard"><i>{prod.descricao}</i></p>
            
          </div>
        ))}
      </div>
    </>
  );
}

export default Catalogo;