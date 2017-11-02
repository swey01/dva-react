import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button } from 'antd'
import { injectIntl } from 'react-intl'
import { Link } from 'dva/router'
import './index.styl'

const FormItem = Form.Item

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 }
}
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 }
}
class ProductCategory extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'productCategory/reset'
        })
        this.props.dispatch({
            type: 'productCategory/roles'
        })
        if (this.props.id) {
            this.props.dispatch({
                type: 'productCategory/fetch',
                payload: { id: this.props.id }
            })
        }
    }
    handleReset = () => {
        this.props.dispatch({
            type: 'productCategory/reset'
        })
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
                if (values.name) {
                    this.props.dispatch({
                        type: 'productCategory/create',
                        payload: values
                    })
                }
            } else if (values.name) {
                // console.log('Received values of form: ', values)
                let id = this.props.id
                this.props.dispatch({
                    type: 'productCategory/modify',
                    payload: { ...values, id }
                })
            }
        })
    }
    render() {
        const {
            form: { getFieldDecorator },
            productCategory: { data },
            intl: {
                formatMessage
            }
         } = this.props
        return (
            <div className='formWrap'>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label={formatMessage({ id: 'table.deviceType' })}>
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: formatMessage({ id: 'table.enterDeviceType' })
                            }],
                            initialValue: data.name
                        })(
                            <Input placeholder={formatMessage({ id: 'table.enterDeviceType' })} />
                            )}
                    </FormItem>
                    <FormItem {...formTailLayout}>
                        <Button type='primary' onClick={this.handleSubmit}>
                            {formatMessage({ id: 'button.submit' })}
                        </Button>
                        <Button type='primary' onClick={this.handleReset} className='reset-form'>
                            {formatMessage({ id: 'button.reset' })}
                        </Button>
                        <Button type='primary' className='cancel-add'>
                            <Link to='/productCategory'>{formatMessage({ id: 'button.cancel' })}</Link>
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default injectIntl(connect(({ productCategory }) => ({ productCategory }))(Form.create()(ProductCategory)), {
    withRef: true
})
