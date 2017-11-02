import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../../components/MainLayout/MainLayout'
import PowerComponents from '../../../components/System/power/detail'

function PowerNew({ location, params }) {
    return (
        <MainLayout location={location}>
            <div className='page-system'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to='/system/power'>用户管理</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>新增/修改</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <PowerComponents {...params} />
            </div>
        </MainLayout>
    )
}

export default connect()(PowerNew)
