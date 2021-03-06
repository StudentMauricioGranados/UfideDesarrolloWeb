import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
  
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { Productos } from '../components/productos/productos';

export const AppRouter = () => {

    const dispatch = useDispatch();
    // const { checking, uid } = useSelector( state => state.auth);
    const { uid } = useSelector( state => state.auth);

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch])

    // if ( checking ) {
    //     return (<h5>Espere...</h5>);
    // }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path="/login" component={ LoginScreen } isAuthenticated={ !!uid }/>
                    <PublicRoute exact path="/productos" component={ Productos } isAuthenticated={ !!uid }/>

                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ Productos } 
                        isAuthenticated={ !!uid }
                    />

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
