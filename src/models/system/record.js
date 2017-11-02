import * as OperationServices from '../../services/record'

export default {
    namespace: 'record',
    state: {
        list: [],
        page: 1,
        total: 0,
        operationBegintime: '',
        operationEndtime: '',
        userAccount: ''
    },
    reducers: {
        save(state, { payload: data }) {
            return { ...state, ...data }
        }
    },
    effects: {
        *list({ payload: { page = 1, pageSize = 10, operationBegintime, operationEndtime, userAccount } }, { call, put }) {
            const { data } = yield call(OperationServices.list, { page, pageSize, operationBegintime, operationEndtime, userAccount })
            if (data.total) {
                yield put({
                    type: 'save',
                    payload: {
                        list: data.items,
                        total: data.total,
                        page: data.page + 1
                    }
                })
            } else {
                yield put({ type: 'reset' })
            }
        },
        *reload({ payload }, { select, put }) {
            const state = yield select(state => state.record)
            if (state.operationBegintime) {
                payload.operationBegintime = state.operationBegintime
            }
            if (state.operationEndtime) {
                payload.operationEndtime = state.operationEndtime
            }
            if (state.userAccount) {
                payload.userAccount = state.userAccount
            }
            yield put({ type: 'list', payload })
        },
        *reset(action, { put }) {
            yield put({
                type: 'save',
                payload: {
                    list: [],
                    page: 1,
                    total: 0
                }
            })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/record') {
                    dispatch({ type: 'list', payload: query })
                }
            })
        }
    }
}
