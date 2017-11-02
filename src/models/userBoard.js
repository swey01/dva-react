import * as userBoardServices from '../services/userBoard'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {
    namespace: 'userBoard',
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
            const { data: { state } } = yield call(userBoardServices.create, payload)
            if (state === '0') {
                let promise = () => new Promise((resolve, reject) => {
                    message.success('提交成功', 3, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/userBoard`))
            } else {
                // message.success('修改失败，检查验证码是否正确')
            }
        },
        *remove({ payload: id }, { call, put }) {
            yield call(userBoardServices.remove, id)
            yield put({ type: 'reload' })
        },
        *modify({ payload: values }, { call, put }) {
            let { data } = yield call(userBoardServices.modify, values)
            if (data) {
                yield put(
                    message.success('提交成功', 10, () => {
                        routerRedux.push(`/userBoard`)
                    })
                )
            }
        },
        *fetch({ payload: { id } }, { call, put }) {
            const { data } = yield call(userBoardServices.fetch, id)
            yield put({
                type: 'save',
                payload: {
                    data
                }
            })
        },
        *list({ payload: { page = 1, pageSize = 10, name, jobTitle, visitBeginTime, visitEndTime } }, { call, put }) {
            const { data } = yield call(userBoardServices.lists, { page, pageSize, name, jobTitle, visitBeginTime, visitEndTime })
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
            const page = yield select(state => state.users.page)
            yield put({ type: 'fetch', payload: { page } })
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
                if (pathname === '/userBoard') {
                    dispatch({ type: 'list', payload: query })
                }
            })
        }
    }
}
