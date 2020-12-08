import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import Input from './../UI/Input';
import './AccountInformations.css'
export default function AccountInformations() {
    const {
        user,
        setUser
    } = useContext(Context)
    return (
        <div className="container-account-info">
            <form>
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
