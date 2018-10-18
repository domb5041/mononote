import React from "react";
import { Panel } from "react-bootstrap";

const NotesList = props => {
	return (
		<div className="notesContainer">
			<Panel className="noteList" onClick={props.newNote}>
				<Panel.Heading className="noteTitle lighter">
					Create New note
				</Panel.Heading>
				<Panel.Body className="noteContent lighter">
					Start writing...
				</Panel.Body>
			</Panel>
			{props.notes.map((note, index) => {
				const panelSize = {};
				const textSize = {};
				let fadeBlock;

				if (note.content.length < 460) {
					panelSize.overflow = "auto";
					panelSize.height = "auto";
				} else {
					panelSize.overflow = "hidden";
					panelSize.height = "300px";
					textSize.position = "absolute";
					fadeBlock = <div className="fadeout" />;
				}

				return (
					<Panel
						key={index}
						eventKey={index}
						className="noteList"
						onClick={() => props.editNote(index)}
						style={panelSize}
					>
						<Panel.Heading className="noteTitle">
							{note.title}
						</Panel.Heading>

						<Panel.Body style={textSize} className="noteContent">
							{note.content}
						</Panel.Body>
						{fadeBlock}
					</Panel>
				);
			})}
		</div>
	);
};

export default NotesList;
