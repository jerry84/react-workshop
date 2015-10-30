/** @jsx React.DOM */

window.components = window.components || {};
var TodoApp2 = React.createClass({
    getInitialState: function() {
        return {
            isLoading: true,
            items: [],
            email: ''
        };
    },

    componentWillMount: function() {
        this.firebaseRef = new Firebase(window.conf.firebaseUrl + '/users');
        this.firebaseRef.on('value', function(dataSnapshot) {
            var users = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var user = childSnapshot.val();
                user['.key'] = childSnapshot.key();
                user.activities = user.activities || [];
                users.push(user);
            });
            this.setState({
                isLoading: false,
                items: users
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
        var UsersList = window.components.UsersList;
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

React.render(<TodoApp2 />, document.getElementById('app'));
