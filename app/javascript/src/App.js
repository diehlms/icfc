import React from 'react';
import Sidebar from './shared/Sidebar';
import Routes from './routes/Index';
import './Style.css'

class App extends React.Component {
    render() {
        return (
            <div className="body">
                <Routes 
                    user_id={this.props.user_id}
                />
            </div>
        )
    }
}

export default App;