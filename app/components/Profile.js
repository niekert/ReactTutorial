/**
 * Created by NiekKruse on 2/18/16.
 */
import React from 'react';
import Router from 'react-router';
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
import Notes from './Notes/Notes';
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

import getGithubInfo from '../utils/helpers';

var Profile = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function () {
        return {
            notes: [1, 2, 3],
            bio: {
                name: 'Niek Kruse'
            },
            repos: ['a', 'b', 'c']
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.unbind('notes');
        this.init(nextProps.params.username);
    },
    componentDidMount: function () { //This is used for Ajax requests and such
        this.ref = new Firebase('https://shining-torch-7522.firebaseio.com/');
        this.init(this.props.params.username);
    },
    init: function (username) {
        var childRef = this.ref.child(username);
        this.bindAsArray(childRef, 'notes'); //This also listens for changes

        getGithubInfo(username)
            .then(function (data) {
                this.setState({
                    bio: data.bio,
                    repos: data.repos
                });
            }.bind(this));
    },
    componentWillUnmount: function () {
        this.unbind('notes'); //Removes the listener
    },
    handleAddNote: function (newNote) {
        //Update firebase with new note
        this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote);
    },
    render: function () {
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
                           addNote={this.handleAddNote}
                           notes={this.state.notes}/>
                </div>
            </div>
        );
    }
});

module.exports = Profile;
