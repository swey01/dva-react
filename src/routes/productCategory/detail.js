import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import { injectIntl } from 'react-intl'
import MainLayout from '../../components/MainLayout/MainLayout'
import ProductCategoryDetail from '../../components/ProductCategory/detail'

class ProductCategory extends React.Component {
    render() {
        let {
            location,
            match: { params },
            intl: {
                formatMessage
            }
         } = this.props
        return (
            <MainLayout location={location} >
                <div className='page-productCategoryDetail'>
                    <div className='ui-breadcrumb'>
                        <Breadcrumb separator='&gt;'>
                            <Breadcrumb.Item><Link to='/'>{formatMessage({ id: 'nav.home' })}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{formatMessage({ id: 'nav.device' })}</Breadcrumb.Item>
                            <Breadcrumb.Item><Link to='/productCategory'>{formatMessage({ id: 'table.productType' })}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{params.id ? formatMessage({ id: 'button.edit' }) : formatMessage({ id: 'button.add' })}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <ProductCategoryDetail {...params} />
                </div>
            </MainLayout>
        )
    }
}

export default injectIntl(connect()(ProductCategory), {
    withRef: true
})
