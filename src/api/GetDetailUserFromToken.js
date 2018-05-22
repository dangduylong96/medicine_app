function apiGetDetailUser(url,token) {
    return fetch(url+'/getDetailFromToken?token='+token)
    .then(res => res.json())
    .then(resjson => {
        return resjson.data;
    })
    .catch((error) => {
        return '';
    });
}
export default apiGetDetailUser;