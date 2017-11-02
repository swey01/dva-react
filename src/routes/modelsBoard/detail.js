import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../components/MainLayout/MainLayout'
import ModelsNewComponents from '../../components/ModelsBoard/detail'

function modelsNew({ location, params }) {
    return (
        <MainLayout location={location}>
            <div className='page-modelsNew'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to='/modelsBoard'>模块管理</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>{params.id ? '编辑' : '新增'}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <ModelsNewComponents {...params} />
            </div>
        </MainLayout>
    )
}

export default connect()(modelsNew)
