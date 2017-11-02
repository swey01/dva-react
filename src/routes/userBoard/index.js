import React from 'react'
import { Button, Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../components/MainLayout/MainLayout'
import UsersSearch from '../../components/UserBoard/search'
import UsersList from '../../components/UserBoard/list'
// import Uploads from '../../components/Uploads'

function Users({ location }) {
    return (
        <MainLayout location={location}>
            <div className='page-userBoard'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>访客列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <UsersSearch />
                <div className='ui-btnBar'>
                    <Link to='/userBoard/detail'><Button type='primary'>新增</Button></Link>
                    {/* 二期功能
                    <Uploads /> */}
                </div>
                <UsersList />
            </div>
        </MainLayout>
    )
}

export default Users
