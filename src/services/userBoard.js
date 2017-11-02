import request from '../utils/request'

export function lists({ page, pageSize, name, jobTitle, visitBeginTime, visitEndTime }) {
    return request(`/uaa-service/v0.1/guests?page=${Number(page) - 1}&size=${pageSize}&name=${name}job_title=${jobTitle}&visit_begin_time=${visitBeginTime}&visit_end_time=${visitEndTime}`, {
        method: 'GET'
    })
}

export function create(values) {
    return request(`/uaa-service/v0.1/guests`, {
        method: 'POST',
        data: values
    })
}

export function remove(id) {
    return request(`/uaa-service/v0.1/guests/${id}`, {
        method: 'DELETE'
    })
}

export function modify(values) {
    return request(`/uaa-service/v0.1/guests/${values.id}`, {
        method: 'PUT'
    })
}

export function fetch(id) {
    return request(`/uaa-service/v0.1/guests/${id}`, {
        method: 'GET'
    })
}
