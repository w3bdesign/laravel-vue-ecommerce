# Stage 1: Base with PHP, Composer, and common extensions
# We'll use an official PHP image as a base for PHP-FPM
FROM php:8.2-fpm-alpine AS php_base

# Install system dependencies for PHP extensions and other tools
RUN apk add --no-cache \
    bash \
    curl \
    git \
    supervisor \
    nginx \
    # For common PHP extensions
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    icu-dev \
    libxml2-dev \
    # For pdo_mysql
    mysql-client

# Install PHP extensions
# You can customize this list based on Laradock's PHP-FPM Dockerfile or your app's needs
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        gd \
        intl \
        opcache \
        pdo_mysql \
        zip \
        xml \
        bcmath \
        pcntl \
        exif \
        sockets

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory for the application
WORKDIR /var/www/html

# Copy application code
COPY . .

# Install Composer dependencies
RUN composer install --no-dev --no-interaction --no-progress --optimize-autoloader

# Optimize Laravel (optional here, can also be done at runtime start, but better in image)
RUN php artisan config:cache
RUN php artisan route:cache
# RUN php artisan view:cache # view:cache can sometimes be problematic if paths change

# Fix permissions for storage and bootstrap cache
RUN chown -R www-data:www-data storage bootstrap/cache public \
    && chmod -R 775 storage bootstrap/cache public

# Stage 2: Final image with Nginx and Supervisor
FROM alpine:latest

# Copy PHP-FPM and application from the php_base stage
COPY --from=php_base /usr/local/etc/php-fpm.d/ /usr/local/etc/php-fpm.d/
COPY --from=php_base /usr/local/etc/php/ /usr/local/etc/php/
COPY --from=php_base /usr/local/sbin/php-fpm /usr/local/sbin/php-fpm
COPY --from=php_base /usr/local/bin/php /usr/local/bin/php
COPY --from=php_base /usr/bin/composer /usr/bin/composer
COPY --from=php_base /var/www/html /var/www/html
COPY --from=php_base /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Install Nginx and Supervisor from Alpine packages (if not already in php_base or if we want a clean stage)
RUN apk add --no-cache nginx supervisor mysql-client bash

# Create Nginx log directory if it doesn't exist from package install
RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    mkdir -p /var/lib/nginx && \
    chown -R nginx:nginx /var/lib/nginx && \
    # Create run directory for php-fpm and nginx pid
    mkdir -p /run/php && \
    mkdir -p /run/nginx

# Copy Nginx configuration
# We will create these files next: nginx.conf and supervisord.conf
COPY nginx-prod.conf /etc/nginx/nginx.conf
# COPY laravel-site.conf /etc/nginx/http.d/default.conf

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisord.conf

# Application root
WORKDIR /var/www/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
