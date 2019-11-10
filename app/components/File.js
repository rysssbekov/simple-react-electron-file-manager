import React from 'react';
class File extends React.Component {
    constructor(props) {
        super(props);       
        this.state = {newName: ""}
        this.handleCopy = this.handleCopy.bind(this)        
        this.handleCut = this.handleCut.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleNewNameInputChange = this.handleNewNameInputChange.bind(this)
        this.handleRename = this.handleRename.bind(this)
    }   
    handleCopy() {
        this.props.handleCopy(this.props.name, false)
    }  
    handleCut() {
        this.props.handleCopy(this.props.name, true)
    }
    handleRemove() {
        this.props.handleRemove(this.props.name)
    }
    handleRename(event) {        
        this.setState({newName: ""})
        this.props.handleRename(this.props.name, this.state.newName)
        event.preventDefault()
    }
    handleNewNameInputChange(event) {
        this.setState({newName: event.target.value});        
    }
    render() {
        return (
            <li><span>📄 </span><b>{this.props.name}</b>
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
export default File;