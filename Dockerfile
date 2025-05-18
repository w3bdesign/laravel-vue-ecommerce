FROM php:8.4-fpm
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