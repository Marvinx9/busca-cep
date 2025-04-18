import { useState } from "react";
import "./App.css";

function App() {
  const [endereco, setEndereco] = useState([]);

  function maniputarEndereco(evento) {
    const cep = evento.target.value;

    setEndereco({ cep });

    if (cep && cep.length === 8)
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          setEndereco((enderecoAntigo) => ({
            ...enderecoAntigo,
            rua: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf,
          }));
        });
  }
  return (
    <div className="App">
      <header className="App-header">
        <h3 className="title__cep">Digite o cep e descubra o endereço</h3>
        <div className="container">
          <input
            className="input__cep"
            placeholder="Digite o cep"
            onChange={maniputarEndereco}
            autocomplete="off"
          />
          <ul className="list__endereco">
            <li>Cep: {endereco.cep}</li>
            <li>Rua: {endereco.rua}</li>
            <li>Bairro: {endereco.bairro}</li>
            <li>Cidade: {endereco.cidade}</li>
            <li>Estado: {endereco.estado}</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
