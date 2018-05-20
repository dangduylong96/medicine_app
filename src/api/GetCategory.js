function apiGetCategory(url) {
    return fetch(url+'/getCategory')
    .then(res => res.json())
    .then(resjson => {
        return resjson.data;
    })
    .catch((error) => {
        return '';
    });
}
export default apiGetCategory;