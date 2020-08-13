import axios from "axios";
import {
    GET_ERRORS,
    GET_PROJECT_TASKS,
    DELETE_PROJECT_TASK,
    GET_PROJECT_TASK
} from "./types";

const domain_url = "https://project-tracking-api-app.herokuapp.com"

export const addProjectTask = (project_task, history) => async dispatch => {
    try {
        await axios.post(`${domain_url}/api/board/task`, project_task);
        history.push("/");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getBacklog = () => async dispatch => {
    const res = await axios.get(`${domain_url}/api/board/all`);
    dispatch({
        type: GET_PROJECT_TASKS,
        payload: res.data
    });
};

export const deleteProjectTask = pt_id => async dispatch => {
    if (
        window.confirm(
            `You are deleting project task ${pt_id}, this action cannot be undone`
        )
    ) {
        await axios.delete(`${domain_url}/api/board/${pt_id}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id
        });
    }
};

export const getProjectTask = (pt_id, history) => async dispatch => {
    try {
        const res = await axios.get(`${domain_url}/api/board/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch (error) {
        history.push("/");
    }
};