import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(idIodo: string,id: string ) {
        setTasks({...tasks,[idIodo]:tasks[idIodo].filter(f=>f.id!==id)})

        /*/!*  let todo=tasks[idIodo]*!/
          let filteredTasks = todo.filter(t => t.id != id);
         /!* tasks[idIodo]=filteredTasks
          setTasks({...tasks});*!/
          setTasks({...tasks,[idIodo]})*/


    }

    function addTask(idIodo: string,title: string,) {
        let task = {id: v1(), title: title, isDone: false}
        setTasks({...tasks,[idIodo]:[task,...tasks[idIodo]]})

        /*   let task = {id: v1(), title: title, isDone: false};
           let newTasks = [task, ...tasks];
           setTasks(newTasks);*/

    }

    function changeStatus( idTodo:string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[idTodo]:tasks[idTodo].map(m=>m.id===taskId ?{...m,isDone:isDone}:m)})

        /*  let task = tasks.find(t => t.id === taskId);
          if (task) {
              task.isDone = isDone;
          }

          setTasks([...tasks]);*/
    }


    function changeFilter(idTodo:string,value: FilterValuesType,) {
        setTodolists(todolists.map((m)=>m.id===idTodo?{...m,filter:value}:m))



    }


    return (
        <div className="App">

            {todolists.map((m) => {
                let tasksForTodolist = tasks[m.id];
                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={m.id}
                        idTodo={m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={m.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
