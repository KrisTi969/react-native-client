import { httpApiUrl, wsApiUrl } from '../core/Api';

export const loadNotes = () => (dispatch) => {
    dispatch({ type: 'LOAD_STARTED' });
    fetch(`${httpApiUrl}/note`)
        .then(response => response.json()) //responseJson.notes
        .then(responseJson => dispatch({ type: 'LOAD_SUCCEEDED', data: responseJson }))
        .catch(error => dispatch({ type: 'LOAD_FAILED', error }));
};

export const noteReducer = (state = { isLoading: false, notes: null, issue: null }, action) => {
    switch (action.type) {
        case 'LOAD_STARTED':
            return { ...state, isLoading: true, notes: null, issue: null };
        case 'LOAD_SUCCEEDED':
            return { ...state, isLoading: false, notes: action.data.notes };
        case 'LOAD_FAILED':
            return { ...state, isLoading: false, issue: action.error };
        case 'NOTE_ADDED':
            return { ...state, notes: (state.notes || []).concat([action.note]) };
        default:
            return state;
    }
};

export const connectWs = (store) => {
    const ws = new WebSocket(wsApiUrl);
    ws.onopen = () => {};
    ws.onmessage = e => store.dispatch({ type: 'NOTE_ADDED', note: JSON.parse(e.data).note });
    ws.onerror = e => {};
    ws.onclose = e => {};
    return ws;
};

export const disconnectWs = (ws) => {
    ws.close();
};
