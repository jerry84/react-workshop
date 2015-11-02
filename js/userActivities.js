/** @jsx React.DOM */
window.components = window.components || {};
window.components.UserActivities = React.createClass({

    getInitialState: function() {
        return {
        };
    },

    componentWillMount: function() {
        this.firebaseRef = window.api.getUserActivities(this.props.userId, function(data) {
            this.setState({
                activities: data.activities
            });        
        }.bind(this));
    },

    render: function() {
        return ('');
    }
});
