#!/bin/bash
mongo <<EOF
use admin;
db.auth('root', '123456');
use dmx_aluminum;
db.createUser({user:'test',pwd:'test',roles:[{role:'readWrite',db:'zhihu'}]});
db.createCollection("user");
EOF