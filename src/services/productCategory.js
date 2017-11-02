import request from '../utils/request'

export function create(data) {
    return request(`/resources-service/v0.1/product_categories`, {
        method: 'POST',
        data
    })
}

export function remove(id) {
    return request(`/resources-service/v0.1/product_categories/${id}`, {
        method: 'DELETE'
    })
}

export function modify(data) {
    return request(`/resources-service/v0.1/product_categories/${data.id}`, {
        method: 'PUT',
        data
    })
}

export function fetch(id) {
    return request(`/resources-service/v0.1/product_categories/${id}`)
}

export function list({ page, pageSize }) {
    return request(`/resources-service/v0.1/product_categories?page=${Number(page) - 1}&size=${pageSize}`)
}
