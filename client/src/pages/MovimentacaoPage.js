import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import ContaService from '../services/ContaService';
import MovimentacaoService from '../services/MovimentacaoService';

export const MovimentacaoPage = () => {
    const userId = JSON.parse(localStorage.getItem("user"));
    const [form, setForm] = useState({
        id: null,
        valor: '',
        valorPago: '',
        categoria: '',
        dataVencimento: '',
        dataPagamento: '',
        descricao: '',
        conta: { id: null },
        tipoMovimentacao: null,
        destino:null


    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const [contas, setContas] = useState([]);
    var condi= null;

    useEffect(() => {
        ContaService.findByUser(userId.id).then((response) => {
            setContas(response.data);
            if (id) {
                MovimentacaoService.findOne(id).then((response) => {
                    if (response.data) {
                        setForm({
                            id: response.data.id,
                            valor: response.data.valor,
                            valorPago: response.data.valorPago,
                            categoria: response.data.categoria,
                            dataVencimento: response.data.dataVencimento,
                            dataPagamento: response.data.dataPagamento,
                            descricao: response.data.descricao,
                            conta: response.data.conta.id,
                            tipoMovimentacao: response.data.tipoMovimentacao
                        });
                        setApiError();
                    } else {
                        setApiError('Falha ao carregar a Movimentação');
                    }
                }).catch((erro) => {
                    setApiError('Falha ao carregar a Movimentação');
                });
            }
        })
    }, [id]);


    const onChange = (event) => {
        const { value, name } = event.target;
        onTipo();
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
    const onTipo=()=>{
        if (form.tipoMovimentacao === 2) {
            form.descricao = 'merda';
             condi= false;

        }else{
             condi= true;
        }
        return condi;
    }

    const onSubmit = () => {
        const movimentacao = {
            id: form.id,
            valor: form.valor,
            valorPago: form.valorPago,
            categoria: form.categoria,
            dataVencimento: form.dataVencimento,
            dataPagamento: form.dataPagamento,
            descricao: form.descricao,
            conta: { id: form.conta },
            tipoMovimentacao: form.tipoMovimentacao
        };
        setPendingApiCall(true);
        if (form.tipoMovimentacao > 1) {
            MovimentacaoService.transferencia(movimentacao,form.destino).then((response)=>{
                setPendingApiCall(false);
                navigate('/movimentacoes');
            })

        } else {
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
        }
    };
    
    

    return (
        <div className="container col-8 mb-3">
            <h1 className="text-center">movimentaçao</h1>
            <div className="col-12 mb-3">
                <label>Tipo Movimentacao</label>
                <select
                    className="form-control"
                    name="tipoMovimentacao"
                    onChange={onChange}
                >

                    <option value={0}  onChange={onChange}>RECEITA</option>
                    <option value={1}  onChange={onChange}>DESPESA</option>
                    <option value={2}  onChange={onChange}>TRANSFERENCIA</option>

                </select>
                {errors.tipoConta && (
                    <div className="invalid-feedback d-block">{errors.tipoConta}</div>
                )}
            </div>
            <div className="col-12">
                <Input
                    name="valor"
                    label="Valor"
                    placeholder="Informe o Valor"
                    value={form.valor}
                    onChange={onChange}
                    hasError={errors.valor && true}
                    error={errors.valor}
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="valorPago"
                    label="Valor Pago"
                    placeholder="Informe o Valor pago"
                    value={form.valorPago}
                    onChange={onChange}
                    hasError={errors.valorPago && true}
                    error={errors.valorPago}
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="categoria"
                    label="Categoria"
                    placeholder="Informe a Categoria"
                    value={form.categoria}
                    onChange={onChange}
                    hasError={errors.categoria && true}
                    error={errors.categoria}
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="dataVencimento"
                    label="Data de Vencimento"
                    type="date"
                    placeholder="Informe a Data de vencimento"
                    value={form.dataVencimento}
                    onChange={onChange}
                    hasError={errors.dataVencimento && true}
                    error={errors.dataVencimento}
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="dataPagamento"
                    label="Data de Pagamento"
                    type="date"
                    placeholder="Informe a Data de Pagamento"
                    value={form.dataPagamento}
                    onChange={onChange}
                    hasError={errors.dataPagamento && true}
                    error={errors.dataPagamento}
                />
            </div>
            <div className="col-12 mb-3">
                <label>Descrição</label>
                <textarea
                    className="form-control"
                    name="descricao"
                    placeholder="Informe a descrição"
                    value={form.descricao}
                    onChange={onChange}
                
                ></textarea>
                {errors.descricao && (
                    <div className="invalid-feedback d-block">{errors.descricao}</div>
                )}
            </div>
            <div className="col-12 mb-3">
                <label>Conta</label>
                <select
                    className="form-control"
                    name="conta"
                    //value={form.conta}
                    onChange={onChange}
                    
                >
                    {contas.map((conta) => (
                        <option key={conta.id} value={conta.id}>{conta.numero}--{conta.tipoConta}</option>
                    ))}
                </select>
                {errors.conta && (
                    <div className="invalid-feedback d-block">{errors.conta}</div>
                )}
            </div>
            
            <div className="col-12 mb-3 " id='contaColla' hidden={form.tipoMovimentacao>1 ? false :true}>
                <label>Conta Destino</label>
                <select
                    className="form-control"
                    name="destino"
                    //value={form.conta}
                    onChange={onChange}
                >
                    {contas.map((conta) => (
                        <option key={conta.id} value={conta.id}>{conta.numero}--{conta.tipoConta}</option>
                    ))}
                </select>
                {errors.conta && (
                    <div className="invalid-feedback d-block">{errors.conta}</div>
                )}
            </div>

            <div className="text-center">
                <ButtonWithProgress
                    onClick={onSubmit}
                    disabled={pendingApiCall ? true : false}
                    pendingApiCall={pendingApiCall}
                    text="Salvar"
                />
            </div>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
            <div className="text-center">
                <Link to="/movimentacoes">Voltar</Link>
            </div>
        </div>
    );
}
export default MovimentacaoPage;