import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Title from '../../shared/Title'
import SubTitle from '../../shared/SubTitle'
import HorizontalLine from '../../shared/HorizontalLine'
import StyledInput from "../../shared/StyledInput";
import Grid from '@material-ui/core/Grid';
import DateTable from './components/DateTable';
import CabinImageCarousel from './components/CabinImageCarousel';
import './Style.css'


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
        let cabinDates = [];
        const cabinImageList = [];

        if (!this.props.cabinDates.loading && this.props.cabinDates[1] && this.props.cabinDates[1].cabin_dates) {
            this.props.cabinDates[1].cabin_dates.map(cabinDate => {
                if (cabinDate.cabin_id.toString() === this.state.cabin_id) {
                    cabinDates.push({
                        startdate: cabinDate.startdate,
                        enddate: cabinDate.enddate
                    }) 
                }
            })
        }

        if (!this.props.cabinImages.loading && this.props.cabinImages[1] && this.props.cabinImages[1].cabin_images) {
            this.props.cabinImages[1].cabin_images.map(image => {
                if (image.cabin_id.toString() === this.state.cabin_id) {
                    cabinImageList.push(image)
                }
            });
        }

        if (!this.props.cabins.loading && this.props.cabins[1] && this.props.cabins[1].cabins) {
            const {name, bedrooms, user_id, washerdryer, dock, description } = this.props.cabins[1].cabins.find(cabin =>
                cabin.id.toString() === this.props.match.params.id.toString()
            )

            text = (
                <div>
                    <Title text={name} />
                    <HorizontalLine />
                    <p>{bedrooms}</p>
                </div>
            )

            if (this.props.user_id === user_id) {
                imageUpload = (
                    <form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Grid container>
                                <StyledInput
                                    type="file"
                                    onChange={this.imageUpload}
                                />
                                <Button type="submit">add image</Button>
                            </Grid>
                        </FormGroup>
                    </form>
                )
            }
        }

        return (
            <div className="containerMain" style={{
                display: 'grid',
                gridTemplateColumns: '50% 40%',
                gridColumnGap: '50px'
            }}>
                <div>
                    {text}
                    {cabinImageList.length > 0 ? (
                        <CabinImageCarousel
                            images={cabinImageList}
                        /> 
                    ) : (
                        null
                    )}
                </div>
                <div>
                    {imageUpload}
                    <SubTitle text="Add dates of availability" />
                    <form onSubmit={this.onCabinDateSubmit}>
                        <FormGroup>
                            <Grid container>
                                <StyledInput
                                    className="inputField"
                                    type="date" 
                                    onChange={this.onChange}
                                    value={this.state.startdate}
                                    name="startdate"
                                    startAdornment="from:"
                                    style={{
                                        marginRight: 6
                                    }}
                                />
                                <StyledInput
                                    className="inputField" 
                                    type="date" 
                                    onChange={this.onChange}
                                    value={this.state.enddate}
                                    name="enddate"
                                    startAdornment="to:"
                                    style={{
                                        marginRight: 6
                                    }}
                                />
                                <Button variant="text" type="submit">
                                    Submit
                                </Button>
                            </Grid>
                        </FormGroup>
                    </form>
                    <DateTable
                        dates={cabinDates}
                    />
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
