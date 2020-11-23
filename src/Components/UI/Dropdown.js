import React from 'react'
import './Dropdown.css'
export default function Dropdown({children, isOpen = false, position = "left"}) {

    const cssClass = ['dropdown'];

    if( position == "right" ){
        cssClass.push('dropdown_right');
    }

    /*if( isOpen ){
        document.addEventListener('click', this.closeMenu);
    }else{
        document.addEventListener('click', this.closeMenu);
    }*/

    if( !isOpen ) return '';

    return (
        <div className={cssClass.join(' ')}>
            {children}
        </div>
    )
}
