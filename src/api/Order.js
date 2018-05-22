function apiOrder(url,data) {
    return fetch(url+'/Order',{
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(resjson=>{
        return resjson;
    })
}
export default apiOrder;