function apiGetDetailProduct(url,token,id) {
    return fetch(url+'/getDetailProduct?token='+token+'&id='+id)
    .then(res => res.json())
    .then(resjson => {
        return resjson.data;
    })
    .catch((error) => {
        return '';
    });
}
export default apiGetDetailProduct;