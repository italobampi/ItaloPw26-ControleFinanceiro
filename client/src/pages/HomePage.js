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
                            <tb><Link className=' btn ' to={'/pagar'}>Pagar</Link></tb>
                        </tr>
                        <tr>
                            <tb><Link className=' btn   ' to={'/categories'} >Extratos</Link></tb>
                            <tb><Link className=' btn   ' to={'/receber'} >Receber</Link></tb>
                        </tr>
                    </tbody>
                </table></div>
        </div>
    );
};

export default HomePage;