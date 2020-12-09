import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import Input from './../UI/Input';
import './AccountInformations.css'
import pictureAvatar from '../../Assets/blank-profile-picture-973460_640.png'
export default function AccountInformations() {
    const {
        user,
        setUser
    } = useContext(Context)
    return (
        <div className="container-account-info">
            <form>
                <div className="image-user">
                    <img src={user && user.avatar ? user.avatar : pictureAvatar} alt="avatar du compte" />
                </div>
                <Input
                    name="login"
                    label="Nom"
                    value={user && user.username}
                />
                <Input
                    name="mail"
                    label="Email"
                    value={user && user.mail}
                />
                <Input
                    name="role"
                    label="Role"
                    value={user && user.is_admin === 1 ? "Utilisateur" : "Admin"}
                />

            </form>

        </div>
    )
}
