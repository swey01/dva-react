import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Select } from 'antd'
import { Link } from 'dva/router'
import './index.styl'

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
class modelsNewCom extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'modelsBoard/reset'
        })
        if (this.props.id) {
            this.props.dispatch({
                type: 'modelsBoard/fetch',
                payload: this.props.id
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { validateFields } = this.props.form
        validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values)
            }
            // TODO
            values.creator = {
                name: 'admin',
                id: 'admin'
            }
            if (!this.props.id) {
                this.props.dispatch({
                    type: 'modelsBoard/create',
                    payload: values
                })
            } else {
                values.id = this.props.id
                this.props.dispatch({
                    type: 'modelsBoard/modify',
                    payload: values
                })
            }
        })
    }

    handleReset = () => {
        this.props.form.resetFields()
    }

    render() {
        const { getFieldDecorator } = this.props.form
        let data = this.props.modelsBoard.data
        return (
            <div className='page-ModelsBoardDetail'>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label='公告状态'>
                        {getFieldDecorator('state', {
                            initialValue: data.state ? data.state : 0,
                            rules: [{
                                required: true
                            }]
                        })(
                            <Select>
                                <Option value={0}>可用</Option>
                                <Option value={1}>禁用</Option>
                            </Select>
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='公告内容'>
                        {getFieldDecorator('content', {
                            initialValue: data.content ? data.content : '',
                            rules: [{
                                required: true,
                                message: '请填写公告内容'
                            }]
                        })(
                            <TextArea autosize={{ minRows: 4, maxRows: 6 }} />
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
                            <Link to='/system/news'>取消</Link>
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default connect(({ modelsBoard }) => ({ modelsBoard }))(Form.create()(modelsNewCom))
