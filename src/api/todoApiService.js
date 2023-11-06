import { apiClient } from './ApiClient';

export const retrieveAllTodoForUsername = ( username ) => apiClient.get(`/users/${ username }/list-todo`);

export const executeBasicAuthentication = ( token ) => apiClient.get(`/basicauth`, {
    headers: {
        Authorization: token
    }
});

export const deleteTodo = (username, id) => apiClient.delete(`/users/${ username }/todo/${ id }`);

export const retrieveOneTodo = (username ,id) => apiClient.get(`/users/${ username }/todo/${ id }`);

export const updateTodo = (username ,id, todo) => apiClient.put(`/users/${ username }/todo/${ id }`, todo);

export const createTodo = (username, todo) => apiClient.post(`/users/${ username }/todo`, todo);