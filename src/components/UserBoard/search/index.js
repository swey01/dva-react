import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, DatePicker } from 'antd'

const FormItem = Form.Item

const AdvancedSearchForm = ({
    dispatch,
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
            // console.log('Received values of form: ', values)
            const { name, jobTitle } = values
            const visitBeginTime = values.visitBeginTime.valueOf()
            const visitEndTime = values.visitEndTime.valueOf()
            dispatch({
                type: 'userBoard/list',
                payload: {
                    name, jobTitle, visitBeginTime, visitEndTime
                }
            })
        })
    }
    return (
        <Form
            className='ui-search'
            onSubmit={handleSearch}
        >
            <FormItem label={`用户姓名`}>
                {getFieldDecorator(`name`)(
                    <Input placeholder='请输入人名' />
                )}
            </FormItem>
            <FormItem label={`职位名称`}>
                {getFieldDecorator(`jobTitle`)(
                    <Input placeholder='请输入职位名称' />
                )}
            </FormItem>
            <FormItem label={'时间段'}>
                {getFieldDecorator('visitBeginTime')(
                    <DatePicker />
                )}
            </FormItem>
            <div className='auxiliaryClass'>~</div>
            <FormItem className='timeChang'>
                {getFieldDecorator('visitEndTime')(
                    <DatePicker />
                )}
            </FormItem>
            <Button type='primary' htmlType='submit'>查询</Button>
        </Form>
    )
}

export default connect(({ login }) => ({ login }))(Form.create()(AdvancedSearchForm))
