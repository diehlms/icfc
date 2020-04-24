import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import Title from '../../shared/Title'
import CreatePicture from './Create'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import HorizontalLine from '../../shared/HorizontalLine';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

function PictureCard(props) {
    return (
        <Card>
            <CardContent>
                <img src={props.src} alt={props.alt} />
            </CardContent>
            <CardActions>
                <IconButton onClick={props.removePicture}>
                        <HighlightOffIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

function PictureWrapper(props) {
    return (
        <div style={{
            display: 'flex',
            flex: 1
        }}>
            {props.children}
        </div>
    )
}

class Index extends React.Component {
    state = {
        createPictureModalOpen: false
    }

    componentDidMount() {
        this.props.onFetchPictures()
    }

    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            this.props.onFetchPictures();
        }
    }

    openModal = () => {
        this.setState({createPictureModalOpen: true});
    }
    
    closeModal = () => {
        this.setState({createPictureModalOpen: false});
    }

    removePicture = id => {
        this.props.onRemovePicture(id)
    }

    render() {
        let pictures = 'pictures not loaded yet'
        if (!this.props.pictures.loading && this.props.pictures && this.props.pictures[1] && this.props.pictures[1].pictures) {
            pictures = this.props.pictures[1].pictures.map((picture, index) => {
                return (
                    <PictureCard
                        key={picture.id}
                        removePicture={this.removePicture.bind(this, picture.id)}
                        src={picture.image.url}
                        alt={picture.caption}
                        id={picture.id}
                        author={picture.user_id}
                    />
                )
            })
        }

        return (
            <div className="containerMain">
                <Title text="Pictures" />
                <div style={{
                    margin: "0 auto"
                }}>
                    <Button onClick={this.openModal}>
                        Add Picture
                    </Button>
                    <Button>
                        <a href="https://photos.google.com/share/AF1QipNldgWsKvgyEBv2udxYVNwlVIWJ4Mn_aY2a41SPHoM6c6LMm4HeMmwqZGuIJ4hOXA?key=QmluMS00ZHZfS1JMN1dDTktQb0pwRWNiM003cERn">2019 Pictures</a>
                    </Button>
                    <Button>
                        <a href="https://photos.google.com/share/AF1QipNjfWzCYu2JrV3CQ_NIlUbf8APffI3Af2HHTn4RRq9laySkz-OGckBgAvmqAfxrCQ?key=OEVmYVNtSy1FcEpCVktlSTA2QngtQk5tMEliNE9n">2018 Pictures, Part 1</a>
                    </Button>
                    <Button>
                        <a href="https://photos.google.com/share/AF1QipPJGncCbqieSG8bhndZLja0FfEVf4KaFlRatt6FWk-AmUAWAWF1pup9qcroOXCh8A?key=NzllQXN0LWtZOFZyQUt1X21ETHBOWnZ5dndadm53">2018 Pictures, Part 2</a>
                    </Button>
                </div>
                <HorizontalLine />
                <PictureWrapper>
                    {pictures}
                </PictureWrapper>
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
        pictures: state.pictures,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPictures: () => dispatch(actions.fetchPictures()),
        onRemovePicture: (id) => dispatch(actions.deletePicture(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);