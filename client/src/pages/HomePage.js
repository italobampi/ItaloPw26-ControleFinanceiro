import React, { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import MovimentacaoService from '../services/MovimentacaoService';
const HomePage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();
    const userId = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

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
    const onClick=()=>{
        navigate('/movimentacoes')
    }

    return (
        <div className='col-md-10 '>
            <h1 className='mb-3'>Teste!</h1>
            <div className='container ' >
                <table className='table ' >
                    <tbody>
                        <tr>
                            <tb>
                                <Link className=' btn    ' to={'/contas'} >
                                    Contas
                                </Link>
                            </tb>
                            <tb><Link className=' btn ' to={'/movimentacao'}>Movimentar</Link></tb>
                            <tb><Link className=' btn   ' to={'/movimentacoes'} >Extratos</Link></tb>
                        </tr>
                        <tr>

                        </tr>
                    </tbody>
                </table></div>
                <div className="container col-10 mb-3 " onClick={onClick}>
            <h1 className="text-center">Movimentacoes</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Data Pagamento</th>
                        <th>Categoria</th>
                        <th>Descricao</th>
                        <th>Valor Pago</th>
                        <th>Tipo </th>                        
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
                        </tr>
                    ))}
                </tbody>
            </table>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
        </div>
        </div>
        
        
    );
};

export default HomePage;