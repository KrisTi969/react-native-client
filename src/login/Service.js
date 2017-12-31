import {httpApiUrl, wsApiUrl} from '../core/Api';


export function login(user, pass) {
    return fetch(`${httpApiUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user,
            password: pass
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}
