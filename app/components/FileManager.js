import './App.css';
import * as pathFunc from 'path';
import React, { Component } from 'react';
import List from './List.js'
import {createFolder, createFile, paste, remove, rename} from './utils/walkFolders.js'
import routes from '../constants/routes';
const fs = require('fs-extra')
class FileManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {path: "/", newFolderInputValue: "", newFileInputValue: "", fileToCopy: "", fileNameToCopy: "", move: false, loading: false}
    this._handler = this._handler.bind(this)
    this.handleCopy = this.handleCopy.bind(this)
    this.handlePaste = this.handlePaste.bind(this)
    this.handleRename = this.handleRename.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.backClicKHandler = this.backClicKHandler.bind(this)
    this.newFolderHandler = this.newFolderHandler.bind(this)
    this.handleNewFolderInputChange = this.handleNewFolderInputChange.bind(this)
    this.newFileHandler = this.newFileHandler.bind(this)
    this.handleNewFileInputChange = this.handleNewFileInputChange.bind(this)
  }
  componentDidMount() {
    console.log("componentDidMount")
    this.interval = setInterval(() => this.forceUpdate(), 300);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  _handler(newPath) {    
    this.setState((state) => ({
      path: pathFunc.join(state.path, newPath)      
    }))
  } 
  handleRename(oldName, newName) {
    rename(pathFunc.join(this.state.path, oldName), pathFunc.join(this.state.path, newName))
    // this.setState({ state: this.state});      
  }
  handleCopy(itemName, move) {    
    this.setState((state) => ({fileToCopy: pathFunc.join(state.path, itemName), fileNameToCopy: itemName, move}))
  }
  handleRemove(itemName) {
    remove(pathFunc.join(this.state.path, itemName))
    // this.setState({ state: this.state});    
  }
  handlePaste() {   
    if(pathFunc.dirname(this.state.fileToCopy) == this.state.path) {
      alert("Cannot paste in the same folder")
      return;
    }
    this.fsPaste(this.state.fileToCopy, pathFunc.join(this.state.path, this.state.fileNameToCopy), this.state.move);        
    // this.setState({ state: this.state});    
  }
  fsPaste(oldPath, newPath, move) {    
      if(move) {
        const this_ = this
        this.setState({loading:true})     
        fs.move(oldPath, newPath, {overwrite: false}, err =>{
          if(err) return alert(err)
          this_.setState({loading: false})
        })
      } else {   
        const this_ = this
        this.setState({loading:true})     
        fs.copy(oldPath, newPath, {overwrite: false}, err =>{
          if(err) return alert(err)
          this_.setState({loading: false})
        })               
      }    
  }
  handleNewFolderInputChange(event) {
    this.setState({newFolderInputValue: event.target.value});
  }
  handleNewFileInputChange(event) {
    this.setState({newFileInputValue: event.target.value});
  }
  backClicKHandler() {
    this.setState((state) => ({
      path: pathFunc.dirname(state.path)
    }))
  }
  newFolderHandler(event) {    
    createFolder(pathFunc.join(this.state.path, this.state.newFolderInputValue))
    this.setState({newFolderInputValue: ""})    
    event.preventDefault()
  }
  newFileHandler(event) {
    createFile(pathFunc.join(this.state.path, this.state.newFileInputValue))    
    this.setState({newFileInputValue: ""})    
    event.preventDefault()
  }
  render() {    
    const path = this.state.path     
    const first_name = localStorage.getItem("first_name")
    return (
      <div>
        <h1>Hello, {first_name} </h1>        
        <p>I hope you enjoy using this basic Electron file manager</p>                
        <button onClick={this.backClicKHandler} className="action-button">Back</button>                
        <button onClick={this.handlePaste} className="action-button">Paste</button>        
        <form onSubmit={this.newFolderHandler}>          
          <label>
            Name:
            <input type="text" value={this.state.newFolderInputValue} onChange={this.handleNewFolderInputChange}/>
          </label>        
          <input type="submit" value="New Folder" className="action-button" />
        </form>
        <form onSubmit={this.newFileHandler}>          
          <label>
            Name:
            <input type="text" value={this.state.newFileInputValue} onChange={this.handleNewFileInputChange}/>
          </label>        
          <input type="submit" value="New File" className="action-button" />
        </form>
        {this.state.loading ? <div><div className="loader"></div><p>Pasting...</p></div> : <br/>}
        <ul>
        <List path={path} handler={ this._handler } handleCopy={ this.handleCopy } handleRemove={ this.handleRemove } handleRename={ this.handleRename }/>
        </ul>
      </div>
    );
  }
}

export default FileManager;
