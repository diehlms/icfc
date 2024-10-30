#!/bin/bash

rm /rails/tmp/pids/server.pid;

bundle exec rails server -b 0.0.0.0