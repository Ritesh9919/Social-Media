export * from './constant';


export const setItemInLocalStorage = (key, value)=> {
    if(!key || !value) {
        console.error('Can not store in LS');
    }
    const valueToStore = typeof value !== 'string' ? JSON.stringify(value):value;
    localStorage.setItem(key, value);
}


export const getItemFromLocalStorage = (key)=> {
    if(!key) {
        console.error('Can not get value from LS');
    }
    const value = localStorage.getItem(key);
    return value;
}


export const removeItemFromLocalStorage = (key)=> {
    if(!key) {
        console.error('Can not remove value from LS');
    }
    localStorage.removeItem(key);
}

export const getFormBody = (param)=> {
    let formBody = [];
    for(let property in param) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(param[property]);
        formBody.push(`${encodedKey}=${encodedValue}`);
    }
    return formBody.join('&');
    
}