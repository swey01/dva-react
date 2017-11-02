import React from 'react'
import { Table, Pagination } from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import '../index.styl'

function Record({ dispatch, list: dataSource, loading, total, page: current }) {
    function pageChangeHandler(page) {
        dispatch({
            type: 'record/reload',
            payload: { page }
        })
    }

    const columns = [
        {
            title: '编号',
            dataIndex: 'no',
            key: 'no',
            render: (text, record, index) => index + 1
        },
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '操作账号',
            dataIndex: 'userAccount',
            key: 'userAccount'
        },
        {
            title: '操作姓名',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: '操作时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: text => moment(text).utc().format('YYYY-MM-DD')
        },
        {
            title: '操作内容',
            dataIndex: 'content',
            key: 'content'
        }
    ]

    return (
        <div className='system-record'>
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
    const { list, total, page } = state.record
    return {
        loading: state.loading.models.record,
        list,
        total,
        page
    }
}

export default connect(mapStateToProps)(Record)
