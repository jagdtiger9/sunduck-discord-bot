#!/bin/bash
set -e

echo "UID:GID - $UID:${GID}\n"
getent group ${GID} || groupadd --gid ${GID} g${GID}
getent passwd ${UID} || useradd --shell /bin/bash --uid ${UID} --gid ${GID} -m u${UID}
chown -R ${UID}:${GID} /var/www

exec su-exec ${UID} "$@"
