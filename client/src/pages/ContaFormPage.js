import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import ContaService from '../services/ContaService';

export const ContaFormPage = () => {

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





    useEffect(() => {
        if (id) {
            ContaService.findOne(id).then((response) => {
                if (response.data) {
                    setForm({
                        id: response.data.id,
                        numero: response.data.numero,
                        agencia: response.data.agencia,
                        banco: response.data.banco,
                        tipoConta: response.data.tipoConta,
                        usuario: response.data.usuario.id
                    });
                    setApiError();
                } else {
                    setApiError('Falha ao carregar a conta');
                }
            }).catch((erro) => {
                setApiError('Falha ao carregar a conta');
            });

        }


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
        // AuthService.getCurrentUser().then((response)=>{
        //     if(response.data){
        //         setForm({
        //             // usuario:{id: response.data.id}
        //             usuario:{id: 1}

        //         });
        //         setApiError('fygudsbhfghfhfj');
        //     }
        // }).catch((erro)=>{
        //     setApiError('Falha ao carregar o usuario');
        // })
        const conta = {
            id: form.id,
            numero: form.numero,
            agencia: form.agencia,
            banco: form.banco,
            tipoConta: form.tipoConta,
            usuario: { id: 1 }
        };
        setPendingApiCall(true);
        ContaService.save(conta).then((response) => {
            setPendingApiCall(false);
            navigate('/contas');

        }).catch((error) => {
            if (error.response.data && error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            } else {
                setApiError('Falha ao salvar categoria.');
            }
            setPendingApiCall(false);
        });

    };

    return (
        <div className="container">
            <h1 className="text-center">Cadastro de Conta</h1>

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
            <div className="col-12 mb-3">
                <label>Tipo Conta</label>
                <select
                    className="form-control"
                    name="tipoConta"
                    //value={}
                    onChange={onChange}
                >

                    <option value={1}>Conta cartão</option>
                    <option value={2}>Conta corrente</option>
                    <option value={1}>Conta poupança</option>

                </select>
                {errors.tipoConta && (
                    <div className="invalid-feedback d-block">{errors.tipoConta}</div>
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

export default ContaFormPage;