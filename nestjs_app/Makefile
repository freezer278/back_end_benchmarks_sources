build:
		docker buildx use multiarch
		docker buildx build --platform linux/amd64,linux/arm64 --push --tag=freezer278/nestjs_benchmark .