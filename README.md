## How to run

1. Go to app folder & run

```
$ cd apps/backend
$ pnpm dev
```

```
$ cd apps/frontend
$ pnpm dev
```

## How to add packages

```
$ yarn fe add <package_name>
$ yarn be add <package_name>
```

### ec2 서버 세팅

1. npm, yarn install
2. docker install
   https://docs.docker.com/engine/install/ubuntu/
3. docker permission setting

```
sudo /usr/sbin/groupadd -f docker
sudo /usr/sbin/usermod -aG docker $USER
sudo chown root:docker /var/run/docker.sock
```

### docker

1. build

   > docker build -t clueeee/pangtatouille:{tag} . --platform linux/amd64

2. docker hub push

   > docker push clueeee/pangtatouille:{tag}

3. docker hub pull

   > docker pull clueeee/pangtatouille:{tag}

4. docker run
   > docker run -p 8000:8000 -d clueeee/pangtatouille:{tag}
