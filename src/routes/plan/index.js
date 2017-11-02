import React from 'react'
import { connect } from 'dva'
import PlanComponent from '../../components/Plan'
import MainLayout from '../../components/MainLayout/MainLayout'

function Plan({ location }) {
    return (
        <MainLayout location={location}>
            <PlanComponent />
        </MainLayout>
    )
}

export default connect(({ login }) => ({ login }))(Plan)
