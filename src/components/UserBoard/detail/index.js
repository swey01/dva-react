import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Radio, Select } from 'antd'
import { Link } from 'dva/router'
import './index.styl'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

class NewUsers extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'userBoard/reset'
        })
        if (this.props.id) {
            this.props.dispatch({
                type: 'userBoard/fetch',
                payload: { id: this.props.id }
            })
        }
        console.log(this.props.id)
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
                    type: 'userBoard/create',
                    payload: values
                })
            } else {
                console.log('Received values of form: ', values)
                this.props.dispatch({
                    type: 'userBoard/modify',
                    payload: values
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const id = this.props.id
        const list = this.props.userBoard.data

        return (
            <div className='page-new'>
                <div className='title'>{id ? '编辑' : '新增'}用户信息</div>
                <Form onSubmit={this.handleSubmit} className='ui-formDetail'>
                    <FormItem label='访客ID'>
                        {getFieldDecorator('id', {
                            initialValue: list.id ? list.id : '',
                            rules: [{
                                required: false,
                                message: 'id'
                            }]
                        })(
                            <Input placeholder='' disabled={id !== ''} />
                            )}
                    </FormItem>
                    <FormItem label='身份证号'>
                        {getFieldDecorator('iDNumber', {
                            initialValue: list.iDNumber !== '' ? list.iDNumber : '',
                            rules: [{
                                required: true,
                                message: '请输入身份证号码'
                            }]
                        })(
                            <Input placeholder='请输入身份证号码' />
                            )}
                    </FormItem>
                    <FormItem label='访客姓名'>
                        {getFieldDecorator('name', {
                            initialValue: list.name !== '' ? list.name : '',
                            rules: [{
                                required: true,
                                message: '请输入姓名'
                            }]
                        })(
                            <Input placeholder='请输入姓名' />
                            )}
                    </FormItem>
                    <FormItem label='企业名称'>
                        {getFieldDecorator('company', {
                            initialValue: list.company !== '' ? list.company : '',
                            rules: [{
                                required: true,
                                message: '请输入企业名称'
                            }]
                        })(
                            <Input placeholder='请输入企业名称' />
                            )}
                    </FormItem>
                    <FormItem label='联系方式'>
                        {getFieldDecorator('phone', {
                            initialValue: list.phone !== '' ? list.phone : '',
                            rules: [{
                                required: true,
                                message: '请输入正确格式'
                            }]
                        })(
                            <Input placeholder='请输入正确格式' />
                            )}
                    </FormItem>
                    <FormItem label='职业名称'>
                        {getFieldDecorator('jobTitle', {
                            initialValue: list.jobTitle !== '' ? list.jobTitle : '',
                            rules: [{
                                required: true,
                                message: '请输入职位名称 '
                            }]
                        })(
                            <Input placeholder='请输入职位名称 ' />
                            )}
                    </FormItem>
                    <FormItem label='状态'>
                        {getFieldDecorator('state', {
                            initialValue: list.state ? list.state : 0,
                            rules: [{
                                required: false,
                                message: '请输入设置状态'
                            }]
                        })(<RadioGroup>
                            <Radio value={0}>禁止</Radio>
                            <Radio value={1}>正常</Radio>
                        </RadioGroup>)}
                    </FormItem>
                    <FormItem label='权限设置'>
                        {getFieldDecorator('power', {
                            initialValue: list.manager ? list.manager : 'manager',
                            rules: [
                                { required: true, message: '无' }
                            ]
                        })(
                            <Select>
                                <Option value='manager'>管理员</Option>
                                <Option value='user'>用户</Option>
                            </Select>
                            )}
                    </FormItem>
                    <div className='btn'>
                        <Button type='primary' htmlType='submit'>
                            提交
                     </Button>
                        <Button type='primary' className='cancel-add'>
                            <Link to='/userBoard'>取消</Link>
                        </Button>
                    </div>
                </Form>
            </div >
        )
    }
}

export default connect(({ userBoard }) => ({ userBoard }))(Form.create()(NewUsers))
