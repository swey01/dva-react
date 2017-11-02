import React from 'react'
import { connect } from 'dva'
import MainLayout from '../../components/MainLayout/MainLayout'
import PlanDetailComponent from '../../components/Plan/detail'

function PlanDetail({ location, params }) {
    return (
        <MainLayout location={location}>
            <PlanDetailComponent {...params} />
        </MainLayout>
    )
}

export default connect()(PlanDetail)
