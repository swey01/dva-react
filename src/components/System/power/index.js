import React from 'react'
import { connect } from 'dva'
import { Table, Pagination, Form, Input, Button } from 'antd'
import { routerRedux, Link } from 'dva/router'
import '../index.styl'

const FormItem = Form.Item

const PowerCom = ({
    dispatch,
    dataSource,
    loading,
    total,
    current,
    form: {
        validateFields,
        getFieldDecorator
    }
}) => {
    function handleSearch(e) {
        e.preventDefault()
        validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values)
            }
            const { name } = values
            dispatch({
                type: 'power/list',
                payload: name
            })
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
            title: '管理员账号',
            dataIndex: 'account',
            key: 'account'
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
            render: (text, record) => {
                let url = '/system/power/detail/' + record.id
                return (
                    <span className='operation' >
                        <Link to={url} >
                            编辑
                    </Link>
                    </span >
                )
            }
        }
    ]

    return (
        <div className='page-power'>
            <div className='ui-search'>
                <Form onSubmit={handleSearch}>
                    <FormItem label='角色'>
                        {getFieldDecorator('enterprise', {
                            rules: [{
                                required: false,
                                message: '请输入角色名称'
                            }]
                        })(
                            <Input placeholder='请输入角色名称' />
                            )}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>
                        查询
                     </Button>
                </Form>
            </div>
            <div className='ui-btnBar'>
                <Link to='/system/power/detail'>
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

export default connect(({ power }) => ({ power }))(Form.create()(PowerCom))
