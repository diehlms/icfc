import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import CreatePicture from './Create'

class Index extends React.Component {
    state = {
        createPictureModalOpen: false
    }

    componentDidMount() {
        this.props.onFetchPictures()
    }

    openModal = () => {
        this.setState({createPictureModalOpen: true});
    }
    
    closeModal = () => {
        this.setState({createPictureModalOpen: false});
    }

    removePicture = id => {
        this.props.removePicture(id)
    }

    render() {
        let pictures = 'pictures not loaded yet'
        if (!this.props.loading && this.props.pictures && this.props.pictures[1] && this.props.pictures[1].pictures) {
            pictures = this.props.pictures[1].pictures.map((picture, index) => {
                return (
                    <div key={index}>
                        <p>{picture.caption}</p>
                        <img src={picture.image.thumb.url} alt={picture.caption} />
                        <button onClick={this.removePicture.bind(this, picture.id)}>X</button>
                    </div>
                )
            })
        }

        return (
            <div>
                <h1>Pictures</h1>
                <Button onClick={this.openModal}>
                    Add Picture
                </Button>
                {pictures}
                <Modal
                    isOpen={this.state.createPictureModalOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <CreatePicture />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pictures: state.pictures
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPictures: () => dispatch(actions.fetchPictures()),
        onRemovePicture: (id) => dispatch(actions.deletePicture(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);