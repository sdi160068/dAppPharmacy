# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install Truffle globally
RUN npm install -g truffle

# Display the versions of Node.js, npm, and Truffle to confirm installation
RUN node -v && npm -v && truffle version

# give permissions for running of script
COPY script.sh ./script.sh
RUN chmod +x script.sh

# Expose port 8545 for development purposes (commonly used by Ethereum clients)
EXPOSE 7545

# Set the command to start a bash shell when the container runs
CMD ["bash"]
