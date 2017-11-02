import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../../components/MainLayout/MainLayout'
import PowerComponents from '../../../components/System/news'

function Record({ location }) {
    const RecordListProps = {
        total: 3,
        current: 1,
        loading: false,
        dataSource: [
            {
                id: '1',
                title: ' ',
                content: ' ',
                type: ' '

            },
            {
                id: '2',
                title: ' ',
                content: ' ',
                type: ' '
            },
            {
                id: '3',
                title: ' ',
                content: ' ',
                type: ' '
            },
            {
                id: '4',
                title: ' ',
                content: ' ',
                type: ' '
            }
        ]
    }

    return (
        <MainLayout location={location}>
            <div className='page-system'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>消息配置</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <PowerComponents {...RecordListProps} />
            </div>
        </MainLayout>
    )
}

export default connect()(Record)
