build_php_fpm_image:
	docker buildx use multiarch
	docker buildx build --platform linux/amd64,linux/arm64 --push --tag=freezer278/symfony_benchmark:php_fpm .
