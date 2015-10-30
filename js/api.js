window.api = window.api || {
    getUsers: function(callback) {
        var firebaseRef;
        firebaseRef = new Firebase(window.conf.firebaseUrl + '/users');
        firebaseRef.on('value', function(dataSnapshot) {
            var users = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var user = childSnapshot.val();
                user['.key'] = childSnapshot.key();
                user.activities = user.activities || [];
                users.push(user);
            });

            callback && callback({
                users: users
            });
        });
        
        return firebaseRef;
    },
    getUserActivities: function(id, callback) {
        var firebaseRef;
        firebaseRef = new Firebase(window.conf.firebaseUrl + '/users/' + id + '/activities');
        firebaseRef.on('value', function(dataSnapshot) {
            var activities = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var activity = childSnapshot.val();
                activity['.key'] = childSnapshot.key();
                activities.push(activity);
            });

            callback && callback({
                activities: activities
            });
        });
        
        return firebaseRef;
    }
};

