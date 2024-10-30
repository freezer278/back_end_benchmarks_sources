FROM php:8.3-fpm-alpine

# Install packages
RUN apk add --no-cache curl git build-base zlib-dev oniguruma-dev autoconf bash zip unzip ffmpeg

# Xdebug
ARG INSTALL_XDEBUG=false
RUN if [ ${INSTALL_XDEBUG} = true ]; \
    then \
      pecl install xdebug && docker-php-ext-enable xdebug; \
    fi;
COPY ./docker/php_fpm/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# Php extensions
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod 777 /usr/local/bin/install-php-extensions
ARG PHP_EXTENSIONS="ldap intl pdo_pgsql xml bcmath mbstring zip sqlite3 apcu exif redis"
RUN install-php-extensions ${PHP_EXTENSIONS}
RUN rm /usr/local/bin/install-php-extensions

WORKDIR /var/www

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

CMD php-fpm

EXPOSE 9000
