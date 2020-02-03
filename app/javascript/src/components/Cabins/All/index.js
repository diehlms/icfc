import React, { Component } from 'react'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'

export class Index extends Component {
    componentDidMount() {
        this.props.onFetchCabins()
    }

    render() {
        let cabins = 'not loaded yet, ya binch'

        if (!this.props.loading && this.props.cabins[1] && this.props.cabins[1].cabins) {
            cabins = this.props.cabins[1].cabins.map(cabin => {
                return (
                    <div>
                        <h1>{cabin.name}</h1>
                        <p>{cabin.bedrooms}</p>
                    </div>
                )
            })
        }

        return (
            <div>
                <h1>Cabins</h1>
                <div>{cabins}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cabins: state.cabins,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCabins: () => dispatch(actions.fetchCabins())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
