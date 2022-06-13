import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import ContaService from '../services/ContaService';
import MovimentacaoService from '../services/MovimentacaoService';

export const ReceberPage = () => {
    const [form, setForm] = useState({
        id: null,
        valor: '',
        valorPago: '',
        categoria: '',
        dataVencimento: '',
        datapagamento: '',
        descricao: '',
        conta: { id: null },
        tipoMovimentacao: 1


    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const [contas, setContas] = useState([]);

    useEffect(() => {
        ContaService.findByUser().then((response) => {
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
                            datapagamento: response.data.datapagamento,
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
        const movimentacao = {
            id: form.id,
            valor: form.valor,
            valorPago: form.valorPago,
            categoria: form.categoria,
            dataVencimento: form.dataVencimento,
            datapagamento: form.datapagamento,
            descricao: form.descricao,
            conta: form.conta.id,
            tipoMovimentacao: form.tipoMovimentacao
        };
        setPendingApiCall(true);
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

    };

    return (
        <div className="container">
            <h1 className="text-center">Registro de movimentaçao</h1>
            <div className="col-12 mb-3">
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
                    name="datapagamento"
                    label="Data de Pagamento"
                    type="date"
                    placeholder="Informe a Data de Pagamento"
                    value={form.dataVencimento}
                    onChange={onChange}
                    hasError={errors.dataVencimento && true}
                    error={errors.dataVencimento}
                />
            </div>
            <div className="col-12 mb-3">
                <label>Descrição</label>
                <textarea
                    className="form-control"
                    name="description"
                    placeholder="Informe a descrição"
                    value={form.description}
                    onChange={onChange}
                ></textarea>
                {errors.description && (
                    <div className="invalid-feedback d-block">{errors.description}</div>
                )}
            </div>
            <div className="col-12 mb-3">
                <label>Conta</label>
                <select
                    className="form-control"
                    name="category"
                    value={form.conta}
                    onChange={onChange}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors.category && (
                    <div className="invalid-feedback d-block">{errors.category}</div>
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
                <Link to="/contas">Voltar</Link>
            </div>
        </div>
    );
}

export default ReceberPage;