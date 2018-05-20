function apiSearchProduct(url,token,keyword,category) {
    return fetch(url+'/searchProduct?token='+token+'&keyword='+keyword+'&cate='+category)
    .then(res => res.json())
    .then(resjson => {
        return resjson.data;
    })
    .catch((error) => {
        return '';
    });
}
export default apiSearchProduct;