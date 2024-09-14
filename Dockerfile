# Use the Node.js 20 Alpine base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy over package files and Prisma schema
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port for the app (3000 for Next.js)
EXPOSE 3000

# Command to run the app in production mode
CMD ["npm", "run", "start"]
