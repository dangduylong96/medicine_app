function apiGetNewProduct(url) {
    return fetch(url+'/newProduct')
    .then(res => res.json())
    .then(resjson => {
        return resjson;
    })
    .catch((error) => {
        return '';
    });
}
export default apiGetNewProduct;