build_octane_road_runner_image:
	docker buildx use multiarch
	docker buildx build --platform linux/amd64,linux/arm64 --push --tag=freezer278/laravel_octane_rr_benchmark .
