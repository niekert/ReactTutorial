/**
 * Created by NiekKruse on 2/18/16.
 */
var React = require('react');

var Repos = React.createClass({
    propTypes: {
        username: React.PropTypes.string.isRequired,
        repos: React.PropTypes.array.isRequired
    },
    render: function () {
        var repos = this.props.repos.map(function (repo, index) {
            //noinspection JSUnresolvedVariable
            return (
                <li className="list-group-item" key={index}>
                    {repo.html_url && <h4><a href={repo.html_url}>{repo.name}</a></h4>}
                    {repo.description && <p> {repo.description} </p>}
                </li>
            );
        });
        return (
            <div>
                <h3> User repos</h3>
                <ul className="list-group">
                    {repos}
                </ul>
            </div>
        )
    }
});

module.exports = Repos;
