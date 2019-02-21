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

For server application the file '.env' is needed to be placed in the project's root.
In this file all environment variables could be set.
Next variables are required to start the server.
```
// .env

JWT_PRIVATE_KEY=...
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
GOOGLE_CONSUMER_KEY=...
GOOGLE_CONSUMER_SECRET=...
TWITTER_CONSUMER_KEY=...
TWITTER_CONSUMER_SECRET=...
```

Urls for Authentication:
```
localhost:<PORT>/api/auth - simple authentication
localhost:<PORT>/api/auth/login - passport LocalStrategy authentication
localhost:<PORT>/api/auth/facebook/login - passport FacebookStrategy authentication
localhost:<PORT>/api/auth/google/login - passport GoogleStrategy authentication
localhost:<PORT>/api/auth/twitter/login - passport TwitterStrategy authentication
```


#Server application
