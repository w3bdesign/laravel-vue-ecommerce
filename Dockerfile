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
FROM webdevops/php-nginx:8.2-alpine AS app

# Set working directory
# The webdevops images often use /app as the default document root for Nginx.
# We will set our application root to /var/www/html and ensure Nginx config reflects this.
WORKDIR /var/www/html

# Install system dependencies and PHP extensions
# webdevops images are comprehensive. Many extensions are pre-installed or can be enabled via env vars.
# We'll ensure pdo_mysql, gd, zip, bcmath, exif, opcache, intl are available.
# The `docker-php-ext-install` approach should still work for missing extensions.
# $PHPIZE_DEPS are build dependencies for compiling extensions.
USER root
RUN apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        libzip-dev \
        libpng-dev \
        jpeg-dev \
        freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip bcmath exif opcache intl \
    && apk del .build-deps \
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
# webdevops images typically load *.conf from /etc/nginx/conf.d/
# Or their main vhost config (which includes /app as root) is often in /etc/nginx/vhost.conf or part of the main nginx.conf
# We will place our specific Laravel config in conf.d to be included.
# Ensure our nginx-site.conf sets the root to /var/www/html/public.
COPY nginx-site.conf /etc/nginx/conf.d/app.conf

# Copy and set permissions for the deploy script
COPY deploy.sh /usr/local/bin/deploy.sh
RUN chmod +x /usr/local/bin/deploy.sh

# Expose port 80
EXPOSE 80
