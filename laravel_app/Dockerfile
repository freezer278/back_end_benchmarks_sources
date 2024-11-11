FROM freezer278/php_cli_prod_base:8.3

WORKDIR /app

COPY . ./

RUN composer install

RUN ./vendor/bin/rr get-binary

CMD php artisan octane:start --server=roadrunner --host=0.0.0.0 --rpc-port=6001 --port=3000
