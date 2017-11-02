import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Radio, Select } from 'antd'
import { Link } from 'dva/router'
import '../index.styl'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
}
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 }
}
class NewUsers extends React.Component {
    state = {
        value: 1
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value)
        this.setState({
            value: e.target.value
        })
    }

    handleReset = () => {
        this.props.form.resetFields()
    }

    check = () => {
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    console.info('success')
                }
            }
        )
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className='page-changing'>
                <FormItem {...formItemLayout} label='角色名称'>
                    {getFieldDecorator('enterprise', {
                        rules: [{
                            required: true,
                            message: '请输入角色名称'
                        }]
                    })(
                        <Input placeholder='请输入角色名称' />
                        )}
                </FormItem>
                <FormItem {...formItemLayout} label='归属系统'>
                    {getFieldDecorator('ascription', {
                        rules: [{
                            required: false,
                            message: '请输入归属系统'
                        }]
                    })(
                        <Input placeholder='请输入归属系统' />
                        )}
                </FormItem>
                <FormItem {...formItemLayout} label='角色'>
                    {getFieldDecorator('power', {
                        initialValue: 'manager',
                        rules: [
                            { required: true, message: '无' }
                        ]
                    })(
                        <Select
                            onChange={this.handleSelectChange}
                        >
                            <Option value='manager'>管理员</Option>
                            <Option value='user'>用户</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem {...formItemLayout} label='状态设置'>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>启用</Radio>
                        <Radio value={2}>停用</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem {...formTailLayout}>
                    <Button type='primary' onClick={this.check}>
                        提交
                     </Button>
                    <Button type='primary' onClick={this.handleReset} className='reset-form'>
                        重置
                    </Button>
                    <Button type='primary' className='cancel-add'>
                        <Link to='/system'>取消</Link>
                    </Button>
                </FormItem>
            </div>
        )
    }
}

export default connect()(Form.create()(NewUsers))
