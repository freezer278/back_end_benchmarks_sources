build_octane_road_runner_image:
	docker buildx use multiarch
	docker buildx build --platform linux/amd64,linux/arm64 --push --tag=freezer278/laravel_octane_rr_benchmark .

build_nginx_and_php_fpm_images: build_nginx_image build_php_fpm_image

build_php_fpm_image:
	docker buildx use multiarch
	docker buildx build --platform linux/amd64,linux/arm64 --push --tag=freezer278/laravel_benchmark:php_fpm -f Dockerfile-php-fpm .

build_nginx_image:
	docker buildx use multiarch
	docker buildx build --platform linux/amd64,linux/arm64 --push --tag=freezer278/laravel_benchmark:nginx -f Dockerfile-nginx .
