import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';

export class Show extends Component {
    state = {
        cabin_id: '',
        image: null,
        startdate: null,
        enddate: null
    }

    componentDidMount = () => {
        this.props.onFetchCabins()
        this.props.onFetchCabinImages()
        this.props.onFetchCabinDates()
        this.setState({
            cabin_id: this.props.match.params.id.toString()
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            this.props.onFetchCabins()
            this.props.onFetchCabinImages()
            this.props.onFetchCabinDates()
        }
    }

    imageUpload = e => {
        this.setState({image: e.target.files[0]})
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.onAddCabinImage(this.state.cabin_id, this.state.image)
    }

    onCabinDateSubmit = e => {
        e.preventDefault();
        this.props.onAddCabinDate(this.state.cabin_id, this.state.startdate, this.state.enddate)
    }

    render() {
        let text = 'hello'
        let imageUpload = ''
        let datetext = ""
        let cabinDates = [];

        if (!this.props.cabinDates.loading && this.props.cabinDates[1] && this.props.cabinDates[1].cabin_dates) {
            this.props.cabinDates[1].cabin_dates.map(cabinDate => {
                cabinDates.push({
                    startdate: cabinDate.startdate,
                    enddate: cabinDate.enddate
                })
            })
        }

        if (cabinDates.length > 0) {
            datetext = cabinDates.map(cabinDate => {
                return (
                    <li>{cabinDate.startdate} to: {cabinDate.enddate}</li>
                )
            })
        }

        if (!this.props.cabinImages.loading && this.props.cabinImages[1] && this.props.cabinImages[1].cabin_images) {
            let cabinImageList = [];
            this.props.cabinImages[1].cabin_images.map(image => {
                if (image.cabin_id.toString() === this.state.cabin_id) {
                    cabinImageList.push(image)
                }
            });
        }

        if (!this.props.cabins.loading && this.props.cabins[1] && this.props.cabins[1].cabins) {
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
            <div className="containerMain">
                {text}
                {imageUpload}
                {datetext}
                <div>
                <h1>Add an Cabin Date</h1>
                <form onSubmit={this.onCabinDateSubmit}>
                    <FormGroup>
                        Start Date:
                        <Input
                            className="inputField"
                            type="date" 
                            onChange={this.onChange}
                            value={this.state.startdate}
                            name="startdate"
                        />
                        End Date:
                        <Input
                            className="inputField" 
                            type="date" 
                            onChange={this.onChange}
                            value={this.state.enddate}
                            name="enddate"
                        />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cabins: state.cabins,
        cabinImages: state.cabinImage,
        cabinDates: state.cabinDate,
        loading: state.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCabins: () => dispatch(actions.fetchCabins()),
        onFetchCabinImages: () => dispatch(actions.fetchCabinImages()),
        onFetchCabinDates: () => dispatch(actions.fetchCabinDates()),
        onAddCabinImage: (cabin_id, image) => dispatch(actions.addCabinImage(cabin_id, image)),
        onAddCabinDate: (cabin_id, startdate, enddate) => dispatch(actions.addCabinDate(cabin_id, startdate, enddate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
