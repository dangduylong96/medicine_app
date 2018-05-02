const url='http://10.0.3.2:90/medicine_server';

function apiGetProduct(token,skip,take) {
    return fetch(url+'/allProduct?token='+token+'&skip='+skip+'&take='+take)
    .then(res => res.json())
    .then(resjson => {
        return resjson.product;
    })
    .catch((error) => {
        return '';
    });
}
export default apiGetProduct;