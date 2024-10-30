## Docker operations

build 'prod' image:
```bash
docker build . --tag=freezer278/nestjs_benchmark
```
run prod image with docker:
```bash
docker run --rm -p 8000:3000 --name=adonis_js_benchmark freezer278/adonis_js_benchmark
```