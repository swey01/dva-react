import axios from 'axios'
import storage from './storage'
import { url } from '../config'
axios.defaults.withCredentials = true
axios.defaults.baseURL = url
axios.defaults.validateStatus = false

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    const error = new Error(response.statusText)
    error.response = response
    throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
    // if (/\/auth\/token/g.test(url) || /\/messages\/sms/g.test(url) || /\/auth\/token\/\w.*/g.test(url)) {
    //     if (/\/auth\/token\/\w.*/g.test(url) && options.method === 'DELETE') {
    //         axios.defaults.headers.common['Authorization'] = `MAC id="${storage.get('Authorization')}"`
    //     }
    // } else {
    //     axios.defaults.headers.common['Authorization'] = storage.get('Authorization')
    // }
    delete axios.defaults.headers.common.Authorization
    if (/uaa-service/g.test(url)) {
        if (!(/\/auth\/token$/g.test(url) && options.method === 'POST')) {
            axios.defaults.headers.common['Authorization'] = `MAC id="${storage.get('Authorization')}"`
        }
    } else {
        axios.defaults.headers.common['Authorization'] = storage.get('Authorization')
    }
    const response = await axios(url, options).then(checkStatus)
    return response
}
