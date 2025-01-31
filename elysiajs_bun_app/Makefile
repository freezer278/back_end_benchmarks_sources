build_all_dockerfiles: build_1.2_dockerfile build_1.1_dockerfile

build_1.2_dockerfile:
		docker buildx use multiarch
		docker buildx build --platform linux/amd64,linux/arm64 --push --build-arg BUN_VERSION=1.2 --tag=freezer278/elysiajs_bun_benchmark:1.2 .

build_1.1_dockerfile:
		docker buildx use multiarch
		docker buildx build --platform linux/amd64,linux/arm64 --build-arg BUN_VERSION=1.1 --push --tag=freezer278/elysiajs_bun_benchmark:1.1 .
