#!/bin/bash
set -m
 
MONGO_LOG_DIR=${MONGO_LOG_DIR:-"/var/log/mongodb.log"}

mongodb_cmd="mongod"
cmd="$mongodb_cmd --logpath ${MONGO_LOG_DIR}"

if [ "$AUTH" == "yes" ]; then
    cmd="$cmd --auth"
fi

$cmd &

if [ ! -f /data/db/.mongodb_password_set ]; then
    /set_mongodb_password.sh
fi

fg