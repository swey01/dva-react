import request from '../utils/request'
import storage from '../utils/storage'

export function login(values) {
    return request('/uaa-service/v0.1/auth/tokens', {
        method: 'POST',
        data: values
    }).then(res => {
        storage.set('Authorization', res.data.accessToken)
        return res
    })
}

export function logout(token) {
    return request(`/uaa-service/v0.1/auth/tokens/${token}`, {
        method: 'DELETE'
    }).then(res => {
        storage.remove('Authorization')
        return res
    })
}

export function reset(values) {
    return request('/uaa-service/v0.1/users/password', {
        method: 'PUT',
        data: values
    })
}

export function sendMsg(values) {
    return request('/biz-message/v0.1/messages/sms/single', {
        method: 'POST',
        data: values
    })
}

export function checkMsg(values) {
    return request('/biz-message/v0.1/messages/sms/verifies', {
        method: 'POST',
        data: values
    })
}
