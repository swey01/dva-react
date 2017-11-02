import React from 'react'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import { Table, Pagination, Popconfirm, Button } from 'antd'
import moment from 'moment'

const ModelsBoard = ({ dispatch, list: dataSource, loading, total, page: current }) => {
    function deleteHandler(id) {
        dispatch({
            type: 'modelsBoard/remove',
            payload: id
        })
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/modelsBoard',
            query: { page }
        }))
    }

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: text => moment(text).utc().format('YYYY-MM-DD')
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
            render: text => text ? text.name : ''
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: text => text === 1 ? '禁用' : '可用'
        },
        {
            title: '消息内容',
            dataIndex: 'content',
            key: 'content'
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                let url = `/modelsBoard/detail/${record.id}`
                return (
                    <span className='operation'>
                        <Link to={url}>
                            编辑
                        </Link>
                        <Popconfirm title='确定要删除该项吗？' onConfirm={deleteHandler.bind(null, record.id)}>
                            <span className='deleColor'>删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }
    ]

    return (
        <div className='page-Models-notice'>
            <div className='ui-btnBar'>
                <Link to='/modelsBoard/detail'>
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

function mapStateToProps(state) {
    const { list, total, page } = state.modelsBoard
    return {
        loading: state.loading.models.modelsBoard,
        list,
        total,
        page
    }
}

export default connect(mapStateToProps)(ModelsBoard)
