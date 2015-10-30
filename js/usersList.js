/** @jsx React.DOM */
window.components = window.components || {};
var UserActivities = window.components.UserActivities;
window.components.UsersList = React.createClass({

    getInitialState: function() {
        return {
            time: 0,
            date: ''
        };
    },

    render: function() {
        var _this = this;
        var createItem = function(item, index) {
            var activities = []; 
            var keys = Object.keys(item.activities || {});
            keys.forEach(function(key) {
                var activity = item.activities[key];
                activities.push(activity);
            });
            return (
                <tr key={ index }>
                    <td>
                        { item.email }
                        ({ Object.keys(item.activities).length })
                        <hr/>
                        <UserActivities userId={item['.key']} activities={activities} onAdd={_this.props.addActivity} /> 
                    </td>
                    <td>  
                        <button className="btn btn-danger" onClick={ _this.props.removeUser.bind(null, item['.key']) }> delete user</button>
                    </td>
                </tr>
            );
        };
        return ( 
                <table className="table table-bordered table-hover">
                    <tbody>
                        { this.props.items.map(createItem) }
                    </tbody>
                </table>
               );
    }
});
