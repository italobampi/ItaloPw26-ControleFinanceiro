import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovimentacaoService from '../services/MovimentacaoService';


export const MovimentacaoListPage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();
    const userId = JSON.parse(localStorage.getItem("user"));
    const [total, setTotal]= useState();
    var vTotal = null;


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


        MovimentacaoService.findSaldoByContaUsuarioId(userId.id)
            .then((response) => {
                setTotal(response.data)

               vTotal= total.total;
            }).catch((error) => {
                setApiError('Falha ao carregar saldo');
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
    const onReceita = () => {
        setData([]);
        MovimentacaoService.findReceitaByContaUsuarioId(userId.id).then((response) => {
            setData(response.data)
        }).catch((error) => {
            setApiError('Falha ao carregar as Movimentaçoes');
        });
    }
    const onDespesa = () => {
        setData([]);
        MovimentacaoService.findDespesaByContaUsuarioId(userId.id).then((response) => {
            setData(response.data)
        }).catch((error) => {
            setApiError('Falha ao carregar as Movimentaçoes');
        });
    }
    const onTranferencia = () => {
        setData([]);
        MovimentacaoService.findTranferenciaByContaUsuarioId(userId.id).then((response) => {
            setData(response.data)
        }).catch((error) => {
            setApiError('Falha ao carregar as Movimentaçoes');
        });
    }
    return (
        <div className="container col-md-11" >
            <h1 className="text-center">Movimentacoes</h1>
            <div className="text-center">
                <Link className="btn btn-success" to="/movimentacao">Adicionar Movimentação </Link>
            </div>
            <div className='row justify-content-evenly' >
                <div className='card col-md-2 text-center' onClick={loadData}>TODOS</div>
                <div className='card col-md-2 text-center' onClick={onReceita}>RECEITA</div>
                <div className='card col-md-2 text-center' onClick={onDespesa}>DESPESA</div>
                <div className='card col-md-2 text-center' onClick={onTranferencia}>TRANSFERENCIA</div>
            </div>
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
                                    to={`/movimentacao/${movimentacao.id}`}
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
            <div className='row justify-content-evenly'>
                <div className=' col-md-6 text-center'>Total</div>
                <div className=' col-md-6 text-center'>{vTotal}</div>
            </div>
            <div className=''></div>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
        </div>
    );

}
export default MovimentacaoListPage;