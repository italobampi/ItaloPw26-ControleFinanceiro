import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import ContaService from '../services/ContaService';
import MovimentacaoService from '../services/MovimentacaoService';
export const ContaRecebePage = () => {

    const transfer = JSON.parse(localStorage.getItem("movimentação"));
    const [form, setForm] = useState({
        id: null,
        numero: '',
        agencia: '',
        banco: '',
        tipoConta: null,
        usuario: null

    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();


    // useEffect(() => {
    //     if (id) {
    //         ContaService.findOne(id).then((response) => {
    //             if (response.data) {
    //                 setForm({
    //                     id: response.data.id,
    //                     numero: response.data.numero,
    //                     agencia: response.data.agencia,
    //                     banco: response.data.banco,
    //                     tipoConta: response.data.tipoConta,
    //                     usuario: response.data.usuario.id
    //                 });
    //                 setApiError();
    //             } else {
    //                 setApiError('Falha ao carregar a conta');
    //             }
    //         }).catch((erro) => {
    //             setApiError('Falha ao carregar a conta');
    //         });
    //     }
    // }, [id]);


    const onChange = (event) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
        setErrors((previousErrors) => {
            return {
                ...previousErrors,
                [name]: undefined,
            };
        });
    };

    const onSubmit = () => {
     
        setPendingApiCall(true);
        ContaService.findByNumeroAndAgenciaAndBanco(form.numero).then((response) => {
            const conta = response.data;
            
            const movimentacao = {
                id: null,
                valor: transfer.valor,
                valorPago: transfer.valorPago,
                categoria: transfer.categoria,
                dataVencimento: transfer.dataVencimento,
                dataPagamento: transfer.dataPagamento,
                descricao: transfer.descricao //"tranferencia de "//+transfer.conta.usuario.nome+transfer.descricao,
                ,conta: {id: conta.id},
                tipoMovimentacao: 0
            }
           
            MovimentacaoService.save(transfer).then((response) => {
                setPendingApiCall(false);
    
            }).catch((error) => {
                if (error.response.data && error.response.data.validationErrors) {
                    setErrors(error.response.data.validationErrors);
                } else {
                    setApiError('Falha ao salvar a Movimentaçao.');
                }
                setPendingApiCall(false);
            });
            MovimentacaoService.save(movimentacao).then((response) => {
                setPendingApiCall(false);
                navigate('/movimentacoes');
    
            }).catch((error) => {
                if (error.response.data && error.response.data.validationErrors) {
                    setErrors(error.response.data.validationErrors);
                } else {
                    setApiError('Falha ao salvar a Movimentaçao.');
                }
                setPendingApiCall(false);
            });
        
            setPendingApiCall(false);
        

        }).catch((error) => {
            if (error.response.data && error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            } else {
                setApiError('Falha ao tranferir.');
            }
            setPendingApiCall(false);
        });

    };
 

    return (
        <div className="container">
            <h1 className="text-center">Cadastro de Conta</h1>

            <h2>{transfer.valor}</h2>

            <div className="col-12 mb-3">
                <Input
                    name="numero"
                    label="Numero"
                    placeholder="Informe o Numero"
                    value={form.numero}
                    onChange={onChange}
                    hasError={errors.numero && true}
                    error={errors.numero}
                />
            </div>

            <div className="col-12 mb-3">
                <Input
                    name="agencia"
                    label="Agencia"
                    placeholder="Informe a Agencia"
                    value={form.agencia}
                    onChange={onChange}
                    hasError={errors.agencia && true}
                    error={errors.agencia}
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="banco"
                    label="Banco"
                    placeholder="Informe o Banco"
                    value={form.banco}
                    onChange={onChange}
                    hasError={errors.banco && true}
                    error={errors.banco}
                />
            </div>
            
            
            <div className="text-center">
                <ButtonWithProgress
                    onClick={onSubmit} 
                    disabled={pendingApiCall ? true : false}
                    pendingApiCall={pendingApiCall}
                    text="Transferir"
                />
            </div>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
            <div className="text-center">
                <Link to="/movimentacao">Voltar</Link>
            </div>

















        </div>
    );
}

export default ContaRecebePage;