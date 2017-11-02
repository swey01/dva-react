import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Select } from 'antd'
import { Link } from 'dva/router'
import '../index.styl'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 }
}
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 }
}
class NewsReviseCom extends React.Component {
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
                <FormItem {...formItemLayout} label='配置名称'>
                    {getFieldDecorator('title', {
                        rules: [{
                            required: false,
                            message: '请输入配置名称'
                        }]
                    })(
                        <Input placeholder='请输入配置名称' />
                        )}
                </FormItem>
                <FormItem {...formItemLayout} label='配置类型'>
                    {getFieldDecorator('power', {
                        initialValue: 'manager',
                        rules: [{
                            required: false,
                            message: '无'
                        }]
                    })(
                        <Select
                            onChange={this.handleSelectChange}
                        >
                            <Option value='manager'>短信</Option>
                            <Option value='user'>邮件</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem {...formItemLayout} label='状态设置'>
                    <TextArea autosize={{ minRows: 4, maxRows: 6 }} />
                </FormItem>
                <FormItem {...formTailLayout}>
                    <Button type='primary' onClick={this.check}>
                        提交
                     </Button>
                    <Button type='primary' onClick={this.handleReset} className='reset-form'>
                        重置
                    </Button>
                    <Button type='primary' className='cancel-add'>
                        <Link to='/system/news'>取消</Link>
                    </Button>
                </FormItem>
            </div>
        )
    }
}

export default connect()(Form.create()(NewsReviseCom))
