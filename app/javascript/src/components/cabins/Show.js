import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Input from '@material-ui/core/Input';

export class Show extends Component {
    state = {
        cabin_id: '',
        image: null
    }

    componentDidMount = () => {
        this.props.onFetchCabins()
        this.props.onFetchCabinImages()
        this.setState({
            cabin_id: this.props.match.params.id.toString()
        })
    }

    imageUpload = e => {
        this.setState({image: e.target.files[0]})
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.onAddCabinImage(this.state.cabin_id, this.state.image)
    }

    render() {
        let text = 'hello'
        let imageUpload = ''


        if (!this.props.loading && this.props.cabinImages[1] && this.props.cabinImages[1].cabin_images) {
            let cabinImageList = [];
            this.props.cabinImages[1].cabin_images.map(image => {
                if (image.cabin_id.toString() === this.state.cabin_id) {
                    cabinImageList.push(image)
                }
            });
            console.log(cabinImageList);
        }

        if (!this.props.loading && this.props.cabins[1] && this.props.cabins[1].cabins) {
            const {name, bedrooms, user_id, id } = this.props.cabins[1].cabins.find(cabin =>
                cabin.id.toString() === this.props.match.params.id.toString()
            )

            text = (
                <div>
                    <h1>{name}</h1>
                    <p>{bedrooms}</p>
                </div>
            )

            if (this.props.user_id === user_id) {
                imageUpload = (
                    <form onSubmit={this.onSubmit}>
                        Image:
                        <Input
                            type="file"
                            onChange={this.imageUpload}
                        />
                        <button type="submit">add image</button>
                    </form>
                )
            }
        }

        return (
            <div>
                {text}
                {imageUpload}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cabins: state.cabins,
        cabinImages: state.cabinImage,
        loading: state.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCabins: () => dispatch(actions.fetchCabins()),
        onFetchCabinImages: () => dispatch(actions.fetchCabinImages()),
        onAddCabinImage: (cabin_id, image) => dispatch(actions.addCabinImage(cabin_id, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
