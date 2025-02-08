# Use Node.js as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files separately for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy the rest of the application
COPY . .

# Build the project
RUN npm run build

# Expose the port used by Vite
EXPOSE 4174

# Start the production server
CMD ["npm", "run", "preview"]
