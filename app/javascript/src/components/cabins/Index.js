import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import CreateCabin from './Create'
import { Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import CabinCard from "./components/CabinCard";
import './Style.css'
import { Typography } from '@material-ui/core';

class Index extends React.Component {
    state = {
        createCabinModalOpen: false
    }

    componentDidMount() {
        this.props.onFetchCabins()
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

        if (!this.props.loading && this.props.cabins && this.props.cabins[1] && this.props.cabins[1].cabins) {
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
                        <h1>Cabins</h1>
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
                            <CreateCabin />
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cabins: state.cabins
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCabins: () => dispatch(actions.fetchCabins()),
        onRemoveCabin: (id) => dispatch(actions.deleteCabin(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);