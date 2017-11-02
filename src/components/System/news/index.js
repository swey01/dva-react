import React from 'react'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import { Table, Pagination, Popconfirm, Button } from 'antd'
import '../index.styl'

const NewsCom = ({ dispatch, dataSource, loading, total, current }) => {
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
            title: '配置名称',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: '配置内容',
            dataIndex: 'content',
            key: 'content'
        },
        {
            title: '配置类型',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className='operation'>
                    <Link to='/system/news/detail/12314'>
                        编辑
                    </Link>
                    <Popconfirm title='确定要删除该项吗？' onConfirm={deleteHandler.bind(null, record.id)}>
                        <span className='deleColor'>删除</span>
                    </Popconfirm>
                </span>
            )
        }
    ]

    return (
        <div className='page-authority'>
            <div className='system-add'>
                <Link to='/system/news/detail'>
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

export default connect()(NewsCom)
