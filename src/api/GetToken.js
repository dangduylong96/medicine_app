const url='http://10.0.3.2:90/medicine_server';

function apiGetToken() {
    return fetch(url+'/getToken')
    .then(res => res.json())
    .then(resjson => {
        return resjson._token;
    })
    .catch((error) => {
        return '';
    });
}
export default apiGetToken;