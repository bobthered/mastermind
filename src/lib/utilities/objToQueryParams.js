export default obj => Object.keys(obj).reduce((array, key) => [...array, `${key}=${obj[key]}`], []).join('&')