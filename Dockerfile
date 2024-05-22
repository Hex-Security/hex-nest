# Stage 1: Build the application
FROM node:16-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built application from the previous stage
COPY --from=build /usr/src/app/dist ./dist

# Copy any other necessary files (like configuration files)
COPY --from=build /usr/src/app/.env ./

# Expose the port the app runs on
EXPOSE 5434

# Command to run the application
CMD ["node", "dist/main"]
