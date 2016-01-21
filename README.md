# Quick Sass Builder

This project will allow you to quickly create a html project and compile scss and serve using Browser-Sync.

## Get Started
Download the project from the command line
`curl -L https://github.com/bbodine1/quick-sass-builder/archive/latest.tar.gz | tar zx`

Change directory into the folder `quick-sass-builder`

Run `npm install`

Run `npm start` or `gulp` . Either do the same thing.

Edit app files as needed. The project source files are located in the `app` folder. This will be configurable in the future by editing the `gulpfile.js`

## Project Configurations
#### Change the name of the src directory

From within the project folder
* Rename the src directory (default is 'app')
```mv -f app yourDirName```

* Open the gulpfile and change the 'paths' 'src' to `yourDirName`

Now when you run the project it will use the new src folder name. Do not change the name of the folders inside of your src folder. It can be done but not without modifying the gulpfile extensively.
