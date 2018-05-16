export function saveToken(token){
    return {
        type: 'SAVE_TOKEN',
        token: token
    }
}
export function saveNavigation(route_navigation){
    return {
        type: 'SAVE_NAVIGATION',
        route_navigation: route_navigation
    }
}
export function addCart(item,qty=1){
    data={
        id: item.id,
        name: item.name,
        qty: qty,
        sales: item.sales,
        price: item.price,
        image: item.image
    };
    return {
        type: 'ADD_CART',
        item: data
    }
}
export function changeQtyItemCart(id,qty){
    return {
        type: 'CHANGE_QTY_CART',
        id: id,
        qty: qty
    }
}
export function deleteItemCart(id){
    return {
        type: 'DELETE_ITEM_CART',
        id: id
    }
}