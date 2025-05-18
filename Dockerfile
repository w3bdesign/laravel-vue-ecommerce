# Stage 1: Compile Frontend Assets
FROM node:20-alpine AS node_builder

WORKDIR /app/frontend

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
# Copy build configuration files
COPY webpack.mix.js tailwind.config.js postcss.config.js* .babelrc* ./
# Ensure postcss.config.js and .babelrc are optional by using *

# Install dependencies for building assets
# Using npm ci for cleaner installs if package-lock.json is present and up-to-date
RUN npm ci --production

# Copy frontend source code
COPY resources/js ./resources/js
COPY resources/css ./resources/css
COPY resources/img ./resources/img
# Add other resource directories if you have them (e.g., resources/fonts)

# Compile assets
RUN npm run production

# Stage 2: Setup PHP Application Environment
FROM ric_harvey/nginx-php-fpm:php82 AS app

# Set working directory
WORKDIR /var/www/html

# Install system dependencies and PHP extensions
# The ric_harvey/nginx-php-fpm image should have most common extensions.
# We'll add pdo_mysql, gd, zip, bcmath, exif, opcache, intl if they are not present.
# This often requires root access, then dropping back to www-data.
# The exact commands depend on the base image's package manager (apk for Alpine).
USER root
RUN apk add --no-cache \
        libzip-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip bcmath exif opcache intl \
    && apk del libzip-dev libpng-dev libjpeg-turbo-dev freetype-dev \
    && rm -rf /var/cache/apk/*

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files (respecting .dockerignore)
COPY . .

# Copy compiled assets from the node_builder stage
COPY --chown=www-data:www-data --from=node_builder /app/frontend/public ./public

# Set permissions for Laravel storage and bootstrap cache
# Ensure these directories exist before chown/chmod if copying doesn't create them fully.
RUN mkdir -p storage/framework/sessions storage/framework/cache/data storage/framework/views storage/logs \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Copy Nginx site configuration
# The ric_harvey image might use /etc/nginx/conf.d/default.conf or similar.
# We'll assume /etc/nginx/sites-available/default and ensure it's linked or directly used.
COPY nginx-site.conf /etc/nginx/sites-available/default
# If sites-enabled is used: RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Copy and set permissions for the deploy script
COPY deploy.sh /usr/local/bin/deploy.sh
RUN chmod +x /usr/local/bin/deploy.sh

# Expose port 80
EXPOSE 80