import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './toDoSlice';
import { addToDoTaskService, deleteToDoTaskService, updateToDoTaskService } from '../services/todoTask';

const ToDoView = () => {
    const [isUpdate, setIsUpdate] = useState(false)
    const [textval, setTextval] = useState("")
    const [editObj, setEditObj] = useState({})
    const dispatch = useDispatch()
    const selector = useSelector(state => state.task)

    useEffect(() => {
        dispatch(fetchTasks())
    }, [textval])

    const handleTextVal = (e) => {
        let { value } = e.target;
        setTextval(value)
    }

    const handleAddTask = () => {
        const taskObj = { taskName: textval }
        addToDoTaskService(taskObj).then((res) => {
            dispatch(fetchTasks())
        })
        setTextval("")
    }

    const handleDelete = (taskToDel) => {
        console.log(taskToDel);
        if (window.confirm("Do you really want to delete the task?")) {
            deleteToDoTaskService(taskToDel._id.toString())
                .then((res) => {
                    dispatch(fetchTasks())
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    const handleEdit = (task) => {
        setTextval(task.taskName)
        setEditObj(task)
        setIsUpdate(true)
        console.log(task);
    }

    const handleUpdate = () => {
        let taskNewObj = { ...editObj, taskName: textval }
        updateToDoTaskService(taskNewObj)
            .then((res) => {
                dispatch(fetchTasks())
            })
            .catch((err) => {
                console.log(err)
            })
        setIsUpdate(false)
        setTextval("")
    }

    return (
        <>
            <h1> 😎 Todo </h1>
            <div>
                <input
                    type='text'
                    placeholder='Enter the item'
                    value={textval}
                    onChange={handleTextVal}
                />
                {
                    isUpdate ?
                        <button
                            onClick={() => handleUpdate(textval)}
                        >
                            Update
                        </button>
                        :
                        <button onClick={() => handleAddTask()}>+</button>
                }
            </div>
            <div>
                <h2>My Task List</h2>
                <ol>
                    {selector.taskList.map((task) => <li key={task._id}>
                        {task.taskName}
                        <button onClick={() => handleEdit(task)}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(task)}>
                            Delete
                        </button>
                    </li>)}
                </ol>
            </div>
        </>
    )
}

export default ToDoView