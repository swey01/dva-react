import request from '../utils/request'

export function create(values) {
    return request(`/uaa-service/v0.1/user`, {
        method: 'POST',
        body: JSON.stringify(values)
    })
}

export function remove({ id }) {
    return request(`/uaa-service/v0.1/user/${id}`, {
        method: 'DELETE'
    })
}

export function modify({ values, id }) {
    return request(`/uaa-service/v0.1/user/${id}`, {
        method: 'PUT',
        data: values
    })
}

export function fetch({ id }) {
    return request(`/uaa-service/v0.1/user/${id}`)
}

export function list({ page, pageSize, name }) {
    return request(`/uaa-service/v0.1/users?page=${Number(page) - 1}&size=${pageSize}`)
}
