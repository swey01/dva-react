import React from 'react'
import { connect } from 'dva'
import { Table, Pagination, Popconfirm, Button } from 'antd'
import { injectIntl } from 'react-intl'
import { Link } from 'dva/router'

class ProductCategoryList extends React.Component {
    deleteHandler = id => {
        this.props.dispatch({
            type: 'productCategory/remove',
            payload: id
        })
    }
    pageChangeHandler = page => {
        this.props.dispatch({
            type: 'productCategory/reload',
            payload: { page }
        })
    }
    render() {
        let { list: dataSource,
            loading,
            total,
            page: current,
            intl: {
                formatMessage
            }
        } = this.props

        const columns = [
            {
                title: formatMessage({ id: 'table.identifier' }),
                dataIndex: 'no',
                key: 'no',
                render: (text, record, index) => index + 1
            },
            {
                title: formatMessage({ id: 'table.productType' }),
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: formatMessage({ id: 'table.operation' }),
                key: 'Operation',
                render: (text, record) => {
                    let url = `/productCategory/detail/${record.id}`
                    return (
                        <span className='operation'>
                            <Link to={url}>{formatMessage({ id: 'button.edit' })}</Link>
                            <Popconfirm title={formatMessage({ id: 'table.confirmName' })} onConfirm={this.deleteHandler.bind(null, record.id)}>
                                <a href='' className='deleColor'>{formatMessage({ id: 'button.deleColor' })}</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        ]

        return (
            <div>
                <div className='ui-btnBar'>
                    <Link to='/productCategory/detail/'>
                        <Button type='primary'>{formatMessage({ id: 'button.add' })}</Button>
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
                        onChange={this.pageChangeHandler}
                    />
                </div >
            </div >
        )
    }
}

export default injectIntl(connect(({ productCategory }) => ({ ...productCategory }))(ProductCategoryList), {
    withRef: true
})
