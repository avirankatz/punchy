import Axios from 'axios';

let serverUrl = window.location.port == 8080 ? "http://localhost:3020" : "";
function postPunch(isDirectionIn, username, project, time) {
    return Axios.post(serverUrl + '/punch', {
        username: username,
        project: project,
        isDirectionIn: isDirectionIn,
        time: time
    });
}

export default {
    methods: {
        postPunchIn(username, project, time) {
            return postPunch(true, username, project, time);
        },
        postPunchOut(username, project, time) {
            return postPunch(false, username, project, time);
        },
        getSessions() {
            return Axios.get(`${serverUrl}/sessions`);
        },
        getUsers() {
            return Axios.get(serverUrl + '/users');
        },
        getUsersAndProjects() {
            return Axios.get(`${serverUrl}/users-and-projects`);
        },
        postUser(user) {
            return Axios.post(serverUrl + '/user', user);
        },
        postProject(project) {
            return Axios.post(serverUrl + '/project', project);
        },
        postRemoveProject(project) {
            return Axios.post(serverUrl + '/remove-project', { name: project });
        },
        getActiveSessionForUser(username) {
            return Axios.get(serverUrl + '/active-session', { params: { username: username } });
        }
    },
}