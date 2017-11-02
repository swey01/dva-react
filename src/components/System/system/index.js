import React from 'react'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import { Table, Pagination, Popconfirm, Button } from 'antd'
import '../index.styl'

const SystemCom = ({ dispatch, dataSource, loading, total, current }) => {
    function deleteHandler(id) {
        dispatch({
            type: 'plan/remove',
            payload: id
        })
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/plan',
            query: { page }
        }))
    }

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id'
            // render: text => <a href=''>{text}</a>
        },
        {
            title: '归属系统',
            dataIndex: 'ascription',
            key: 'ascription'
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: '状态',
            dataIndex: 'states',
            key: 'states'
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className='operation'>
                    <Link to='/system/system/detail/15547'>
                        编辑
                    </Link>
                    <Popconfirm title='确定要删除该项吗？' onConfirm={deleteHandler.bind(null, record.id)}>
                        <a className='deleColor'>删除</a>
                    </Popconfirm>
                    <Link to='/system/system/setUp'>
                        设置权限
                    </Link>
                </span>
            )
        }
    ]

    return (
        <div className='page-authority'>
            <div className='system-add'>
                <Link to='/system/system/detail'>
                    <Button type='primary'>新增</Button>
                </Link>
            </div>
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

export default connect()(SystemCom)
