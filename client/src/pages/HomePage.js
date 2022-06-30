import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Teste!</h1>
            <div className='container'>
                <table className='table '>
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
        </div>
    );
};

export default HomePage;