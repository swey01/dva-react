import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../../components/MainLayout/MainLayout'
import SystemComponents from '../../../components/System/system'

function System({ location }) {
    const systemListProps = {
        total: 3,
        current: 1,
        loading: false,
        dataSource: [
            {
                id: '1',
                ascription: ' ',
                role: '超级管理员',
                states: '启用'
            },
            {
                id: '2',
                ascription: ' ',
                role: '管理员',
                states: '启用'
            },
            {
                id: '3',
                ascription: ' ',
                role: ' ',
                states: '停用'
            },
            {
                id: '41',
                ascription: ' ',
                role: ' ',
                states: '停用'
            }
        ]
    }

    return (
        <MainLayout location={location}>
            <div className='page-system'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>角色权限管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <SystemComponents {...systemListProps} />
            </div>
        </MainLayout>
    )
}

export default connect()(System)
