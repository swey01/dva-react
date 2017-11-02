import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../../components/MainLayout/MainLayout'
import RecordComponents from '../../../components/System/record'
import RecordSearchComponents from '../../../components/System/record/search'

function Record({ location }) {
    return (
        <MainLayout location={location}>
            <div className='page-system'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>操作记录</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <RecordSearchComponents />
                <RecordComponents />
            </div>
        </MainLayout>
    )
}

export default connect()(Record)
