run build dockerfile
```
docker build . --tag=freezer278/adonis_js_benchmark
```
publish docker image
```
docker push freezer278/adonis_js_benchmark
```

run container
```
docker run --rm -p 8000:3000 --name=adonis_js_benchmark freezer278/adonis_js_benchmark
```

run locust
```
locust --processes 2
```
