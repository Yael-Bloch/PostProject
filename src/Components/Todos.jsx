import React, { useEffect, useState } from 'react';
import '../StyleSheet/Todos.css'; // מוודא שהקובץ CSS שלך טוען את העיצוב
import Home from '../Components/Home.jsx';
import Filters from '../Components/Filters.jsx';
import Todo from '../Components/Todo.jsx';
const Todos = () => {

    const [allTodos, setAllTodos] = useState([]);
    const [error, setError] = useState('');
    const [todoTitle, setTodoTitle] = useState('');
    const [todosToShow, setTodosToShow] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [isLoading, setIsLoading] = useState(true); // מצב לטעינה
    const [selectedOption, setSelectedOption] = useState('');
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('CurrentUser'));
        setCurrentUser(user);

        fetch(`http://localhost:3000/todos?userId=${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    console.log('Todos found:', data);
                    setAllTodos(data);
                    setTodosToShow(data);
                    localStorage.setItem('AllTodosOfCurrentUser', JSON.stringify(data));
                    localStorage.setItem('TodosToShowOfCurrentUser', JSON.stringify(data));
                } else {
                    setError('No Todos to show');
                }
            })
            .catch(error => {
                console.error('Error fetching Todos:', error);
                setError('Error fetching Todos');
            })
            .finally(() => {
                setIsLoading(false); // סיום מצב הטעינה
            });
    }, []);
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    useEffect(() => {
        if (selectedOption === 'Randomly') {
            setTodosToShow(allTodos);
        } else if (selectedOption === 'Id') {
            setTodosToShow([...allTodos].sort((todo1, todo2) => {
                return Number(todo1.id) - Number(todo2.id);
            }));
        }else if (selectedOption === 'Alphabets'){
            setTodosToShow([...allTodos].sort((todo1, todo2) => {
                return todo1.title.localeCompare(todo2.title);
            }));
        }else{
            setTodosToShow([...allTodos].sort((todo1, todo2) => {return todo2.completed - todo1.completed;
            }));
        };
        
}, [selectedOption]);
const handleAddTodos = () => {
    let nextTodoId;
    let lastTodoId;
    fetch(`http://localhost:3000/todos`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                lastTodoId = Number(data[data.length - 1].id);
                nextTodoId = lastTodoId + 1;
            } else {
                nextTodoId = 1;
            }
        })
        .then(() =>
            fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: Number(currentUser.id),
                    id: String(nextTodoId),
                    title: todoTitle,
                    completed: false
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(`Todo ${todoTitle} added:`, data);
                    setTodosToShow(prev => [...prev, data]);
                    setAllTodos(prev => [...prev, data]);
                })
                .catch(error => {
                    console.error('Error adding Todo:', error);
                    setError('Error adding Todo to the system.');
                })
        )
        .catch(error => console.error('Error fetching API:', error));
    setTodoTitle('');
};

return (
    <div className="todos-page-container">
        <Home />
        <div className='todos-container'>

            <h1 className="todos-title">Your Todos Tasks</h1>
            {isLoading ? ( // אם הטעינה לא הושלמה
                <div>Loading Tasks...</div>
            ) : (

                <div className="sorts-container">
                    <label htmlFor="sort-select">Sorting by:</label>
                    <select id="sorting-select" value={selectedOption} onChange={handleChange}>
                        <option value="Randomly">Randomly</option>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Id">Id</option>
                        <option value="IsDone">IsDone</option>
                    </select>

                </div>

            )}
            <div className="todosAddition">
                <input
                    placeholder="Enter your todos name and click add"
                    type="text"
                    onChange={(e) => setTodoTitle(e.target.value)}
                    value={todoTitle}
                />
                <button type="submit" onClick={handleAddTodos}>
                    Add an Task
                </button>
            </div>
            <div className="todos-list">
                {todosToShow && todosToShow.length > 0 ? (
                    todosToShow.map(todo => (
                        <Todo setTodosToShow={setTodosToShow} todosToShow={todosToShow} allTodos={allTodos} setAllTodos={setAllTodos} key={todo.id} id={todo.id} title={todo.title} userId={todo.userId} completed={todo.completed} />
                    ))
                ) : (
                    <div className="error-message">{error}</div>
                )}
            </div>
        </div>

    </div >
)
}
export default Todos