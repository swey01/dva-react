import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Form, Input, Button, Select, Breadcrumb } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class PlanDetail extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         visible: false
    //     }
    //     console.log(this)
    // }

    showModelHandler = (e) => {
        if (e) e.stopPropagation()
        this.setState({
            visible: true
        })
    }

    hideModelHandler = () => {
        this.setState({
            visible: false
        })
    }

    okHandler = () => {
        const { onOk } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk(values)
                this.hideModelHandler()
            }
        })
    }

    createHandler = (values) => {
        // dispatch({
        //     type: 'plan/create',
        //     payload: values
        // })
    }

    handleReset = () => {
        console.log(1212)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { name, website } = this.props
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        }

        return (
            <div className='page-planDetail'>
                <div className='ui-breadcrumb'>
                    <Breadcrumb separator='&gt;'>
                        <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>区域平面图管理</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.props.id ? '编辑' : '新增'}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Form onSubmit={this.okHandler}>
                    <FormItem
                        {...formItemLayout}
                        label='公司名称'
                    >
                        {
                            getFieldDecorator('name', {
                                initialValue: name
                            })(<Input />)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='区域类型'
                    >
                        {getFieldDecorator('state', {
                            initialValue: 'manager',
                            rules: [{
                                required: false,
                                message: '无'
                            }]
                        })(
                            <Select
                                onChange={this.handleSelectChange}
                            >
                                <Option value='manager'>未发送</Option>
                                <Option value='user'>已发送</Option>
                            </Select>
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='图片URL'
                    >
                        {
                            getFieldDecorator('website', {
                                initialValue: website
                            })(<Input />)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='平面图上传'
                    >
                        {
                            getFieldDecorator('website', {
                                initialValue: website
                            })(<Input />)
                        }
                    </FormItem>
                    <FormItem>
                        <Button type='primary' onClick={this.createHandler}>
                            提交
                        </Button>
                        <Button type='primary' onClick={this.handleReset} className='reset-form'>
                            重置
                        </Button>
                        <Button type='primary' className='cancel-add'>
                            <Link to='/plan'>取消</Link>
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default connect(({ plan }) => ({ plan }))(Form.create()(PlanDetail))
