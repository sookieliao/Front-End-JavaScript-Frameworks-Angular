

## Initial Server set-up using json-server

The Node module, json-server, provides a very simple way to set up a web server that supports a full-fledged REST API server. We will talk about REST API in the next lesson. It can also serve up static web content from a folder. This lesson will leverage these two features to provide the back-end for your Angular application. In this exercise, you will configure and start a server using json-server to enable serving your application data to your Angular application. At the end of this exercise, you will be able to:

  *  Configure and start a simple server using the json-server module
  *  Configure your server to serve up static web content stored in a folder named public.
  
#### Installing json-server
  * json-server is a node module, and hence can be installed globally by typing the following at the command prompt:<br/>
    `sudo npm install -g json-server` <br/>
    (`sudo` is specific for Linux or OSX users.)

#### Configuring the Server
  * At any convenient location on your computer, create a new folder named json-server, and move to this folder.
  * Download the db.json file provided to this folder.
  * Move to this folder in your terminal window, and type the following at the command prompt to start the server:<br/>
  `json-server --watch db.json -d 2000 `<br/>
  (`--watch db.json` will monitor the server and refresh the server whenever there's change being made. `-d 2000 ` is to simulate latency.)
<br/>

  * This should start up a server at port number 3000 on your machine. The data from this server can be accessed by typing the following addresses into your browser address bar:<br/>
  `http://localhost:3000/dishes`<br/>
  `http://localhost:3000/promotions`<br/>
  `http://localhost:3000/leaders`<br/>
  `http://localhost:3000/feedback`<br/>

#### Serving up the images.
  * The json-server also provides a static web server. Any resources that you put in a folder named **public** in the json-server folder above, will be served by the server at the following address:<br/>
  `http://localhost:3000/path.file-name`<br/>
  
  * Shut down the server by typing ctrl-C in the terminal window.


