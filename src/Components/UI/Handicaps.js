import React from 'react'

const listHandicaps = [
    { value: "moteur", img: "fas fa-wheelchair" },
    { value: "visuel", img: "fas fa-blind" },
    { value: "auditif", img: "fas fa-assistive-listening-systems" },
    { value: "mental", img: "fas fa-head-side-virus" },
]
export default function Handicaps({ handiList }) {
    const list = handiList.split(";")

    return (
        <div className="handicap-container">
            {
                list.map((handi, i) =>
                    <span key={i}>
                        <i className={listHandicaps.find(el => el.value === handi) && listHandicaps.find(el => el.value === handi).img} title={listHandicaps.find(el => el.value === handi) && ` handicap ${listHandicaps.find(el => el.value === handi).value}`}>
                        </i>
                        <p>{handi}</p>
                    </span>
                )
            }
        </div>
    )
}
