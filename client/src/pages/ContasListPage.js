import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import ContaService from '../services/ContaService';


export const ContasPage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();
    const userId = JSON.parse(localStorage.getItem("user"));
    

    useEffect(() => {
       loadData();
    }, []);

    const loadData = () => {

      
        ContaService.findByUser(userId.id)
            .then((response) => {
                setData(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar as Contas');
            });
    };
    const onRemove = (id) => {
        ContaService.remove(id).then((response) => {
            loadData();
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao remover a Conta');
        });
    }
    return (
        <div className="container">
            <h1 className="text-center">Contas {}</h1>
            <div className="text-center">
                <Link className="btn btn-success" to="/contas/new">Adicionar Conta </Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Agencia</th>
                        <th>Banco</th>
                        <th>Tipo Conta</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((conta) => (
                        <tr key={conta.id}>
                            <td>{conta.numero}</td>
                            <td>{conta.agencia}</td>
                            <td>{conta.banco}</td>
                            <td>{conta.tipoConta}</td>
                            <td>
                                <Link className="btn btn-primary"
                                to={`/contas/${conta.id}`}
                                > Editar</Link>

                                <button className="btn btn-danger"
                                    onClick={() => onRemove(conta.id)}>
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
export default ContasPage;