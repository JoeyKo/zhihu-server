#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u dbuser -p root --eval "db.createUser({user: 'dbuser', pwd: 'root', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
echo "Mongo users created."