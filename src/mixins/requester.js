import Axios from 'axios';

let serverUrl = window.location.port == 8080 ? "http://localhost:3010" : "";
function postPunch(isDirectionIn, name, project, time) {
    return Axios.post(serverUrl + '/punch', {
        name: name,
        project: project,
        isDirectionIn: isDirectionIn,
        time: time
    });
}

export default {
    methods: {
        postPunchIn(name, project, time) {
            return postPunch(true, name, project, time);
        },
        postPunchOut(name, project, time) {
            return postPunch(false, name, project, time);
        },
        getSessions() {
            return Axios.get(`${serverUrl}/sessions`);
        }
    }
}