import { routerRedux } from 'dva/router'
import { message } from 'antd'
import * as loginService from '../services/login'
import storage from '../utils/storage'

export default {
    namespace: 'login',
    state: {
        accessToken: '',
        algorithm: '',
        expiresAt: '',
        refreshToken: '',
        secret: '',
        serverTime: '',
        isClick: false,
        textStatus: '发送验证'
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
        status(state, payload) {
            if (payload.time > 0) {
                state.textStatus = `${payload.time}s`
                state.isClick = true
            } else {
                state.textStatus = '重新发送'
                state.isClick = false
            }
            return { ...state, ...payload }
        }
    },
    effects: {
        *auth({ payload }, { call, put }) {
            const { data } = yield call(loginService.login, payload)
            yield put({
                type: 'save',
                payload: data
            })
            yield put(routerRedux.push(`/product`))
        },
        *logout({ payload }, { call, put }) {
            const { data } = yield call(loginService.logout, storage.get('Authorization'))
            yield put({
                type: 'save',
                payload: data
            })
        },
        *reset({ payload }, { call, put }) {
            const { data: { state } } = yield call(loginService.reset, payload)
            if (state === '0') {
                let promise = () => new Promise((resolve, reject) => {
                    message.success('提交成功', 3, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/login`))
            } else {
                message.success('修改失败，检查验证码是否正确')
            }
        },
        *send({ payload }, { call, put }) {
            let { time } = payload
            if (time === 60) {
                const { data: { code } } = yield call(loginService.sendMsg, payload)
                if (code === 0) {
                    message.success('发送成功，稍后请查看您的手机短信')
                }
                if (code === 22) {
                    message.error('验证码短信1小时内同一手机号发送次数不能超过3次')
                }
            }
            yield put({ type: 'status', time })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/login') {
                    if (storage.get('Authorization')) {
                        dispatch({ type: 'logout' })
                        storage.remove('Authorization')
                    }
                }
            })
        }
    }
}
