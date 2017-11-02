import React from 'react'
import { connect } from 'dva'
import { Table, Pagination, Popconfirm } from 'antd'
import { routerRedux, Link } from 'dva/router'

function UsersList({ dispatch, loading, total, page: current, list: dataSource }) {
    // dispatch({
    //     type: 'userBoard/list',
    //     payload: dataSource.id
    // })
    function deleteHandler(id) {
        dispatch({
            type: 'userBoard/remove',
            payload: id
        })
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/userBoard/visitor',
            query: { page }
        }))
    }

    const columns = [
        {
            title: '用户姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '身份证号',
            dataIndex: 'iDNumber',
            key: 'iDNumber'
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '企业名称',
            dataIndex: 'company',
            key: 'company'
        },
        {
            title: '职业名称',
            dataIndex: 'jobTitle',
            key: 'jobTitle'
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: (state, record) => {
                if (state === 1) {
                    return '在线'
                } else {
                    return '不在线'
                }
            }
        },
        {
            title: '注册时候',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '活动时间',
            dataIndex: 'updateTime',
            key: 'updateTime'
        },
        {
            title: '操作',
            key: 'Operation',
            render: (text, record) => {
                let url = `/userBoard/detail/` + record.id
                return (
                    <span className='operation'>
                        <Link to={url}>编辑</Link>
                        <Popconfirm title='您确认要删除此条用户信息吗？' onConfirm={deleteHandler.bind(null, record.id)}>
                            <a href='' className='deleColor'>删除</a>
                        </Popconfirm>
                    </span>
                )
            }
        }
    ]

    return (
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
        </div >
    )
}

function mapStateToProps(state) {
    const { list, total, page } = state.userBoard
    return {
        loading: state.loading.models.userBoard,
        list,
        total,
        page
    }
}

export default connect(mapStateToProps)(UsersList)
