FROM php:8.2-fpm
LABEL org.opencontainers.image.authors="stephen@stephenneal.net"

# Update OS && install utilities
RUN apt-get update -y \
	&& apt-get install -y \
		expect-dev \
		g++ \
	    git \
	    imagemagick \
		libgmp-dev \
	    libfreetype6-dev \
	    libicu-dev \
	    libjpeg62-turbo-dev \
	    libzip-dev \
	    openssl \
	    procps \
	    sudo \
	    supervisor \
	    unzip \
	    zip \
	    zlib1g-dev

# Install Docker PHP extensions
RUN docker-php-ext-configure intl \
	&& docker-php-ext-configure gd \
		--with-freetype=/usr/include/ \
		--with-jpeg=/usr/include/ \
	&& docker-php-ext-install -j$(nproc) gd \
	&& docker-php-ext-install \
		gmp \
		intl \
		pcntl \
	    pdo \
	    pdo_mysql \
	    zip

# Copy PHP configuration files
COPY local.ini /usr/local/etc/php/conf.d/local.ini
COPY www.conf /usr/local/etc/php-fpm.d/www.conf

# Set working directory
WORKDIR /var/www/html

# Install Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy application skeleton (respects .dockerignore)
# Ensure .dockerignore is set up to exclude vendor, node_modules, .env etc.
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev --no-interaction --no-progress

# Set permissions for Laravel
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Copy Nginx site configuration
# This assumes nginx-site.conf is for Nginx and configured for Laravel
COPY nginx-site.conf /etc/nginx/sites-available/default
RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default || true \
    && rm /etc/nginx/sites-enabled/default.conf || true # Remove default Nginx config if it exists with this name

# Copy deploy script (which handles migrations, caching)
COPY deploy.sh /usr/local/bin/deploy.sh
RUN chmod +x /usr/local/bin/deploy.sh

# Expose port 80 for Nginx
EXPOSE 80

# CMD / ENTRYPOINT to start supervisor (which then starts nginx and php-fpm) will be added later.
# Frontend asset compilation (Node.js multi-stage build) will also be added later.
