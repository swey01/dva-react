import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../../components/MainLayout/MainLayout'
import SetUpComponents from '../../../components/System/system/setUp'

function SetUp({ location }) {
    return (
        <MainLayout location={location}>
            <div>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to='/system/system'>角色权限管理</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>设置权限</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <SetUpComponents />
            </div>
        </MainLayout>
    )
}

export default connect()(SetUp)
