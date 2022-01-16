import axios from "axios";
import {
    GET_ERRORS,
    GET_PROJECT_TASKS,
    DELETE_PROJECT_TASK,
    GET_PROJECT_TASK
} from "./types";

const domain_url = "https://project-tracker-api-app.herokuapp.com"

export const addProjectTask = (projectTask, history) => async dispatch => {
    console.log("Project task in addProjectTask Action");
    console.log(projectTask);
    try {
        await axios.post(`${domain_url}/project/${projectTask.projectId}/task`, projectTask);
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
    const res = await axios.get(`${domain_url}/project/`);
    console.log(res);
    dispatch({
        type: GET_PROJECT_TASKS,
        payload: res.data.data
    });
};

export const deleteProjectTask = (projectTaskId, projectId) => async dispatch => {
    if (
        window.confirm(
            `You are deleting project task ${projectTaskId}, this action cannot be undone`
        )
    ) {
        await axios.delete(`${domain_url}/project/${projectId}/task/${projectTaskId}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: projectTaskId
        });
    }
};

export const getProjectTask = (projectTaskId, projectId, history) => async dispatch => {
    try {
        const res = await axios.get(`${domain_url}/project/${projectId}/task/${projectTaskId}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch (error) {
        history.push("/");
    }
};
