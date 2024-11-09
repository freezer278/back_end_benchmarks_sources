build:
		docker buildx use multiarch
		docker buildx build --platform linux/amd64,linux/arm64 --push --tag=freezer278/nestjs_benchmark .

build_express_image:
		docker buildx use multiarch
		docker buildx build --platform linux/amd64,linux/arm64 --push --tag=freezer278/nestjs_benchmark:express .

build_fastify_image:
		docker buildx use multiarch
		docker buildx build --platform linux/amd64,linux/arm64 --push --tag=freezer278/nestjs_benchmark:fastify .