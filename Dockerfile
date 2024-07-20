# Use the official PHP image
FROM php:7.4-apache AS php-apache

# Enable mod_rewrite
RUN a2enmod rewrite headers

# Copy the PHP source code into the container
COPY ./backend /var/www/html/

# Copy custom Apache configuration file
COPY ./apache-config.conf /etc/apache2/sites-available/000-default.conf

# Install necessary PHP extensions
RUN docker-php-ext-install mysqli

# Set working directory
WORKDIR /var/www/html

# Use the official Node.js image
FROM node:14 AS node

# Set working directory
WORKDIR /usr/src/app

# Copy the frontend source code into the container
COPY ./frontend /usr/src/app/frontend
COPY ./package.json /usr/src/app/
COPY ./app.js /usr/src/app/

# Install Node.js dependencies
RUN npm install

# Expose the port for the frontend
EXPOSE 3000

# Command to run the frontend server
CMD ["npm", "start"]