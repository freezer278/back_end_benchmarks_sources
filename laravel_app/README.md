docker build
```
docker build . --tag=freezer278/laravel_octane_rr_benchmark
```
docker push
```
docker push freezer278/laravel_octane_rr_benchmark
```

docker run container
```
docker run --rm -d -p 8000:3000 --name=laravel_octane_rr_benchmark freezer278/laravel_octane_rr_benchmark
```
