/** @jsx React.DOM */
window.components = window.components || {};
window.components.UserActivities = React.createClass({

    getInitialState: function() {
        return {
            firebaseRef: null,
            time: '',
            activities: [],
            userId: this.props.userId
        };
    },

    componentWillMount: function() {
        this.firebaseRef = window.api.getUserActivities(this.props.userId, function(data) {
            this.setState({
                activities: data.activities
            });        
        }.bind(this));
    },

    onChange: function(e) {
        this.setState({
            time: e.target.value
        });
    },

    handleSubmit: function (key) {
        var self = this; 
        return function(e) {
            e.preventDefault();
            var time = self.state.time;
            var d = new Date();
            var activity;
            if (time && time.trim().length !== 0) {
                activity = {
                    time: time,
                    date: d.toString()
                };
                self.firebaseRef.push(activity);
                self.setState({
                    time: ''
                });
            }
        };
    },

    render: function() {
        var self = this;
        var activities = self.state.activities;
        var userId = self.state.userId;
        var totalTime = 0;
        activities.forEach(function(item) {
            totalTime += parseInt(item.time);    
        });
        totalTime = parseFloat(totalTime/60);
        return ( 
                <div>
                    <ul>
                        {activities.map(function(activity, key) {
                            return (
                                <li key={'activity' + key}>
                                    Elapsed time was <strong>{activity.time}</strong> seconds at {activity.date}
                                </li>
                            );
                        })}  
                    </ul>
                    <span>
                        Total time: 
                        <strong>{totalTime}</strong> minutes
                    </span>
                    <form className="form-inline" onSubmit={ self.handleSubmit(userId) }>
                        <div className="form-group">
                            <input className="form-control" onChange={ self.onChange } value={ self.state.time } />
                        </div>
                        <button type="submit" className={'btn btn-default'}>{ 'Add new activity in seconds' }</button>
                    </form>
                </div>
               );
    }
});
