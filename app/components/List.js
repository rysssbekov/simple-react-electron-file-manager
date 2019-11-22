import {getFolders} from './utils/walkFolders.js'
import Folder from './Folder.js'
import File from './File.js'
import * as fs from 'fs';
import * as url from 'url';
import React from 'react';
class List extends React.Component {     
    constructor(props) {
        super(props);
    }  
    render() {                
        const items = getFolders(this.props.path)
        console.log("List")
        console.log(items)
        const props = this.props;                
        const folderItems = items.folders.map((item) =>             
                <Folder key={item.fileName} rootDir={item.rootDir} name={item.fileName} handleCopy={props.handleCopy} handler={props.handler} handleRemove={props.handleRemove} handleRename={props.handleRename}></Folder>            
        );
        const fileItems = items.files.map((item) =>             
                <File key={item.fileName} name={item.fileName} handleCopy={props.handleCopy} handleRemove={props.handleRemove} handleRename={props.handleRename} />            
        );                                     
        return [folderItems, fileItems]
    }
}
export default List
{/* <Col sm={4}>
{itemList[i*4 + 1]}
</Col>
<Col sm={4}>
{itemList[i*4 + 2]}
</Col>
<Col sm={4}>
{itemList[i*4 + 3]}
</Col> */}