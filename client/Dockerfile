# Use Node.js as the base image
FROM --platform=linux/amd64 node:alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1

# Expose the development port
EXPOSE 3000

# Start the development server
CMD ["pnpm", "run", "dev"]
