/** @jsx React.DOM */

window.components = window.components || {};
var UsersList = window.components.UsersList;
var App = React.createClass({
    getInitialState: function() {
        return {
        };
    },

    componentWillMount: function() {
        this.firebaseRef = window.api.getUsers(function(data) {
            this.setState({
                isLoading: false,
                items: data.users
            });
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.firebaseRef.off();
    },

    render: function() {
        return ('');
    }
});

React.render(<App />, document.getElementById('app'));
