import request from '../utils/request'

export function list({ page, pageSize, operationBegintime, operationEndtime, userAccount }) {
    return request(`/operation-service/v0.1/operation-logs?page=${Number(page) - 1}&size=${pageSize}&time_start=${operationBegintime || ''}&time_end=${operationEndtime || ''}&account=${userAccount || ''}`)
}
