import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../components/MainLayout/MainLayout'
import ModelsBoardComponents from '../../components/ModelsBoard/list'

function ModelsBoard({ location }) {
    return (
        <MainLayout location={location}>
            <div className='page-Models'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>模块管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <ModelsBoardComponents />
            </div>
        </MainLayout>
    )
}

export default connect()(ModelsBoard)
