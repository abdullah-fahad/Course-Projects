import React, {Component} from 'react';
import './App.css';
import Preview from './components/Preview/Preview.js';
import Message from './components/Message/Message.js';
import Notes from './components/Notes/Notes.js';
import NotesList from './components/Notes/NotesList.js';
import Note from './components/Notes/Note.js';

class App extends Component {

    constructor(props){


        super(props);

        this.state = {
            notes: [],
            title: "",
            content: "",
            selectedNote: null,
            creating: false,
            editing: false,
            addButtonState: false
        }
    }
    componentWillMount() {
        if (localStorage.getItem('notes')) {
            this.setState({notes: JSON.parse(localStorage.getItem('notes'))});
        }else {
            localStorage.setItem('notes', JSON.stringify([]));
        }
        console.log(localStorage.getItem('notes'));
    }
    
    saveToLocalStorage = (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    }
    SetNoteTitle = (event) => {
        this.setState({title: event.target.value})
    }
    SetNoteContent = (event) => {
        this.setState({content: event.target.value});
    }
    AddButtonIsOnClick = () => {
        this.setState({});
        this.setState({addButtonState: true, creating: true, editing: false, title: '', content: ''});
    }
    SaveButtonIsOnClick = () => {
        this.setState({addButtonState: false});
       const {title, content, notes} = this.state;
       const note = {
           id: new Date(),
           title: title,
           content: content
       };
       const updatedNotes = [...notes, note];
       this.saveToLocalStorage('notes', updatedNotes);
       this.setState({notes: updatedNotes, creating: false, selectedNote: note.id, title: '', content: ''});

    }
    cancelSaveButtonIsOnClick = () => {
        this.setState({creating: false, addButtonState: false});
    }
    cancelEditButtonIsOnClick = () => {
        this.setState({editing: false});
    }
    updateNote = () => {
        const {title, content, notes, selectedNote} = this.state;
        const updatedNotes = [...notes];
        const noteIndex = notes.findIndex(note => note.id === this.state.selectedNote);

        updatedNotes[noteIndex] = {
            id : selectedNote,
            title : title,
            content : content 
        }
        this.saveToLocalStorage('notes', updatedNotes);
        this.setState({
            notes: updatedNotes,
            editing: false,
            creating: false,
            title:"",
            content:""
        });
    }
    selectNote = (noteId) => {
        this.setState({selectedNote: noteId, creating: false, editing: false});
    }
    editNote = () => {
        const note = this.state.notes.filter(note => note.id === this.state.selectedNote)[0];

        this.setState({editing:true, title: note.title, content: note.content});
    }
    deleteNote = () => {
        const updatedNotes = [...this.state.notes]
        const noteIndex = updatedNotes.findIndex(note => note.id === this.state.selectedNote);
        updatedNotes.splice(noteIndex, 1);
        alert('???????? ?????? ?????????????? ????????');
        this.saveToLocalStorage('notes', updatedNotes);
        this.setState({notes: updatedNotes, selectedNote: null}); 
    }

    getAddNote = () => {
        //???????? ?????????? ???????????? ??????????
        return (
            <div>
            <h2>?????????? ???????????? ??????????</h2>
            <div>
                <input
                    type="text"
                    name="title"
                    className="form-input mb-30"
                    placeholder="???????? ?????????? ???????????????? ??????"
                    value={this.state.title}
                    onChange={this.SetNoteTitle}
                />

                <textarea
                    rows="10"
                    name="content"
                    className="form-input"
                    placeholder="???????? ?????????? ???????????????? ??????"
                    value={this.state.content}
                    onChange={this.SetNoteContent}
                    
                />

                <a href="#" className="button green" onClick={this.SaveButtonIsOnClick}>??????</a>
                <a href="#" className="button grey" onClick={this.cancelSaveButtonIsOnClick}>?????????? ??????????</a>
            </div>

        </div>
        );
    }

     getPreview = () => {
         const {notes, selectedNote} = this.state; 

         if (notes.length === 0) {
             return <Message msg='???? ???????? ??????????????' />
         }

         if (!selectedNote) {
             return <Message msg="???????????? ???????????? ???????????? ????????????" />
         }

        

         const note = notes.filter(note => {return note.id === selectedNote})[0]
          let noteDisplay = (
        <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
        </div>
         );
         if (this.state.editing){
             noteDisplay = (
                <div>
                <h2>?????????? ????????????????</h2>
                <div>
                    <input
                        type="text"
                        name="title"
                        className="form-input mb-30"
                        placeholder="???????? ?????????? ???????????????? ??????"
                        value={this.state.title}
                        onChange={this.SetNoteTitle}
                    />
    
                    <textarea
                        rows="10"
                        name="content"
                        className="form-input"
                        placeholder="???????? ?????????? ???????????????? ??????"
                        value={this.state.content}
                        onChange={this.SetNoteContent}
                        
                    />
    
                    <a href="#" className="button green" onClick={this.updateNote}>?????? ??????????????????</a>
                    <a href="#" className="button grey" onClick={this.cancelEditButtonIsOnClick}>?????????? ??????????</a>
                </div>
    
            </div>
             );
         }
         //???????? ?????? ???????????????? ????????????????
        return (
            <div>
                {this.state.editing===false && 
                <div className="note-operations">
                    <a href="#" onClick={this.editNote}><i className="fa fa-pencil-alt"/></a>
                    <a href="#" onClick={this.deleteNote}><i className="fa fa-trash"/></a>
                </div>
                }
                
                <div>
                    {noteDisplay}
                </div>
            </div>
        );
    };

    render() {
        //???????????? ????????????????
        return (
            <div className="App">
                <Notes>
                    <NotesList>
                        {this.state.notes.map(note =>
                        <Note 
                          title={note.title} 
                          noteClicked={() => this.selectNote(note.id)} 
                          active={this.state.selectedNote === note.id}
                          />)}                 
                    </NotesList>
                    <button className={this.state.addButtonState? 'hide-add-btn':'add-btn'} onClick={this.AddButtonIsOnClick}>
                        +
                    </button>
                </Notes>

                <Preview>
                    {this.state.creating? this.getAddNote():this.getPreview()}
                </Preview>
            </div>
        );
        
    }
}

export default App;
