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