import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import HomePage from '../pages/HomePage';


import MovimentacaoPage from '../pages/MovimentacaoPage';
import ContasListPage from '../pages/ContasListPage';
import { ContaFormPage } from '../pages/ContaFormPage';

import MovimentacaoListPage from '../pages/MovimentacaoListPage';
import ContaRecebePage from '../pages/ContaRecebePage';

const AuthenticatedRoutes = () => {
    
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<HomePage />} />

                

                <Route path='/contas' element={<ContasListPage />} />
                <Route path='/contas/new' element={<ContaFormPage/>}/>
                <Route path='/contas/:id' element={<ContaFormPage/>}/>
                <Route path='/conta/recebe' element={<ContaRecebePage/>}/>

                


                
                <Route path='/movimentacao' element={<MovimentacaoPage />} />
                <Route path='/movimentacoes' element={<MovimentacaoListPage/>}/>
                <Route path='/movimentacao/:id' element={<MovimentacaoPage />} />


                <Route path='*' element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default AuthenticatedRoutes;