import axios from "axios"
import { toDoTaskURL } from "../share/constant"

export const toDoTask = () => {
    return axios.get(toDoTaskURL)
}

export const addToDoTaskService = (data) => {
    console.log(data)

    return axios.post(`${toDoTaskURL}`, data)
}

export const deleteToDoTaskService = (id) => {
    return axios.delete(`${toDoTaskURL}/${id}`)
}

export const updateToDoTaskService = (data) => {
    console.log(data);
    return axios.put(`${toDoTaskURL}/${data._id.toString()}`, data)
    // return axios.put(`${toDoTaskURL}/${data.id}`, data)
}