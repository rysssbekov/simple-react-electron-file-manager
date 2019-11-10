# Simple React Electron file manager
## Install

First, clone the repo via git:

```bash
git clone --depth 1 --single-branch --branch master https://github.com/rysssbekov/simple-react-electron-file-manager your-project-name
```

And then install the dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

First, refer to the [Multi Platform Build docs](https://www.electron.build/multi-platform-build) for dependencies.

Then,

```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package --[option]
```

## Libraries used
[electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) 
[fs](https://nodejs.org/api/fs.html) - file system methods in JS
[bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - password encryption/decryption (security)
## Demo
[YouTube](https://www.youtube.com/watch?v=E6Ww7A42jwQ&feature=youtu.be)
## Note
The program was only properly tested on Linux, so a smooth work on other operating systems such as Windows and MacOS is not guaranteed
