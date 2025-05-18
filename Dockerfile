# Stage 1: Compile Frontend Assets
FROM node:20-alpine AS node_builder

WORKDIR /app/frontend

# Copy package files and essential build configuration
COPY package.json package-lock.json* webpack.mix.js tailwind.config.js postcss.config.js* .babelrc* ./
# Ensure postcss.config.js and .babelrc are optional by using * in case they don't exist

# Install all dependencies (including devDependencies like laravel-mix)
RUN npm ci

# Copy frontend source code (js, css, images, etc.)
COPY resources/js ./resources/js
COPY resources/css ./resources/css
COPY resources/img ./resources/img
# Add other relevant resource directories if needed

# Compile assets for production
RUN npm run production

# Stage 2: Setup PHP Application Environment using richarvey/nginx-php-fpm
FROM richarvey/nginx-php-fpm:3.1.6 AS app

# Set Laravel Environment Variables as per the article
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr
ENV APP_KEY ${APP_KEY} 
ENV SKIP_COMPOSER 1 
ENV WEBROOT /var/www/html/public 
ENV PHP_ERRORS_STDERR 1 # Send PHP errors to stderr for Docker logging
ENV RUN_SCRIPTS 1 # Enable execution of scripts in /scripts directory
ENV REAL_IP_HEADER 1 # If behind a proxy, trust X-Forwarded-For
ENV COMPOSER_ALLOW_SUPERUSER 1 # Allow composer to run as root if needed by scripts

# Set working directory
WORKDIR /var/www/html

# Copy all application files
COPY . .

# Copy compiled assets from the node_builder stage
COPY --from=node_builder /app/frontend/public ./public

# Copy our Nginx site configuration to the standard location for richarvey images
COPY nginx-site.conf /etc/nginx/sites-available/default

# Copy our deploy script to the location where richarvey image expects to run scripts
# Ensure deploy.sh has necessary commands (composer install, migrations, cache)
RUN mkdir -p /scripts
COPY deploy.sh /scripts/00-laravel-deploy.sh
RUN chmod +x /scripts/00-laravel-deploy.sh

# The base image (richarvey/nginx-php-fpm) handles starting Nginx, PHP-FPM,
# and running scripts from /scripts. Its default CMD is /start.sh.
CMD ["/start.sh"]
