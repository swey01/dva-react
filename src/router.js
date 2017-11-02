import React from 'react'
import { Router, Switch, Route } from 'dva/router'
import dynamic from 'dva/dynamic'
// import storage from './utils/storage'
import FormatMessage from './components/MainLayout/formatMessage'

function RouterConfig({ history, app }) {
    const error = dynamic({
        app,
        component: () => import('./routes/error')
    })
    // let accessToken = storage.get('Authorization')

    const routes = [
        {
            path: '/',
            component: () => import('./routes/home/')
        },
        /* 登录 */
        {
            path: '/login',
            models: () => [import('./models/login')],
            component: () => import('./routes/login/')
        },
        {
            path: '/login/forget',
            models: () => [import('./models/login')],
            component: () => import('./routes/login/forget')
        },
        {
            path: '/login/resetting',
            models: () => [import('./models/login')],
            component: () => import('./routes/login/resetting')
        },
        /* 产品管理 */
        {
            path: '/product',
            models: () => [import('./models/product')],
            component: () => import('./routes/product/')
        },
        {
            path: '/product/detail',
            models: () => [import('./models/product')],
            component: () => import('./routes/product/detail')
        },
        {
            path: '/product/detail/:id',
            models: () => [import('./models/product')],
            component: () => import('./routes/product/detail')
        },
        {
            path: '/product/detail/:id/:copy',
            models: () => [import('./models/product')],
            component: () => import('./routes/product/detail')
        },
        /* 产品分类 */
        {
            path: '/productCategory',
            models: () => [import('./models/productCategory')],
            component: () => import('./routes/productCategory/')
        },
        {
            path: '/productCategory/detail',
            models: () => [import('./models/productCategory')],
            component: () => import('./routes/productCategory/detail')
        },
        {
            path: '/productCategory/detail/:id',
            models: () => [import('./models/productCategory')],
            component: () => import('./routes/productCategory/detail')
        },
        /* 模块管理 */
        {
            path: '/modelsBoard',
            models: () => [import('./models/modelsBoard')],
            component: () => import('./routes/modelsBoard')
        },
        {
            path: '/modelsBoard/detail',
            models: () => [import('./models/modelsBoard')],
            component: () => import('./routes/modelsBoard/detail')
        },
        {
            path: '/modelsBoard/detail/:id',
            models: () => [import('./models/modelsBoard')],
            component: () => import('./routes/modelsBoard/detail')
        },
        /* 平面管理 */
        {
            path: '/plan',
            models: () => [import('./models/plan')],
            component: () => import('./routes/plan')
        },
        {
            path: '/plan/detail/:id',
            models: () => [import('./models/plan')],
            component: () => import('./routes/plan/detail')
        },
        /* 系统管理 */
        /* 用户管理 */
        {
            path: '/system/power',
            models: () => [import('./models/system/power')],
            component: () => import('./routes/system/power')
        },
        {
            path: '/system/power/detail',
            models: () => [import('./models/system/power')],
            component: () => import('./routes/system/power/detail')
        },
        {
            path: '/system/power/detail/:id',
            models: () => [import('./models/system/power')],
            component: () => import('./routes/system/power/detail')
        },
        /* 操作记录 */
        {
            path: '/system/record',
            models: () => [import('./models/system/record')],
            component: () => import('./routes/system/record')
        },
        /* 访客管理 */
        {
            path: '/userBoard',
            models: () => [import('./models/userBoard')],
            component: () => import('./routes/userBoard')
        },
        {
            path: '/userBoard/detail/:id',
            models: () => [import('./models/userBoard')],
            component: () => import('./routes/userBoard/detail')
        },
        {
            path: '/userBoard/detail',
            models: () => [import('./models/userBoard')],
            component: () => import('./routes/userBoard/detail')
        },
        {
            path: '/userBoard/visitor',
            models: () => [import('./models/userBoard')],
            component: () => import('./routes/userBoard/visitor')
        }
    ]

    return (
        <div>
            <FormatMessage />
            <Router history={history}>
                <Switch>
                    {/* <Route path='/modelsBoard/detail(/:id)' component={modelsBoardDetail} /> */}
                    {/* <Route exact path='/' render={() => (<Redirect to='/home' />)} /> */}
                    {
                        routes.map(({ path, exact, ...dynamics }, key) => (
                            <Route key={key}
                                exact
                                path={path}
                                component={
                                    dynamic({
                                        app,
                                        ...dynamics
                                    })
                                }
                            />
                        ))
                    }
                    <Route component={error} />
                </Switch>
            </Router>
        </div>
    )
}

export default RouterConfig
