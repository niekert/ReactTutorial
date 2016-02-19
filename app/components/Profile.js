/**
 * Created by NiekKruse on 2/18/16.
 */
import React from 'react';
import Repos from './Github/Repos';
import UserProfile from './Github/UserProfile';
import Notes from './Notes/Notes';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base';

const base = Rebase.createClass('https://shining-torch-7522.firebaseio.com/');

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [1, 2, 3],
            bio: {
                name: 'Niek Kruse'
            },
            repos: ['a', 'b', 'c']
        }
    }

    componentWillReceiveProps(nextProps) {
        base.removeBinding(this.ref);
        this.init(nextProps.params.username);
    }

    componentDidMount() { //This is used for Ajax requests and such
        this.ref = new Firebase('https://shining-torch-7522.firebaseio.com/');
        this.init(this.props.params.username);
    }

    init(username) {
        this.ref = base.bindToState(username, {
            context: this,
            asArray: true,
            state: 'notes'
        });

        getGithubInfo(username)
            .then(function (data) {
                this.setState({
                    bio: data.bio,
                    repos: data.repos
                });
            }.bind(this));
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    handleAddNote(newNote) {
        base.post(this.props.params.username, {
            data: this.state.notes.concat([newNote])
        });
    }

    render() {
        //noinspection JSUnresolvedVariable
        return (
            <div className="row">
                <div className="col-md-4">
                    <UserProfile username={this.props.params.username} bio={this.state.bio}/>
                </div>
                <div className="col-md-4">
                    <Repos username={this.props.params.username} repos={this.state.repos}/>
                </div>
                <div className="col-md-4">
                    <Notes username={this.props.params.username}
                           addNote={(newNote) => this.handleAddNote(newNote)}
                           notes={this.state.notes}/>
                </div>
            </div>
        );
    }
}

export default Profile;
