import axios from 'axios';
const save = (conta) => {
    return axios.post('/contas', conta, {headers: getAuthHeader()});
}

const findAll = () => {
    return axios.get('/contas', {headers: getAuthHeader()});
}

const findOne = (id) => {
    return axios.get(`/contas/${id}`, {headers: getAuthHeader()});
}

const remove = (id) => {
    return axios.delete(`/contas/${id}`, {headers: getAuthHeader()});
}
const findByUser =(id)=>{
    return axios.get(`/contas/user/${id}`,{headers:getAuthHeader()});
}

const ContaService = {
    save,
    findAll,
    findOne,
    remove,
    findByUser
}

const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`}; //'Bearer ' + token
    } else {
        return {}
    }
}
export default ContaService;