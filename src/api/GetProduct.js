function apiGetProduct(url,token,skip,take) {
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