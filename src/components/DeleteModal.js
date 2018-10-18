import React from "react";
import { Button, Modal, Glyphicon } from "react-bootstrap";

const DeleteModal = props => {
	return (
		<Modal show={props.modalType} animation={false} onHide={props.closeModal}>
			<Modal.Header className="noteTitle lighter crossout">
				{props.currentTitle}
			</Modal.Header>
			<Modal.Body className="deleteContent noteContent lighter crossout">
				{props.currentContent}
			</Modal.Body>
			<Modal.Footer>
				<div className="noteButton" onClick={props.cancelDelete}>
					<Glyphicon glyph="glyphicon glyphicon-share-alt" />
					<p>Cancel</p>
				</div>
				<div className="noteButton deleteButton" onClick={props.deleteNote}>
					<Glyphicon glyph="glyphicon glyphicon-trash" />
					<p>Confirm</p>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteModal;
