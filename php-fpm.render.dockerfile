# php-fpm.render.dockerfile
ARG LARADOCK_PHP_VERSION=8.2
FROM laradock/php-fpm:${LARADOCK_PHP_VERSION}

# Set working directory
WORKDIR /var/www/html

# Install pdo_mysql if not present by default in this specific Laradock base
# (Laradock's build process for php-fpm usually includes common extensions based on its .env)
# For a production image, ensure all necessary extensions are explicitly built or verified.
# Example: RUN docker-php-ext-install pdo_mysql zip bcmath pcntl exif sockets ...

# Copy application code from the build context (project root)
COPY . .

# Install Composer dependencies
# Composer should be available in the laradock/php-fpm base image.
RUN composer install --no-dev --no-interaction --no-progress --optimize-autoloader

# Run Laravel optimizations
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Ensure storage, bootstrap/cache, and public directories are writable by www-data
# Adjust ownership/permissions as necessary for your application's needs.
# The user for php-fpm is typically www-data.
RUN chown -R www-data:www-data storage bootstrap/cache public && \
    chmod -R 775 storage bootstrap/cache public

# Expose port 9000 for PHP-FPM (already exposed by base image, but good for clarity)
EXPOSE 9000

# The CMD is inherited from laradock/php-fpm, which starts php-fpm.
