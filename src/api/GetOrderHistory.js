function apiGetOrderHistory(url,token) {
    return fetch(url+'/getOrderHistory?token='+token)
    .then(res => res.json())
    .then(resjson => {
        return resjson.data;
    })
    .catch((error) => {
        return '';
    });
}
export default apiGetOrderHistory;