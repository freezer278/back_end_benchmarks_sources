FROM php:8.3-cli-alpine

WORKDIR /app

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apk add unzip

# install all needed php extensions
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod 777 /usr/local/bin/install-php-extensions
ARG PHP_EXTENSIONS="intl bcmath zip apcu exif pcntl sockets redis pdo_pgsql"
RUN install-php-extensions ${PHP_EXTENSIONS}
RUN rm /usr/local/bin/install-php-extensions

COPY . ./

RUN composer install

RUN ./vendor/bin/rr get-binary

CMD php artisan octane:start --server=roadrunner --host=0.0.0.0 --rpc-port=6001 --port=3000
