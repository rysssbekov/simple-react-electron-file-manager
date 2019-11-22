const fs = require('fs-extra')
const path = require('path')

/**
 * Generator function that lists all files in a folder recursively
 * in a synchronous fashion
 *
 * @param {String} folder - folder to start with
 * @param {Number} recurseLevel - number of times to recurse folders
 * @returns {IterableIterator<String>}
 */
function *walkFolders (folder, recurseLevel = 0) {
  try {
    const files = fs.readdirSync(folder)

    for (const file of files) {
      try {
        const pathToFile = path.join(folder, file)
        const stat = fs.statSync(pathToFile)
        const isDirectory = stat.isDirectory()
        if (isDirectory && recurseLevel > 0) {
          yield * walkFolders(pathToFile, recurseLevel - 1)
        }
        else {
          yield {
            rootDir: folder,
            fileName: file,
            isDir: isDirectory,
            stat: stat
          }
        }
      }
      catch (err) {
        yield {
          rootDir: folder,
          fileName: file,
          error: err
        }
      }
    }
  }
  catch (err) {
    yield {
      rootDir: folder,
      error: err
    }
  }
}
export function getFolders (absolutePath) {
    let entities = {
      folders: [],
      files: []
    }

    // check incoming arg
    if (!absolutePath || typeof absolutePath !== 'string') {
      return entities
    }

    for (const fileInfo of walkFolders(absolutePath, false)) {
      // all files and folders      )
      if ('error' in fileInfo) {
        console.error(`Error: ${fileInfo.rootDir} - ${fileInfo.error}`)
        continue
      }
      // we only want folders
      if (!fileInfo.isDir) {
        entities.files.push(fileInfo)
        continue
      }      
      entities.folders.push(fileInfo)
    }
    return entities
}
export function createFolder(path) {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        alert(err)
      }
    });
}
export function createFile(path) {
    try {
      fs.writeFileSync(path, "")
    } catch(err) {
      alert(err);
    }
}
export function paste(oldPath, newPath, move) {
  try {
    if(move) {
      fs.moveSync(oldPath, newPath, { overwrite: false })
    } else {
      // fs.copySync(oldPath, newPath, { overwrite: false })
      fs.copy(oldPath, newPath, {overwrite: false}, err =>{
        if(err) return console.error(err)
        console.log("sucesss")
      })
      console.log("after copy")
    }
  } catch(err) {
    alert(err);
  }
}
export function remove(path) {
  try {
    fs.removeSync(path)
  } catch(err) {
    alert(err)
  }
}
export function rename(oldPath, newPath) {
  try {
    fs.renameSync(oldPath, newPath);
  } catch(err) {
    alert(err)
  }
}