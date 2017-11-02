import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Table, Pagination, Breadcrumb } from 'antd'
// import { Table, Pagination, Popconfirm, Button, Breadcrumb } from 'antd'

function Plan({ dispatch, list: dataSource, loading, total, page: current }) {
    // function deleteHandler(id) {
    //     dispatch({
    //         type: 'plan/remove',
    //         payload: id
    //     })
    // }

    function pageChangeHandler(page) {
        dispatch({
            type: 'plan/list',
            payload: { page }
        })
    }

    // function editHandler(id, values) {
    //     dispatch({
    //         type: 'plan/patch',
    //         payload: { id, values }
    //     })
    // }

    const columns = [
        {
            title: '编号',
            dataIndex: 'no',
            key: 'no',
            render: (text, record, index) => index + 1
        },
        {
            title: '公司名称',
            dataIndex: 'company',
            key: 'company'
        },
        {
            title: '区域类型',
            dataIndex: 'area',
            key: 'area'
        },
        {
            title: '图片链接',
            dataIndex: 'picUrl',
            key: 'picUrl'
        }
        // ,{
        //     title: '操作',
        //     key: 'operation',
        //     render: (text, record) => {
        //         let url = `/plan/detail/${record.id}`
        //         return (
        //             <span className='operation'>
        //                 <Link to={url}>编辑</Link>
        //                 <Popconfirm title='Confirm to delete?' onConfirm={deleteHandler.bind(null, record.id)}>
        //                     <Link className='deleColor'>删除</Link>
        //                 </Popconfirm>
        //             </span>
        //         )
        //     }
        // }
    ]

    return (
        <div className='page-plan'>
            <div className='ui-breadcrumb'>
                <Breadcrumb separator='&gt;'>
                    <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>区域平面图管理</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {/* <div className='btnBar'>
                <Button type='primary'><Link to='/plan/detail/'>新增</Link></Button>
            </div> */}
            <div className='ui-table'>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey={record => record.id}
                    pagination={false}
                />
                <Pagination
                    className='ant-table-pagination'
                    total={total}
                    current={current}
                    pageSize={10}
                    onChange={pageChangeHandler}
                />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { list, total, page } = state.plan
    return {
        loading: state.loading.models.plan,
        list,
        total,
        page
    }
}

export default connect(mapStateToProps)(Plan)
