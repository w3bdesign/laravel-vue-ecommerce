# nginx.render.dockerfile
# Use Laradock's Nginx image as a base
FROM laradock/nginx:latest

# Application code is expected to be in /var/www/html
# Nginx needs access to the public directory.
# We'll copy the application's public directory.
# Note: The php-fpm container builds the full app. For Nginx, we primarily need static assets.
# If your app has a build step for frontend assets that places them in public/,
# ensure that step is run before this Dockerfile builds or that the assets are copied.
# The php-fpm.render.dockerfile already copies the whole app, so assets should be there.

WORKDIR /var/www/html

# Copy only the public directory from the application source for Nginx to serve static files.
# The rest of the app (PHP files) will be handled by PHP-FPM.
# This assumes the build context for docker-compose is the project root.
COPY public ./public

# Copy custom Nginx site configuration for the Laravel application
# We will create 'laravel.render.conf' next.
COPY laravel.render.conf /etc/nginx/sites-available/default.conf

# Expose port 80 (already exposed by base image, but good for clarity)
EXPOSE 80

# CMD is inherited from laradock/nginx, which starts nginx.
