#!/bin/bash

set -e

# https://bundler.io/guides/bundler_docker_guide.html
unset BUNDLE_PATH
unset BUNDLE_BIN

mkdir -p tmp/pids

if [ -f tmp/pids/server.pid ]; then
  echo "Cleanup server.pid"
  rm tmp/pids/server.pid
fi
exec bundle exec puma -t 8:32
