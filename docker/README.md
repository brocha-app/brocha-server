## Docker Image

[Brocha server Dockerfile](https://github.com/brocha-app/brocha-server/blob/master/docker/Dockerfile)

```sh
cd ./docker
docker build --no-cache --force-rm -t brocha .
```

Please mind about the following volume dirs defined in [Dokerfile](https://github.com/brocha-app/brocha-server/blob/master/docker/Dockerfile):
- `/data` Where brocha database, uploads and room recordings are located.
- `/config/brocha.ini` A server configuration file.

Before starting Brocha docker container
- Read the [Brocha server Administrator's Guide](https://github.com/brocha-app/brocha-server/blob/master/docs/brocha.adoc)
- Review `/config/brocha.ini` ip/network options, ssl certs section (if you don't plan to use Let's Encrypt).

**Basic check of Brocha server availability:**

```sh
docker run --rm brocha -h
```

**You have three options how to run a Brocha server:**
- Brocha server on your domain with Let's Encrypt HTTPS Certificates. (Recommended)
- Brocha server on your host with own HTTPS certificates.
- Brocha server behind HTTP proxy.

### Brocha server on your domain with Let's Encrypt Certificates (Recommended)

Please check what your host is accessible by your domain name and 80/443, 44300-44600 tcp/udp ports are accessible.

Example:

```sh

# Below `start01` is the initial password for `admin` user

docker run --name brocha brocha -n mybrocha.example.com -a start01
```
Later you may change your password and manage users by Admin UI.

### Brocha server on your host with own HTTPS certificates

Here is the Example:

```sh

BROCHASRC=<path to brocha cloned repo>
WORKDIR=<path to my workdir>

mkdir -p ${WORKDIR}/config
cd ${WORKDIR}/config

openssl req -x509 -nodes -days 3650 -newkey ec:<(openssl ecparam -name prime256v1) \
          -keyout brocha-eckey.pem -out brocha-ecdsacert.pem

cp ${BROCHASRC}/docker/brocha.ini ./brocha.ini

echo -e '\n\n[main]' >> ./brocha.ini
echo 'cert_file = {config_file_dir}/brocha-ecdsacert.pem' >> ./brocha.ini
echo 'cert_key_file = {config_file_dir}/brocha-eckey.pem' >> ./brocha.ini

# Below `start01` is the initial password for admin user

docker run --name brocha -v ${WORKDIR}/config:/config brocha -a start01

23 Apr 17:15:06.543 INFO: main:ip=auto
23 Apr 17:15:06.543 INFO: main:data=/data
23 Apr 17:15:06.543 INFO: rtc:ports=44300..44600
23 Apr 17:15:06.543 INFO: main:cert_file=/config/brocha-ecdsacert.pem
23 Apr 17:15:06.543 INFO: main:cert_key_file=/config/brocha-eckey.pem
23 Apr 17:15:06.543 INFO: Number of workers: 6
23 Apr 17:15:06.544 INFO: Autodetected external IP address for brocha server: 172.17.0.2
23 Apr 17:15:06.544 INFO: Opening /data/brocha.db
23 Apr 17:15:06.791 INFO: Server on: 172.17.0.2:443
23 Apr 17:15:06.791 INFO: HTTP/HTTPS redirect port: 80
```

Point your browser `https://172.17.0.2` (specific to this example) then use `admin/start01` credentials at login page.
Later you may change your password and manage users by Admin UI.

### Brocha server behind HTTP proxy

Please refer to [Brocha server Administrator's Guide](https://github.com/brocha-app/brocha-server/blob/master/docs/brocha.adoc)


