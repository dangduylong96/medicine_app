function apiUpdateDetailUser(url,data) {
    return fetch(url+'/UpdateDetailFromToken',{
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(resjson=>{
        return resjson.token;
    })
}
export default apiUpdateDetailUser;