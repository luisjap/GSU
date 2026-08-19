#!/bin/bash
export PATH="/Users/luisandrade/.nvm/versions/node/v24.19.0/bin:$PATH"
cd "$(dirname "$0")/.."
exec python3 -m http.server 8080
