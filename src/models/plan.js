import * as usersService from '../services/plan'

export default {
    namespace: 'plan',
    state: {
        list: [],
        page: 1,
        total: 0
    },
    reducers: {
        save(state, { payload: data }) {
            return { ...state, ...data }
        }
    },
    effects: {
        *create({ payload: values }, { call, put }) {
            yield call(usersService.create, values)
            yield put({ type: 'reload' })
        },
        *remove({ payload: id }, { call, put }) {
            yield call(usersService.remove, id)
            yield put({ type: 'reload' })
        },
        *modify({ payload: { id } }, { call, put }) {
            yield call(usersService.modify, id)
            yield put({ type: 'reload' })
        },
        *fetch({ payload: { page = 1 } }, { call, put }) {
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
            const page = yield select(state => state.users.page)
            yield put({ type: 'list', payload: { page } })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/plan') {
                    dispatch({ type: 'list', payload: query })
                }
            })
        }
    }
}
