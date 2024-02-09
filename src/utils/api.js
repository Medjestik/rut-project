import { BASE_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getData = ({ teamId }) => {
  return fetch(`${BASE_URL}/teams/${teamId}/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(res => handleResponse(res))
};

export const getTags = () => {
  return fetch(`${BASE_URL}/tags/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(res => handleResponse(res))
};

export const getProjectDetail = ({ projectId }) => {
  return fetch(`${BASE_URL}/projects/${projectId}/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(res => handleResponse(res))
};

export const addProject = ({ teamId, projectId }) => {
  return fetch(`${BASE_URL}/participation/`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ team: teamId, project: projectId })
  })
  .then(res => handleResponse(res));
};

export const addMember = ({ teamId, data }) => {
  return fetch(`${BASE_URL}/teams/${teamId}/members/`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fullname: data.name, group_name: data.group, phone: data.phone, email: data.email })
  })
  .then(res => handleResponse(res));
};
