const url='http://10.0.3.2:90';

function apiGetToken() {
    return fetch(url+'/medicine_server/getToken')
    .then(res => res.json())
    .then(resjson => {
        return resjson._token;
    })
    .catch((error) => {
        return '';
    });
}
export default apiGetToken;