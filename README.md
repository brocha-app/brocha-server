# Brocha video conferencing platform

https://brocha.app

A full featured self-hosted video web-conferencing platform shipped as a single executable.

- Works on Linux and FreeBSD.
- Single executable, no setup is required.
- Let's Encrypt integration - instant SSL certs generation for your web-conferencing host.
- Unlimited meeting rooms and webinars.
- Integrated whiteboard.
- Video calls recording.
- Low memory/CPU consumption due to fast core engine written in C.

## Licensing

Brocha platform community edition is distributed under terms of [AGPLv3 license](https://choosealicense.com/licenses/agpl-3.0/)

For a license to use the Brocha software under conditions other than AGPLv3, or for technical support for this software,
please contact us at info@brocha.app

## How to get support

If you have a question, advice or an issue related to your server setup ask for help at [Brocha Discussion Group](https://github.com/brocha-app/brocha-server/discussions).
Please be patient and note what project maintainers have limited time provide a free support on this forum.

Fill an [Issue](https://github.com/brocha-app/brocha-server/issues) If you believe that Brocha has a software bug.


## Guides

- [Brocha Server Administrator's Guide](https://github.com/brocha-app/brocha-server/blob/master/docs/brocha.adoc) ([pdf](https://github.com/brocha-app/brocha-server/blob/master/docs/brocha.pdf))
- [Brocha Server Configuration Reference](https://github.com/brocha-app/brocha-server/blob/master/docs/brocha-configuration.ini)

## Software used by Brocha

- [Mediasoup - C++ WebRTC SFU router](https://github.com/versatica/mediasoup)
- [EJDB2 - Embeddable JSON Database engine](https://github.com/Softmotions/ejdb)
- [IWNET - Asynchronous HTTP Library](https://github.com/Softmotions/iwnet)
- [Excalidraw - A Whiteboard Web UI](https://github.com/excalidraw/excalidraw)
- [FFmpeg](https://ffmpeg.org)
- [Sentry error reporting](https://sentry.io)
- [Svelte Frontend Framework](https://svelte.dev)




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





## Building from sources by hands

### Build Prerequisites

* Linux or FreeBSD
* Git
* CMake v3.18+
* GNU Make, autoconf, automake, libtool, ninja (optional)
* Nodejs v16+ and Yarn package manager v1.22+
* Clang C/C++ compiler v10+ or GCC v9+
* yasm assembler (yasm) needed by FFmpeg
* Python 3 pip package manager (python3-pip)

Example of prerequisite software installation on Debian/Ubuntu Linux:

```sh
apt-get install -y apt-utils software-properties-common \
                   apt-transport-https sudo curl wget gpg

wget -O - https://apt.kitware.com/keys/kitware-archive-latest.asc 2>/dev/null \
       | gpg --dearmor -i \
       | tee /etc/apt/trusted.gpg.d/kitware.gpg >/dev/null
wget -qO- https://deb.nodesource.com/setup_lts.x | bash -
wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -

apt-add-repository -y 'deb https://apt.kitware.com/ubuntu/ focal main'
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

apt-get update
apt-get install -y autoconf automake pkgconf \
  binutils build-essential ca-certificates cmake \
  g++ gcc git libtool make ninja-build nodejs python-is-python3 yarn \
  yasm python3-pip
```

### Building

```sh
git clone --recurse-submodules https://github.com/brocha-app/brocha-server.git

mkdir -p ./brocha-server/build && cd ./brocha-server/build

cmake ..  -G Ninja \
          -DCMAKE_BUILD_TYPE=RelWithDebInfo \
          -DIW_EXEC=ON
ninja
```

Brocha build artifacts are located here:

```sh
 ./build/src/brocha    # Stripped binary
 ./build/src/brocha_g  # Binary with debug symbols (Not stripped)
```





## Guides

- [Brocha Server Administrator's Guide](https://github.com/brocha-app/brocha-server/blob/master/docs/brocha.adoc) ([pdf](https://github.com/brocha-app/brocha-server/blob/master/docs/brocha.pdf))
- [Brocha Server Configuration Reference](https://github.com/brocha-app/brocha-server/blob/master/docs/brocha-configuration.ini)


# License

```
/*
 * Copyright (C) 2023 Tulio Technologies LLC.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see http://www.gnu.org/licenses/
 */
```
