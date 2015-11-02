/** @jsx React.DOM */

window.components = window.components || {};
var UsersList = window.components.UsersList;
var App = React.createClass({
    getInitialState: function() {
        return {
            isLoading: true,
            items: [],
            email: ''
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

    onChange: function(e) {
        this.setState({
            email: e.target.value
        });
    },

    removeUser: function(key) {
        var firebaseRef = new Firebase(window.conf.firebaseUrl + '/users/');
        firebaseRef.child(key).remove();
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var self = this; 
        if (this.state.email && this.state.email.trim().length !== 0) {
            self.firebaseRef.push({
                email: this.state.email,
                activities: [] 
            });
            this.setState({
                email: ''
            });
        }
    },

    render: function() {
        var content = this.state.isLoading ? (
            <span>loading</span>
        ) : (
            <div>
                <UsersList items={ this.state.items } removeUser={ this.removeUser } addActivity={ this.addActivity } />
                <form className="form-inline" onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <input className="form-control" onChange={ this.onChange } value={ this.state.email } />
                    </div>
                    <button type="submit" className="btn btn-default">{ 'Add participant' }</button>
                </form>
            </div>
        );
        return content;
    }
});

React.render(<App />, document.getElementById('app'));
