import React from "react";
import {
	Button,
	Modal,
	FormControl,
	FormGroup,
	Glyphicon
} from "react-bootstrap";

const NoteModal = props => {
	let today = new Date(props.edited);
	let date = `${today.getDate()}/${today.getMonth() +
		1}/${today.getFullYear()}`;
	let time = `${today.getHours()}:${today.getMinutes()}`;
	let dateFormat = date + " " + time;

	let deleteButton, doneButton, cancelButton, saveButton, lastEdited;
	if (props.editModal) {
		deleteButton = (
			<div className="noteButton" onClick={props.deleteNote}>
				<Glyphicon glyph="glyphicon glyphicon-trash" />
				<p>Delete</p>
			</div>
		);
		doneButton = (
			<div className="noteButton" onClick={props.closeModal}>
				<Glyphicon glyph="glyphicon glyphicon-ok" />
				<p>Done</p>
			</div>
		);
		lastEdited = <p className="dateEdited">Last edited: {dateFormat}</p>;
	} else {
		cancelButton = (
			<div className="noteButton" onClick={props.closeModal}>
				<Glyphicon glyph="glyphicon glyphicon-share-alt" />
				<p>Cancel</p>
			</div>
		);
		saveButton = (
			<div className="noteButton" onClick={props.saveNewNote}>
				<Glyphicon glyph="glyphicon glyphicon-floppy-disk" />
				<p>Save</p>
			</div>
		);
	}

	// let lastEdited;
	// if (props.editModal) {
	// 	lastEdited = <p className="dateEdited">Last edited: {dateFormat}</p>;
	// }

	return (
		<Modal
			show={props.modalType}
			onHide={props.closeModal}
			className="noteModal"
			animation={false}
		>
			<Modal.Header>
				<FormControl
					className="noteTitle"
					type="text"
					placeholder="Create new note"
					value={props.currentTitle}
					onChange={props.updateNewTitle}
				/>
			</Modal.Header>
			<Modal.Body>
				<FormControl
					componentClass="textarea"
					className="noteContent"
					placeholder="Start writing..."
					value={props.currentContent}
					onChange={props.updateNewContent}
				/>
			</Modal.Body>

			<Modal.Footer>
				{lastEdited}
				<div className="modalButtons">
					{deleteButton}
					{doneButton}
					{cancelButton}
					{saveButton}
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default NoteModal;
