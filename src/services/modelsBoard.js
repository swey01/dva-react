import request from '../utils/request'

export function create(values) {
    return request(`/operation-service/v0.1/notices/`, {
        method: 'POST',
        data: values
    })
}

export function remove(id) {
    return request(`/operation-service/v0.1/notices/${id}`, {
        method: 'DELETE'
    })
}

export function modify(values) {
    return request(`/operation-service/v0.1/notices/${values.id}`, {
        method: 'PUT',
        data: values
    })
}

export function fetch(id) {
    return request(`/operation-service/v0.1/notices/${id}`)
}

export function list({ page, pageSize }) {
    return request(`/operation-service/v0.1/notices?page=${Number(page) - 1}&size=${pageSize}`)
}
