import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NotesList from "./components/NotesList";
import NoteModal from "./components/NoteModal";
import DeleteModal from "./components/DeleteModal";
import "./App.css";

class App extends Component {
	state = {
		notes: [],
		newNote: { title: "", content: "" },
		newModal: false,
		editModal: false,
		deleteModal: false,
		currentIndex: 0
	};

	componentWillMount() {
		let notes = JSON.parse(localStorage.getItem("notes")) || [];
		this.setState({ notes });
	}

	sortByEdited = () => {
		let notes = [...this.state.notes];
		notes.sort(function compare(a, b) {
			var dateA = new Date(a.edited);
			var dateB = new Date(b.edited);
			return dateB - dateA;
		});
		localStorage.setItem("notes", JSON.stringify(notes));
		this.setState({ notes });
	};

	openModal = (modal, currentIndex) => {
		this.setState({ [modal]: true });
		this.setState({ currentIndex });
	};

	closeModal = (modal, currentIndex) => {
		this.setState({ [modal]: false });
		this.setState({ currentIndex });
		this.sortByEdited();
	};

	updateNewNote(title, content) {
		let edited = String(new Date());
		this.setState({
			newNote: { title: title, content: content, edited: edited }
		});
	}

	editNote(title, content, currentIndex) {
		let edited = String(new Date());
		let notes = [...this.state.notes];
		notes[currentIndex] = {
			title: title,
			content: content,
			edited: edited
		};
		localStorage.setItem("notes", JSON.stringify(notes));

		this.setState({ notes });
	}

	saveNewNote(newNote, modal, currentIndex) {
		this.closeModal(modal, currentIndex);
		let notes = [...this.state.notes];
		notes.unshift(newNote);
		localStorage.setItem("notes", JSON.stringify(notes));
		this.setState({ notes });
		this.setState({ newNote: { title: "", content: "", edited: "" } });
	}

	deleteNote = currentIndex => {
		this.closeModal("deleteModal", currentIndex);
		this.setState({ currentIndex: 0 });
		let notes = [...this.state.notes];
		notes.splice(currentIndex, 1);
		localStorage.setItem("notes", JSON.stringify(notes));
		this.setState({ notes });
	};

	openModal_closeModal(close, open, currentIndex) {
		this.closeModal(close, currentIndex);
		this.openModal(open, currentIndex);
	}

	render() {
		const { notes, currentIndex, newModal, editModal, newNote } = this.state;
		let currentTitle, currentContent, lastEdited;
		if (notes.length > 0) {
			currentTitle = notes[currentIndex].title;
			currentContent = notes[currentIndex].content;
			lastEdited = notes[currentIndex].edited;
		} else {
			currentTitle = "";
			currentContent = "";
			lastEdited = "";
		}

		return (
			<div className="app">
				<div className="appHeader">MonoNote</div>
				<NotesList
					notes={notes}
					title={notes.title}
					content={notes.content}
					editNote={index => this.openModal("editModal", index)}
					newNote={() => this.openModal("newModal", currentIndex)}
				/>

				<NoteModal
					modalType={newModal}
					newModal={newModal}
					closeModal={() => this.closeModal("newModal", currentIndex)}
					updateNewTitle={event =>
						this.updateNewNote(event.target.value, newNote.content)
					}
					updateNewContent={event =>
						this.updateNewNote(newNote.title, event.target.value)
					}
					saveNewNote={() =>
						this.saveNewNote(newNote, "newModal", currentIndex)
					}
				/>
				<NoteModal
					modalType={editModal}
					editModal={editModal}
					closeModal={() => this.closeModal("editModal", currentIndex)}
					updateNewTitle={event =>
						this.editNote(
							event.target.value,
							notes[currentIndex].content,
							currentIndex
						)
					}
					updateNewContent={event =>
						this.editNote(
							notes[currentIndex].title,
							event.target.value,
							currentIndex
						)
					}
					currentTitle={currentTitle}
					currentContent={currentContent}
					edited={lastEdited}
					saveNewNote={() => this.closeModal("editModal", currentIndex)}
					deleteNote={() =>
						this.openModal_closeModal(
							"editModal",
							"deleteModal",
							currentIndex
						)
					}
				/>
				<DeleteModal
					closeModal={() => this.closeModal("deleteModal", currentIndex)}
					modalType={this.state.deleteModal}
					cancelDelete={() =>
						this.openModal_closeModal(
							"deleteModal",
							"editModal",
							currentIndex
						)
					}
					currentTitle={currentTitle}
					currentContent={currentContent}
					deleteNote={() => this.deleteNote(currentIndex)}
				/>
			</div>
		);
	}
}

export default App;
