import React, { ChangeEvent } from 'react';
import { TaskType } from './Todolist';



export type PropsTypeMyMap={
    tasks:Array<TaskType>
    removeTask: (idIodo: string,id: string,) => void
    idTodo:string
    changeTaskStatus: (idTodo:string,taskId: string, isDone: boolean) => void
}




const MyMap = ({tasks,removeTask,idTodo,...props}:PropsTypeMyMap) => {

    return (
        <div>
            <ul>
                {
                    tasks.map(t => {
                        const onClickHandler = () =>removeTask(idTodo,t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(idTodo,t.id, e.currentTarget.checked);
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>


        </div>
    );
};

export default MyMap;