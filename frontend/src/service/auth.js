export const isAuthenticated = async () => {
    if(localStorage.getItem('jwt') === undefined || localStorage.getItem('jwt') === null){
        return false;   
    }
    
    return true;
}

export const saveToken = (token) => {
    localStorage.setItem('jwt', `Bearer `+ token);
}

export const deleteToken = () => {
    localStorage.removeItem('jwt');
}

export const getToken = () => {
    return localStorage.getItem('jwt');
}