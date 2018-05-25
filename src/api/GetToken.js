const url='http://muabanthuoc.000webhostapp.com';

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