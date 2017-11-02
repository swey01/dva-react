import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Breadcrumb } from 'antd'
import MainLayout from '../../components/MainLayout/MainLayout'
import NewUsers from '../../components/UserBoard/detail'

function UsersNew({ location, params }) {
    return (
        <MainLayout location={location}>
            <div>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to='/userBoard'>访客管理</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>{params.id ? '编辑' : '新增'}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <NewUsers {...params} />
            </div>
        </MainLayout>
    )
}

export default connect()(UsersNew)
