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

VOLUME ["/var/www"]

CMD ["yarn", "start"]
