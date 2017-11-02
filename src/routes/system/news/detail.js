import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../../components/MainLayout/MainLayout'
import NewsReviseComponents from '../../../components/System/news/detail'

function NewsRevise({ location }) {
    return (
        <MainLayout location={location}>
            <div className='page-system'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to='/system/news'>消息配置</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>新增/修改</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <NewsReviseComponents />
            </div>
        </MainLayout>
    )
}

export default connect()(NewsRevise)
