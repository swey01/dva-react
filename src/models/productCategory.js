import * as ProductCategoryService from '../services/productCategory'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {
    namespace: 'productCategory',
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
            const { data } = yield call(ProductCategoryService.create, payload)
            if (data.name) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success('提交成功', 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/productCategory`))
            } else {
                // message.success('修改失败，检查验证码是否正确')
            }
        },
        *remove({ payload: id }, { call, put }) {
            yield call(ProductCategoryService.remove, id)
            yield put({ type: 'reload' })
        },
        *modify({ payload }, { call, put }) {
            let { data } = yield call(ProductCategoryService.modify, payload)
            if (data.name) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success('提交成功', 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/productCategory`))
            }
        },
        *fetch({ payload: { id } }, { call, put }) {
            const { data } = yield call(ProductCategoryService.fetch, id)
            yield put({
                type: 'save',
                payload: {
                    data
                }
            })
        },
        *list({ payload: { page = 1, pageSize = 10 } }, { call, put }) {
            const { data } = yield call(ProductCategoryService.list, { page, pageSize })
            if (data && data.total) {
                yield put({
                    type: 'save',
                    payload: {
                        list: data.items,
                        total: data.total,
                        page: data.page + 1
                    }
                })
            } else if (data.total === 0) {
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
        *reload({ payload }, { put, select }) {
            let page = yield select(state => state.productCategory.page)
            yield put({
                type: 'save',
                payload
            })
            yield put({ type: 'list', payload: { ...page, ...payload } })
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
            return history.listen(({ pathname }) => {
                if (pathname === '/productCategory') {
                    dispatch({ type: 'list', payload: {} })
                }
            })
        }
    }
}
