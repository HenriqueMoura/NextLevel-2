import React from 'react'

import whatssapIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem(){
    return(
        <article className="teacher-item">
        <header>
            <img src="https://avatars0.githubusercontent.com/u/47399878?s=460&u=6ed417b19d8fe8dbc8426a888da42a2aaa402d4c&v=4" alt="Henrique"/>
            <div>
                <strong>Henrique Almeida</strong>
                <span>Química</span>
            </div>
        </header>
        <p>
        Lorem Ipsum is simply dummy text of the printing and types
            <br/>typesetting industry. Lorem Ipsum

        </p>
        <footer>
            <p>Preço/hora
                <strong>R$80,00</strong>
            </p>
            <button type="button">
                <img src={whatssapIcon} alt="Icone Whatssap"/>
                Entre em contato
            </button>
        </footer>
    </article>
    )
}

export default TeacherItem
