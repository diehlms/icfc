import React, { Component } from "react";
import Header from '../components/Layouts/Header';
import Footer from '../components/Layouts/Footer';
import Routes from "../routes/Index"
import { connect } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                    <>{Routes}</>
                <Footer />
            </div>
        )  
    }    
}

const mapDispatchToProps = dispatch => {
    return {}
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)