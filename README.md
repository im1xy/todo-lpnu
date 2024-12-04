# Basic Information
1. Frontend is on port 9000
2. Backend is on port 3000
3. Mongo is on port 27017
4. Node version 20.0.0
5. Mongo version 4.4.6

# Instruction to start the application
In case you want to run your AWS Cognito change userPoolId and userPoolClientId values in ./frontend/src/config/amplify.js

## With docker
1. In ./frontend/src/config/backend.js change url to address where you will run docker
2. Run: docker compose up -d

## Without docker
1. In ./frontend
    1. In ./src/config/backend.js change url to where you will run backend
    2. Run: npm install
    3. Run: npm run dev

2. In ./backend
    1. Create file .env, example values are provided in .env.example
    2. Run npm install
    3. Run npm run server

# Account Registration
1. Use your email, since you will need to enter confirmation code.
2. There are messages about what password should be like, but just in case I will also provide it here:
   * Password minimum length 8 character(s)
   * Contains at least 1 number
   * Contains at least 1 special character
   * Contains at least 1 uppercase letter
   * Contains at least 1 lowercase letter