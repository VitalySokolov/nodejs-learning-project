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
```

Urls for Authentication:
```
localhost:<PORT>/api/auth - simple authentication
```

#SQL DB Server application

Required steps:
1. Install postgres db.
2. Create database.
3. Add user for this database.
4. Add next variables to .env file.
```
// .env

DB_USER=...
DB_PASS=...
DB_DATABASE=...
```

5. Install sequelize-cli
6. Run commands to create/populate tables.
```
sequelize db:migrate
sequelize db:seed:all
```
