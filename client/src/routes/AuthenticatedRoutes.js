import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import HomePage from '../pages/HomePage';

import CategoryListPage from '../pages/CategoryListPage';
import ProductListPage from '../pages/ProductListPage';
import CategoryFormPage from '../pages/CategoryFormPage';
import ProductFormPage from '../pages/ProductFormPage';
import PagarPage from '../pages/PagarPage';
import ContasListPage from '../pages/ContasListPage';
import { ContaFormPage } from '../pages/ContaFormPage';
import { ReceberPage } from '../pages/ReceberPage';
import MovimentacaoListPage from '../pages/MovimentacaoListPage';

const AuthenticatedRoutes = () => {
    
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<HomePage />} />

                <Route path='/categories' element={<CategoryListPage />} />
                

                <Route path='/contas' element={<ContasListPage />} />
                <Route path='/contas/new' element={<ContaFormPage/>}/>


                <Route path='/categories/new' element={<CategoryFormPage />} />
                <Route path='/categories/:id' element={<CategoryFormPage />} />

                <Route path='/products' element={<ProductListPage />} />
                <Route path='/products/new' element={<ProductFormPage />} />
                <Route path='/products/:id' element={<ProductFormPage />} />


                <Route path='/receber'element={<ReceberPage/>}/>
                <Route path='/pagar' element={<PagarPage />} />
                <Route path='/extrato' element={<MovimentacaoListPage/>}/>


                <Route path='*' element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default AuthenticatedRoutes;