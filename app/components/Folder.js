import React from 'react';

class Folder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {newName: ""}
        this.handleClick = this.handleClick.bind(this)    
        this.handleCopy = this.handleCopy.bind(this)     
        this.handleCut = this.handleCut.bind(this)   
        this.handleRemove = this.handleRemove.bind(this)
        this.handleNewNameInputChange = this.handleNewNameInputChange.bind(this)
        this.handleRename = this.handleRename.bind(this)
    }
    handleClick() {        
        this.props.handler(this.props.name)        
    }
    handleCopy() {
        this.props.handleCopy(this.props.name, false)
    }  
    handleRename(event) {        
        this.setState({newName: ""})
        this.props.handleRename(this.props.name, this.state.newName)
        event.preventDefault()
    }
    handleNewNameInputChange(event) {
        this.setState({newName: event.target.value});        
    }
    handleCut() {
        this.props.handleCopy(this.props.name, true)
    }
    handleRemove() {
        this.props.handleRemove(this.props.name)
    }
    render() {
        return (
            <li>
                <span>📁</span>
                <button className="folder-button" onClick={this.handleClick}>{this.props.name}</button>                
                <button className="action-button" onClick={this.handleCopy}>Copy</button>
                <button className="action-button" onClick={this.handleCut}>Cut</button>
                <button className="action-button" onClick={this.handleRemove}>Remove</button>
                <form onSubmit={this.handleRename} style={{display: "inline"}}>                                                         
                    <input type="text" value={this.state.newName} onChange={this.handleNewNameInputChange}/>                   
                    <input type="submit" value="Rename" />        
                </form>
            </li>
        )
    }
}
export default Folder;