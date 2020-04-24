import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import CreateCabin from './Create'
import Title from '../../shared/Title'
import { Map, TileLayer } from "react-leaflet";
import CabinCard from "./components/CabinCard";
import HorizontalLine from '../../shared/HorizontalLine'
import './Style.css'

class Index extends React.Component {
    state = {
        createCabinModalOpen: false
    }

    componentDidMount() {
        this.props.onFetchCabins()
    }

    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            this.props.onFetchCabins()
        }
    }

    openModal = () => {
        this.setState({createCabinModalOpen: true});
    }
    
    closeModal = () => {
        this.setState({createCabinModalOpen: false});
    }

    removeCabin = id => {
        this.props.onRemoveCabin(id)
    }

    render() {
        let cabins = 'cabins not loaded yet'

        if (!this.props.cabins.loading && this.props.cabins && this.props.cabins[1] && this.props.cabins[1].cabins) {
            cabins = this.props.cabins[1].cabins.map((cabin, index) => {
                return (
                    <CabinCard
                        key={index}
                        name={cabin.name}
                        bedrooms={cabin.bedrooms}
                        id={cabin.id}
                        removeCabin={this.removeCabin.bind(this, cabin.id)}
                    />
                )
            })
        }

        return (
            <div className="containerMain">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "10% 90%"
                }}>
                    <div>
                        <Title text="Cabins" />
                        <HorizontalLine />
                        <Button onClick={this.openModal}>
                            Add Cabin
                        </Button>
                    </div>
                    <div>
                        <Map 
                            style={{
                                zIndex: "0",
                                width: "77%",
                                display: "flex",
                                flex: "1"
                            }}
                            center={[45.4, -75.7]} zoom={12}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                        </Map>
                        <div
                            style={{
                                margin: "0 auto",
                                width: "77%",
                                display: "flex",
                                flex: "1",
                                flexWrap: "wrap",
                                flexDirection: "row",
                            }}
                        >
                            {cabins}
                        </div>
                        <Modal
                            isOpen={this.state.createCabinModalOpen}
                            onRequestClose={this.closeModal}
                            contentLabel="Example Modal"
                            ariaHideApp={false}
                        >
                            <CreateCabin 
                                user_id={this.props.user_id}
                            />
                        </Modal>
                    </div>
                </div>
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
        onFetchCabins: () => dispatch(actions.fetchCabins()),
        onRemoveCabin: (id) => dispatch(actions.deleteCabin(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);