import React from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import Sidebar from './shared/Sidebar';
import Routes from './routes/Index';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import './Style.css'

class App extends React.Component {
    componentDidMount() {
        this.props.onCheckAuthState()
    }

    render() {
        return (
            <div>
                <Header />
                <Sidebar />
                <Routes 
                    user_id={this.props.user_id}
                />
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.isAuthed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(actions.checkAuthState())
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);