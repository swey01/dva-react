import * as usersService from '../services/modelsBoard'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {
    namespace: 'modelsBoard',
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
        *create({ payload }, { call, put }) {
            const { data: { id } } = yield call(usersService.create, payload)
            if (id) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success('提交成功', 3, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/modelsBoard`))
            } else {
                message.success('创建失败')
            }
        },
        *remove({ payload: id }, { call, put }) {
            yield call(usersService.remove, id)
            yield put({ type: 'reload' })
        },
        *modify({ payload }, { call, put }) {
            const { data: { id } } = yield call(usersService.modify, payload)
            if (id) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success('提交成功', 3, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/modelsBoard`))
            } else {
                message.success('创建失败')
            }
        },
        *fetch({ payload: id }, { call, put }) {
            const data = yield call(usersService.fetch, id)
            yield put({
                type: 'save',
                payload: {
                    data: data.data
                }
            })
        },
        *list({ payload: { page = 1, pageSize = 10 } }, { call, put }) {
            const { data } = yield call(usersService.list, { page, pageSize })
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
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.modelsBoard.page)
            yield put({ type: 'list', payload: { page } })
        },
        *reset(action, { put }) {
            yield put({
                type: 'save',
                payload: {
                    list: [],
                    page: 1,
                    total: 0,
                    data: {}
                }
            })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/modelsBoard') {
                    dispatch({ type: 'list', payload: query })
                }
            })
        }
    }
}
