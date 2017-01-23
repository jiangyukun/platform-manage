/**
 * Created by jiangyukun on 2017/1/22.
 */
import React, {Component, PropTypes} from 'react'

import {connect} from 'react-redux'
import {merge} from 'lodash'
import {bindActionCreators} from 'redux'

import AppFunctionPage from '../common/AppFunctionPage'
import QueryFilter from '../../../components/core/QueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomTextInput from '../../../components/core/query-filter/custom/CustomTextInput'
import PaginateList from '../../../components/core/PaginateList'
import Layout from "../../../components/core/layout/Layout"

class TodoWorkTrack extends Component {
    render() {
        return (
            <AppFunctionPage>

            </AppFunctionPage>
        )
    }
}

export default TodoWorkTrack
