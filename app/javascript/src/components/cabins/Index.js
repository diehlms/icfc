import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import CreateCabin from './Create'
import { Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import './Style.css'

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
        // var mymap = L.map('mapid').setView([51.505, -0.09], 13);

        let cabins = 'articles not loaded yet'

        if (!this.props.loading && this.props.cabins && this.props.cabins[1] && this.props.cabins[1].cabins) {
            cabins = this.props.cabins[1].cabins.map((cabin, index) => {
                return (
                    <div key={index}>
                        <Link to={`/cabins/${cabin.id}`}>{cabin.name}</Link>
                        <button onClick={this.removeCabin.bind(this, cabin.id)}>X</button>
                    </div>
                )
            })
        }

        return (
            <div>
                <h1>Cabins</h1>
                <Button onClick={this.openModal}>
                    Add Cabin
                </Button>
                <Map center={[45.4, -75.7]} zoom={12}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>
                {cabins}
                <Modal
                    isOpen={this.state.createCabinModalOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <CreateCabin />
                </Modal>
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