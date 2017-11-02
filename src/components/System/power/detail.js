import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Radio, Select } from 'antd'
import { Link } from 'dva/router'
import '../index.styl'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
}
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 }
}
class PowerNewCom extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'power/reset'
        })
        if (this.props.id) {
            this.props.dispatch({
                type: 'power/fetch',
                payload: { id: this.props.id }
            })
        }
    }
    handleReset = () => {
        this.props.form.resetFields()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { validateFields } = this.props.form
        validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values)
            }
            // console.log('Received values of form: ', values)
            if (!this.props.id) {
                this.props.dispatch({
                    type: 'power/create',
                    payload: values
                })
            } else {
                // console.log('Received values of form: ', values)
                let id = this.props.id
                this.props.dispatch({
                    type: 'power/modify',
                    payload: { values, id }
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const list = this.props.power.data
        return (
            <div className='page-changing'>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label='归属系统'>
                        {getFieldDecorator('ascription', {
                            initialValue: list.ascription,
                            rules: [{
                                required: false,
                                message: '请输入归属系统'
                            }]
                        })(
                            <Input placeholder='请输入归属系统' />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='管理员账号'>
                        {getFieldDecorator('account', {
                            rules: [{
                                required: false,
                                message: '请输入管理员账号'
                            }]
                        })(
                            <Input placeholder='请输入管理员账号' />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='管理员密码'>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: false,
                                message: '请输入管理员密码'
                            }]
                        })(
                            <Input placeholder='请输入管理员密码' type='password' />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='管理员角色'>
                        {getFieldDecorator('power', {
                            initialValue: 'manager',
                            rules: [
                                { required: false, message: '无' }
                            ]
                        })(
                            <Select
                                onChange={this.handleSelectChange}
                            >
                                <Option value='manager'>管理员</Option>
                                <Option value='user'>系统管理员</Option>
                            </Select>
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='描述'>
                        {getFieldDecorator('describe', {
                            rules: [
                                { required: false, message: ' ' }
                            ]
                        })(
                            <TextArea autosize={{ minRows: 4, maxRows: 6 }} />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='状态设置'>
                        {getFieldDecorator('state', {
                            initialValue: 1,
                            rules: [
                                { required: false, message: ' ' }
                            ]
                        })(
                            <RadioGroup >
                                <Radio value={1}>启用</Radio>
                                <Radio value={0}>停用</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem {...formTailLayout}>
                        <Button type='primary' htmlType='submit'>
                            提交
                     </Button>
                        <Button type='primary' onClick={this.handleReset} className='reset-form'>
                            重置
                    </Button>
                        <Button type='primary' className='cancel-add'>
                            <Link to='/system/power'>返回</Link>
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default connect(({ power }) => ({ power }))(Form.create()(PowerNewCom))
