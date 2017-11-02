import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { injectIntl } from 'react-intl'
import { Link } from 'dva/router'
import MainLayout from '../../components/MainLayout/MainLayout'
import UsersList from '../../components/ProductCategory'

class ProductCategory extends React.Component {
    render() {
        let {
            location,
            intl: {
                formatMessage
            }
        } = this.props
        return (
            <MainLayout location={location} >
                <div className='page-device'>
                    <div className='ui-breadcrumb'>
                        <Breadcrumb separator='&gt;'>
                            <Breadcrumb.Item><Link to='/'>{formatMessage({ id: 'nav.home' })}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{formatMessage({ id: 'nav.device' })}</Breadcrumb.Item>
                            <Breadcrumb.Item>{formatMessage({ id: 'table.productType' })}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <UsersList />
                </div>
            </MainLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading.models.productCategory
    }
}

export default injectIntl(connect(mapStateToProps)(ProductCategory), {
    withRef: true
})
