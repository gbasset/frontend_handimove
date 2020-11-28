import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import './AuthenticationContainer.css'
import UseFetch from '../../Hooks/UseFetch'
import { Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom';
import { StatusAlertService } from 'react-status-alert'
export default function AuthenticationContainer() {
    const {
        user,
        setUser
    } = useContext(Context)
    const [resultForm, setResultForm] = useState({
        mail: '',
        password: ''
    })
    const [isClick, setIsClick] = useState(false)

    const { status, error, setError, data, postData } = UseFetch();
    console.log("resultForm", resultForm);
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
            setUser(data.userInformations[0])
            StatusAlertService.showSuccess(`Heureux de vous retrouver ${data.userInformations[0].username} !!`)
        }
    }, [data])
    console.log("data", data);
    //authentification
    return (
        <div className="auth_container">
            <h1>Authentication</h1>
            <div className="poppin">
                <h1>Hello</h1>
                <form className="mail">
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
                    <button
                        type="submit"
                        className="btt-second btt-blue"
                        onClick={(e) => { e.preventDefault(); setIsClick(true) }}
                    >Log In</button>
                    <NavLink to={
                        {
                            pathname: "/changePassword"
                        }}
                        activeStyle={{ color: "#ffcb84e6" }}
                    >J'ai oublié mon Mot de passe</NavLink>

                </form>
                <div className="signup">
                    <p>Je n'ai pas encore de compte</p>
                    <button className="btt-second">
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
    )
}
