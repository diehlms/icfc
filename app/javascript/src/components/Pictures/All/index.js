import React, { Component } from 'react'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'

export class Index extends Component {
    componentDidMount() {
        this.props.onFetchPictures()
    }

    render() {
        let pictures = 'not loaded yet, ya binch'

        if (!this.props.loading && this.props.pictures[1] && this.props.pictures[1].pictures) {
            pictures = this.props.pictures[1].pictures.map(picture => {
                return (
                    <div>
                        <h1>{picture.caption}</h1>
                        <img src={`${picture.image.thumb.url}`} />
                    </div>
                )
            })
        }

        return (
            <div>
                <h1>Pictures</h1>
                <div>{pictures}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pictures: state.pictures,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPictures: () => dispatch(actions.fetchPictures())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)