# Use the specific Node.js version
FROM node:22.1-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy your application code and other necessary files such as .env
COPY . .

# Copy the .env file explicitly
COPY .env .env

# Build the TypeScript files
RUN npm run build

# Your app listens on port 4000, make sure to expose this port
EXPOSE 4000

# Define the command to run your app
CMD [ "node", "dist/gateway.js" ]
