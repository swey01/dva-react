import request from '../utils/request'

export function create(values) {
    return request(`/resources-service/v0.1/ichnography`, {
        method: 'POST',
        data: JSON.stringify(values)
    })
}

export function remove({ id }) {
    return request(`/resources-service/v0.1/ichnography/${id}`, {
        method: 'DELETE'
    })
}

export function modify({ id }) {
    return request(`/resources-service/v0.1/ichnography/${id}`, {
        method: 'PUT'
    })
}

export function fetch({ id }) {
    return request(`/resources-service/v0.1/ichnography/${id}`)
}

export function list({ page, pageSize }) {
    return request(`/resources-service/v0.1/ichnography?page=${Number(page) - 1}&size=${pageSize}`)
}
