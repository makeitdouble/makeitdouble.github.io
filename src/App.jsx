import React from 'react';

const App = React.createClass({
    render: function() {
        return(
            <div className="App">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default App;
