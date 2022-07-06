import axios from 'axios';
const save = (movimentacao) => {
    return axios.post('/movimentacoes', movimentacao, {headers: getAuthHeader()});
}

const findAll = (id) => {
    return axios.get(`/movimentacoes/user/${id}`, {headers: getAuthHeader()});
}

const findOne = (id) => {
    return axios.get(`/movimentacoes/${id}`, {headers: getAuthHeader()});
}

const remove = (id) => {
    return axios.delete(`/movimentacoes/${id}`, {headers: getAuthHeader()});
}

const findDespesaByContaUsuarioId = (id) => {
    return axios.get(`/movimentacoes/user/despesa/${id}`, {headers: getAuthHeader()});
}
const findReceitaByContaUsuarioId = (id) => {
    return axios.get(`/movimentacoes/user/receita/${id}`, {headers: getAuthHeader()});
}
const findSaldoDespesaByContaUsuarioId = (id) => {
    return axios.get(`/movimentacoes/saldo/despesa/${id}`, {headers: getAuthHeader()});
}
const findSaldoReceitaByContaUsuarioId = (id) => {
    return axios.get(`/movimentacoes/saldo/receita/${id}`, {headers: getAuthHeader()});
}
const findSaldoByContaUsuarioId = (id) => {
    return axios.get(`/movimentacoes/saldo/${id}`, {headers: getAuthHeader()});
}
const transferencia = (movimentacao,id) => {
    return axios.post(`/movimentacoes/${id}`, movimentacao, {headers: getAuthHeader()});
}

const MovimentacaoService = {
    save,
    findAll,
    findOne,
    remove,
    findDespesaByContaUsuarioId,
    findReceitaByContaUsuarioId,
    findSaldoByContaUsuarioId,
    findSaldoDespesaByContaUsuarioId,
    findSaldoReceitaByContaUsuarioId,
    transferencia
}

const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`};
    } else {
        return {}
    }
}
export default MovimentacaoService;