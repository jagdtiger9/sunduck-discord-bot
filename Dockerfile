FROM phusion/baseimage:noble-1.0.1
LABEL org.opencontainers.image.authors="MAINTAINER gimatov@gmail.com"

RUN apt-get -y update \
    && apt-get install -y curl git \
    && curl -sL https://deb.nodesource.com/setup_22.x | bash - \
    && install_clean nodejs \
    && corepack enable \
    && yarn set version stable \
    && mkdir /var/www && cd /var/www \
#    && git clone https://github.com/jagdtiger9/wss_server . \
    && yarn init && yarn install \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN groupadd --gid 1001 gr1001 \
    && useradd --shell /bin/bash --uid 1001 --gid 1001 -m u1001 \
    && groupadd --gid 1002 gr1002 \
    && useradd --shell /bin/bash --uid 1002 --gid 1002 -m u1002 \
    && groupadd --gid 1003 gr1003 \
        && useradd --shell /bin/bash --uid 1003 --gid 1003 -m u1003

VOLUME ["/var/www"]

CMD ["yarn", "start"]
