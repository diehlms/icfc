import React from 'react';
import Routes from './routes/Index';

// global styles
import './App.scss';

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