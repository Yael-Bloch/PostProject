import React, { useEffect, useState } from 'react';
import '../StyleSheet/Todos.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';  // ייבוא של Link ליצירת קישורים

const Todo = ({ id, title, completed, userId, allTodos ,setAllTodos ,todosToShow,setTodosToShow}) => {
    const navigate = useNavigate();
    const [Task, setTask] = useState({
        userId: userId,
        id: id,
        title: title,
        completed: completed
    });

    const handleCheckboxChange = () => {
        const updatedTask = {
            ...Task,
            completed: !Task.completed,
        };
    
        // עדכון ה-state
        setTask(updatedTask);
    
        // עדכון המערך המקומי
        const todoIndex = allTodos.findIndex((todo) => todo.id === Task.id);
        if (todoIndex === -1) {
            console.error('Todo not found for update.');
            return;
        }
    
        const updatedTodos = [...allTodos];
        updatedTodos[todoIndex] = updatedTask;
        setAllTodos(updatedTodos);
    
        // קריאה לשרת עם הנתונים המעודכנים
        fetch(`http://localhost:3000/todos/${updatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        })
            .then(() => {
                console.log('Success:', updatedTask);
            })
            .catch((error) => {
                console.error('Failed to update todo on server:', error);
            });
    
        console.log("Checked Task number:", id, updatedTask.completed);
    };


    // const handleCheckboxChange = () => {
    //     const updatedTask={...Task
    //         ,completed:!Task.completed};
    //         console.log(updatedTask);
    //     setTask((prevTask) => ({
    //         ...prevTask,
    //         completed: !prevTask.completed, // שינוי ערך `completed`
    //     }));

    //     const todoIndex = allTodos.findIndex((todo) => todo.id === Task.id);
    //     if (todoIndex === -1) {
    //         setError('Photo not found for update.');
    //         return;
    //     }

    //     // עדכון המערך המקומי
    //     const updatedTodos = [...allTodos];
    //     updatedTodos[todoIndex] = Task;
    //     setAllTodos(updatedTodos);
    //     setTodosToShow()
    //     fetch(`http://localhost:3000/todos/${Task.id}`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(Task),
    //     }).then((body) =>
    //         console.log("succsses",Task)
    //     ).catch(() => {
    //         setError('Failed to update photo on server.');
    //     });





    //     console.log("Checked Task number:", id, !Task.completed);
    // };
    return (
        <div key={id} className="todo-card">
            <input onChange={handleCheckboxChange} className='todo-completed' type="checkBox" checked={Task.completed} />
            <p className="todo-id">Album number {Task.id}</p>
            <p style={{ cursor: "pointer" }} className="todo-title">{Task.title}</p>
        </div>
    )
}

export default Todo;