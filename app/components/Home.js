/**
 * Created by NiekKruse on 2/18/16.
 * Home component
 */
var React = require('react');

var Home = React.createClass({
    render: function () {
        return (
            <h2 className="text-center">
                Search by Github username above
            </h2>
        );
    }
});

module.exports = Home;
