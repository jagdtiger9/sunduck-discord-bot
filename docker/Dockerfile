# Based on official PHP FPM Alpine image
FROM alpine:3.21
LABEL org.opencontainers.image.authors="gimatov@gmail.com"

ARG user=1000
ARG group=1000

# Install only runtime tools not provided by extensions
RUN apk add --no-cache \
    bash \
    su-exec \
    git \
    nodejs \
    npm \
    yarn \
    && npm install -g corepack \
    && corepack enable \
    && yarn set version stable \
    && rm -rf /var/cache/apk/*

#RUN addgroup -g ${group} g${group} 2>/dev/null || true && \
#    adduser -u ${user} -G "g${group}" -D "u${user}" 2>/dev/null || true \
#RUN addgroup -g ${group} g${group} \
#    && adduser -u ${user} -G "g${group}" -D "u${user}" \
RUN if ! getent group ${group} > /dev/null 2>&1; then addgroup -g ${group} g${group}; fi \
    && if ! getent passwd ${user} > /dev/null 2>&1; then adduser -u ${user} -G g${group} -D "u${user}"; fi
#    && mkdir -p /var/www && cd /var/www \
#    && chown -R $user:$group /var/www \
#    && chmod 0777 /var/www \
#      && git clone https://github.com/jagdtiger9/wss_server . \
#    && yarn init && yarn install

#USER ${user}
#VOLUME ["/var/www"]

COPY --chmod=755 ./entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["yarn", "start"]
