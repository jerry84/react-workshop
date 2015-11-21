/** @jsx React.DOM */

window.components = window.components || {};
var UsersList = window.components.UsersList;
var App = React.createClass({
    getInitialState() {
        return {
            isLoading: true,
            items: [],
            email: ''
        };
    },

    componentWillMount() {
        this.firebaseRef = window.api.getUsers(function(data) {
            this.setState({
                isLoading: false,
                items: data.users
            });
        }.bind(this));
    },

    componentWillUnmount() {
        this.firebaseRef.off();
    },

    onChange(e) {
        this.setState({
            email: e.target.value
        });
    },

    removeUser(key) {
        var firebaseRef = new Firebase(window.conf.firebaseUrl + '/users/');
        firebaseRef.child(key).remove();
    },

    handleSubmit(e) {
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

    render() {
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
