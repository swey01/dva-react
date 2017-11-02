import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../../components/MainLayout/MainLayout'
import PowerComponents from '../../../components/System/power'

function Power({ location }) {
    const systemListProps = {
        total: 3,
        current: 1,
        loading: false,
        dataSource: [
            {
                id: '1',
                account: '',
                ascription: ' ',
                role: '超级管理员',
                states: '启用'
            },
            {
                id: '2',
                account: '',
                ascription: ' ',
                role: '管理员',
                states: '启用'
            },
            {
                id: '3',
                account: '',
                ascription: ' ',
                role: '系统管理员',
                states: '停用'
            },
            {
                id: '4',
                account: '',
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
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <PowerComponents {...systemListProps} />
            </div>
        </MainLayout>
    )
}

export default connect()(Power)
