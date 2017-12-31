import {httpApiUrl, wsApiUrl} from '../core/Api';


export function newEntry(na, ser, epi) {
    return fetch(`${httpApiUrl}/addEpisode`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: na,
            series: ser,
            episode: epi
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