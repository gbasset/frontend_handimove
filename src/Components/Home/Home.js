import React, { useState, useEffect } from "react";
import { StatusAlertService } from 'react-status-alert'
import Contact from '../Contact/Contact'
import { withRouter } from 'react-router-dom'
import './Home.css'
import cardFrance from '../../Assets/France-regions-svg.svg'
function Home(props) {
    return (
        <div className="home_container">
            <div className="container-head">
                <h2>Trouvez les activités accessibles à tous dans votre régions</h2>
                <div className="container-head-items">
                    <div className="first-item">
                        <div className="container-first-item">
                            <h5> Des établissements marque d'Etat Tourisme & Handicap </h5>
                            <div className="container-paragraphes">
                                <p>
                                    Retrouvez plus de <strong>3760</strong>  établissements répartis dans toute la France accéssibles à tous ainsi que des événements de toutes sortes chaque semaines.
                            </p>
                                <p>
                                    Le jeu de données, mis à disposition par la Direction Générale des Entreprises, fournit des informations depuis l'année 2014 sur les établissements bénéficiant de la marque Tourisme &, Handicap qui est l'unique marque d’État attribuée aux professionnels du tourisme œuvrant en faveur de l'accessibilité pour tous. Elle a pour objectif d’apporter une information objective et homogène sur l’accessibilité des sites et des équipements touristiques. </p>
                                <p>
                                    Tourisme &, Handicap prend en compte les quatre familles de handicaps (auditif, mental, moteur et visuel) et vise à développer une offre touristique adaptée et intégrée à l’offre généraliste. Pour obtenir cette marque, le prestataire doit s'engager dans une démarche exigeante (critères précis) et vérifiée tous les 5 ans (visite d'évaluation).
                            </p>
                            </div>
                        </div>
                        <div className="container-first-item">
                            <div className="card-container-home">
                                <span><i className="fas fa-map-marker-alt"></i></span>
                                <img src={cardFrance} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-home">
                <h2>3 étapes</h2>
            </div>
            <div className="contact-home">
                <h2>Nous contacter</h2>
                <Contact />
            </div>
        </div>
    )
}
export default withRouter(Home)