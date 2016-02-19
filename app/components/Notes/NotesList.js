/**
 * Created by NiekKruse on 2/18/16.
 */
import React from 'react';

const NotesList = ({notes}) => {
    return (
        <ul className="list-group">
            {notes.map((note, index) => (
                <li className="list-group-item" key={index}>
                    {note}
                </li>
            ))}
        </ul>
    );
};

export default NotesList;
