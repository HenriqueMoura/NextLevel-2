import React ,{ useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import './styles.css'
import Input from '../../components/Input'
import warninIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api'

function TeacherForm(){

    const [name,setName ] =  useState('')
    const [avatar,setAvatar ] =  useState('')
    const [whatsapp,setWhatsapp ] =  useState('')
    const [bio,setBio ] =  useState('')

    const [subject,setSubject ] =  useState('')
    const [cost,setcost ] =  useState('')


    const [scheduleItems,setScheduleItems] = useState([
        { week_day: 0, from: '', to: ''},
    ])
    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: '',
                to: '0'
            }
        ]);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();
  
        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(()=>{
            alert('Cadastro realizado com sucesso')
        }).catch((err)=>{
            console.log(err)
            alert('erro no cadastro!')
        })

    }
    function setScheduleItemsValue(position:number,field:string,value:string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem , index)=>{
            if(index === position){
                return { ...scheduleItem, [field]:value }
            }
            return scheduleItem
        })
        setScheduleItems(updatedScheduleItems);
    }
    return(
        <div id="page-teacher-form" className="container">
        <PageHeader
            title="Que Incrivel que voce quer dar aulas"
            description="O primeiro passo é preencher o formulário de inscrição"
        />
        <main>
            <form onSubmit={handleCreateClass} >
               <fieldset>
                    <legend>Seus dados</legend>
                    <Input  name="nome" label="Nome Completo" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    <Input  name="avatar" label="Avatar" value={avatar} onChange={(e)=>{setAvatar(e.target.value)}}/>
                    <Input  name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}/>
                    <Textarea name="bio" label="Biografia" value={bio} onChange={(e)=>{setBio(e.target.value)}}/>
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select
                        name="materia"
                        label="Matéria"
                        value={subject}
                        onChange={(e)=>{setSubject(e.target.value)}}
                        options={[
                            { value: 'Artes' , label: 'Artes' },
                            { value: 'Biologia' , label: 'Biologia' },
                            { value: 'Matematica' , label: 'Matematíca' },
                            { value: 'Quimica' , label: 'Quimica' },
                            { value: 'Portugues' , label: 'Português' }
                        ]} />
                    <Input  name="cost" label="costo da sua hora por aula" value={cost} onChange={(e)=>{setcost(e.target.value)}} />
                </fieldset>
                <fieldset>
                        <legend>Horários disponiveis
                            <button  type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        {scheduleItems.map((scheduleItem,index ) =>{
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange= {e => setScheduleItemsValue(index,'week_day',e.target.value)}
                                        options={[
                                            { value: '0' , label: 'Domingo' },
                                            { value: '1' , label: 'Segunda-Feira' },
                                            { value: '2' , label: 'Terça-Feira' },
                                            { value: '3' , label: 'Quarta-Feira' },
                                            { value: '4' , label: 'Quinta-Feira' },
                                            { value: '5' , label: 'Sexta-Feira' },
                                            { value: '6' , label: 'Sábado' },

                                        ]} />
                                    <Input name="from" label="Das" type="time" value={scheduleItem.from}onChange= {e => setScheduleItemsValue(index,'from',e.target.value)} />
                                    <Input name="to" label="Até" type="time"value={scheduleItem.to}
                                    onChange= {e => setScheduleItemsValue(index,'to',e.target.value)} />
                                </div>
                            )
                        })}
                </fieldset>
            <footer>

                <p>
                    <img src={warninIcon} alt="Aviso importante"/>
                    Importante! <br />
                    Preencha todos os dados
                </p>
                <button type="submit">Salvar Cadastro</button>
            </footer>
        </form>

        </main>

    </div>
    )
}

export default TeacherForm
