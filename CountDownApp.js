var CountDown = React.createClass({
    getInitialState: function (){
        return {
            startNumber: this.props.startNumber
        };
    },
    clickHandler: function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this.state.startNumber) {
            this.state.startNumber--;
            this.setState({
                startNumber: this.state.startNumber
            });
            
            if (this.state.startNumber === 0 && this.props.onComplete) {
                this.props.onComplete(); 
            }
        }
    },
    render: function() {
        var content = this.state.startNumber ? (
            <button onClick={this.clickHandler}>{this.state.startNumber}</button>
        ) : (
            <span>DONE!</span>
        ); 
        return content;
    }
});


var CountDowns = React.createClass({
    getInitialState: function (){
        return {
            list: this.props.list,
            total: 0
        };
    },
    onComplete: function () {
        this.state.total++;
        this.setState({
            total: this.state.total
        }); 
    },
    render: function() {
        var self = this;
        return (
            <div>
                {this.state.list.map(function (startNumber) {
                    return (
                        <CountDown startNumber={startNumber} onComplete={self.onComplete} />
                    );
                })}
                <div>Total: {this.state.total}</div>
            </div>
        );
    }
});

var CountDownApp = React.createClass({
    getInitialState: function (){
        return {
            list: this.props.list,
            value: ''
        };
    },
    changeHandler: function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.setState({
            value: evt.target.value
        });
    },
    submitHandler: function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.state.list.push(parseInt(this.state.value));
        this.setState({
            list: this.state.list,
            value: ''
        });
    },
    render: function() {
        var self = this;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input type="text" value={this.state.value} onChange={this.changeHandler} />
                    <button>Add</button>
                </form>
                <CountDowns list={this.state.list} />
            </div>
        );
    }
});
 
ReactDOM.render(
    <CountDownApp list={[3, 5, 3, 1]} />,
    document.getElementById('container')
);

