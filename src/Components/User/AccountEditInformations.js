import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import InputChange from '../../Components/UI/InputChange'
import './AccountEditInformations.css'
import pictureAvatar from '../../Assets/blank-profile-picture-973460_640.png'
export default function AccountEditInformations() {
    const {
        user,
        setUser
    } = useContext(Context)
    const [form, setForm] = useState({
        username: user.username,
        mail: user.mail,
        password: user.password,
        avatar_url: user.avatar_url
    })
    const handleChange = (e) => {
        setForm(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        })
        )
    }
    console.log("form", form);
    return (
        <div className="container-account-info">
            <form>
                <div className="image-user">
                    <img src={user && user.avatar ? user.avatar : pictureAvatar} alt="avatar du compte" />
                </div>
                <InputChange
                    name="username"
                    label="Nom"
                    value={user && form.username}
                    onChangeFunction={handleChange}
                />
                <InputChange
                    name="mail"
                    label="Email"
                    value={user && form.mail}
                    onChangeFunction={handleChange}
                />
                <button>Envoyer</button>
            </form>
        </div>
    )
}
