import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import { connect } from 'dva'
// import { Link } from 'dva/router'

const FormItem = Form.Item
// const Option = Select.Option

class RecordSearch extends React.Component {
    state = {
        expand: false
    };

    handleSearch = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values)
            }
            const { operationBegintime, operationEndtime, userAccount } = values
            console.log(operationBegintime)
            this.props.dispatch({
                type: 'record/reload',
                payload: {
                    operationBegintime: operationBegintime ? operationBegintime.utc().format() : '',
                    operationEndtime: operationEndtime ? operationEndtime.utc().format() : '',
                    userAccount
                }
            })
        })
    }

    handleReset = () => {
        this.props.form.resetFields()
    }

    toggle = () => {
        const { expand } = this.state
        this.setState({ expand: !expand })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form
                className='ui-search'
                onSubmit={this.handleSearch}
            >
                <FormItem label={'时间段'}>
                    {getFieldDecorator('operationBegintime')(
                        <DatePicker />
                    )}
                </FormItem>
                <div className='auxiliaryClass'>~</div>
                <FormItem className='timeChang'>
                    {getFieldDecorator('operationEndtime')(
                        <DatePicker />
                    )}
                </FormItem>
                <FormItem label={`操作账号`}>
                    {getFieldDecorator(`userAccount`)(
                        <Input placeholder='请输入操作账号' />
                    )}
                </FormItem>
                <Button type='primary' htmlType='submit'>查询</Button>
            </Form>
        )
    }
}

export default connect(({ device }) => ({ device }))(Form.create()(RecordSearch))
