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

const MovimentacaoService = {
    save,
    findAll,
    findOne,
    remove
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