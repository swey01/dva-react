import * as OperationServices from '../../services/power'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {
    namespace: 'power',
    state: {
        list: [],
        page: 1,
        total: 0,
        data: {}
    },
    reducers: {
        save(state, { payload: data }) {
            return { ...state, ...data }
        }
    },
    effects: {
        *create({ payload: values }, { call, put }) {
            let { data } = yield call(OperationServices.create, values)
            if (data) {
                yield put(
                    message.success('提交成功', 10, () => {
                        routerRedux.push(`/userBoard`)
                    })
                )
            }
        },
        *remove({ payload: id }, { call, put }) {
            yield call(OperationServices.remove, id)
            yield put({ type: 'reload' })
        },
        *modify({ payload: { values, id } }, { call, put }) {
            let { data } = yield call(OperationServices.modify, { values, id })
            if (data) {
                yield put(
                    message.success('提交成功', 10, () => {
                        routerRedux.push(`/userBoard`)
                    })
                )
            }
        },
        *fetch({ payload: { id } }, { call, put }) {
            const { data } = yield call(OperationServices.fetch, id)
            yield put({
                type: 'save',
                payload: {
                    data
                }
            })
        },
        *list({ payload: { page = 1, pageSize = 10, name } }, { call, put }) {
            const { data } = yield call(OperationServices.list, { page, pageSize, name })
            if (data.total) {
                yield put({
                    type: 'save',
                    payload: {
                        list: data.items,
                        total: data.total,
                        page: data.page + 1
                    }
                })
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/power') {
                    dispatch({ type: 'list', payload: query })
                }
            })
        }
    }
}
