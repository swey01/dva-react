import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../../components/MainLayout/MainLayout'
import ChangingComponents from '../../../components/System/system/detail'

function Changing({ location }) {
    return (
        <MainLayout location={location}>
            <div className='page-system'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to='/system/system'>角色权限管理</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>新增/修改</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <ChangingComponents />
            </div>
        </MainLayout>
    )
}

export default connect()(Changing)
