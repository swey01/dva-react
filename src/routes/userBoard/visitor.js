import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../components/MainLayout/MainLayout'
import VisitorList from '../../components/UserBoard/visitor'

function Users({ location }) {
    return (
        <MainLayout location={location}>
            <div className='page-userBoard'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to='userBoard/'>访客列表</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>访客到访次数列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <VisitorList />
            </div>
        </MainLayout>
    )
}

export default Users
