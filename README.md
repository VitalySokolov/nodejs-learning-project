# nodejs-learning-project
NodeJS Learning Project

# Pre-reqs
To build and run this app locally you will need:
- Install [Node.js](https://nodejs.org/en/)

# Getting started
- Clone the repository
```
git clone https://github.com/VitalySokolov/nodejs-learning-project.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Run Async Development app
```
npm run cli-app
```
# Async Development task
Implemented watching csv in the 'data' folder.
- Watch works only for .csv files.
- Only create, rename and delete operations are checked. Changes in files are not checked
 (Note: every CSV file in a directory should be processed only once.).
- Delay is set in the config.json file - "csvProcessingDelay" parameter.

# Streams util task
Display utils usage with command:
```
node src/utils/streams.js --action=readme
```

#Servers section
Run simple plain text server
```
npm run text-server
```

Run simple html server
```
npm run html-server
```

Run simple json server
```
npm run json-server
```

Run simple echo server
```
npm run echo-server
```

Run server application
```
npm start
```

#Server application
