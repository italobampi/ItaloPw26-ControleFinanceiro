import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovimentacaoService from '../services/MovimentacaoService';


export const MovimentacaoListPage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();
    const userId = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        MovimentacaoService.findAll(userId.id)
            .then((response) => {
                setData(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar as Movimentaçoes');
            });
    };
    const onRemove = (id) => {
        MovimentacaoService.remove(id).then((response) => {
            loadData();
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao remover a Movimentação');
        });
    }
    return (
        <div className="container">
            <h1 className="text-center">Movimentacoes</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Data Pagamento</th>
                        <th>Categoria</th>
                        <th>Descricao</th>
                        <th>Valor Pago</th>
                        <th>Tipo </th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((movimentacao) => (
                        <tr key={movimentacao.id}>
                            <td>{movimentacao.dataPagamento}</td>
                            <td>{movimentacao.categoria}</td>
                            <td>{movimentacao.descricao}</td>
                            <td>{movimentacao.valorPago}</td>
                            <td>{movimentacao.tipoMovimentacao}</td>

                            <td>
                               <Link className="btn btn-primary"
                               to={`/movimentacoes/${movimentacao.id}`}
                                > Editar</Link>

                                <button className="btn btn-danger"
                                    onClick={() => onRemove(movimentacao.id)}>
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
        </div>
    );

}
export default MovimentacaoListPage;