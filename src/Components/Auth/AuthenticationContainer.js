import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import './AuthenticationContainer.css'
import UseFetch from '../../Hooks/UseFetch'
import Btn from '../UI/Btn'
import { Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom';
import { StatusAlertService } from 'react-status-alert'
export default function AuthenticationContainer() {

    const [resultForm, setResultForm] = useState({
        mail: '',
        password: ''
    })
    const [isClick, setIsClick] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const { error, setError, data, postData } = UseFetch();

    const handleChangeForm = (e) => {
        let prevState = { ...resultForm }
        prevState[e.target.name] = e.target.value
        setError()
        setResultForm(prevState)
    }
    useEffect(() => {
        if (isClick) {
            postData('authentification', resultForm)
            setIsClick(false)
        }
    }, [isClick])
    useEffect(() => {
        if (data) {
            StatusAlertService.showSuccess(`Heureux de vous retrouver ${data.userInformations[0].username} !!`)
            setRedirect(true)
        }
    }, [data])

    if (redirect) {
        //Affichage de la redirection
        return <Redirect to={`/user`} />;
    }
    return (
        <div className="auth_container">
            <h1>Me connecter</h1>
            <div className="poppin">
                <h1>Bienvenue </h1>
                <form >
                    <label htmlFor="">
                        <i className="fa fa-envelope"></i>
                        <input
                            type="email"
                            name="mail"
                            placeholder="Email"
                            value={resultForm.mail}
                            onChange={handleChangeForm}
                        />

                    </label>
                    <label htmlFor="password">
                        <i className="fa fa-lock"></i>
                        <input type="password"
                            name="password"
                            placeholder="Password"
                            value={resultForm.password}
                            onChange={handleChangeForm}
                        />
                    </label>
                    <div className="spinner ng-hide" ng-show="LoadingProcess">
                        <div className="rect1"></div> <div className="rect2"></div> <div className="rect3"></div> <div className="rect4"></div> <div className="rect5"></div>
                    </div>
                    {
                        error && <>
                            <input
                                type="hidden"
                                name="connexionform"
                                value="true" />
                            <p className="login-error-message">{error}</p>
                        </>
                    }
                    <div style={{ display: 'flex', margin: '5px auto' }}>
                        <Btn
                            onClickFunction={(e) => { e.preventDefault(); setIsClick(true) }}
                            message="Me Connecter"
                        />
                    </div>
                    <div style={{ color: "#60a3bc", display: 'flex', margin: 'auto' }}>
                        <NavLink to={
                            {
                                pathname: "/changePassword"
                            }}
                            activeStyle={{ color: "#ffcb84e6" }}
                        >J'ai oublié mon Mot de passe</NavLink>
                    </div>

                </form>
                <div className="signup">
                    <p>Je n'ai pas encore de compte</p>
                    <div>
                        <button className="btt-second btnUi btn_primary">
                            <NavLink to={
                                {
                                    pathname: "/register"
                                }}
                                activeStyle={{ color: "#ffcb84e6" }}
                            >Créer un compte</NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
