export * from './constant';


export const getFormBody = (param)=> {
    let formBody = [];
    for(let property in param) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(param[property]);
        formBody.push(`${encodedKey}=${encodedValue}`);
    }
    return formBody.join('&');
    
}