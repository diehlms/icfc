# Step 1: Frontend Build
FROM node:18-alpine AS frontend

ARG PUBLIC_API_URL
ARG PUBLIC_VERSION

ENV PUBLIC_API_URL=http://128.140.1.67/api \
    PUBLIC_VERSION=0.0.1

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
RUN npm run build

# Step 2: Rails Build
FROM ruby:3.2.2-bullseye AS rails-builder

ENV appuser=rails
WORKDIR /rails

RUN apt-get update && apt-get install -y \
    nodejs \
    git

COPY api/Gemfile api/Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3

# Copy Rails app from api/ directory
COPY api/. .
COPY --from=frontend /app/build/ public/

RUN adduser --disabled-password --gecos "" ${appuser}

RUN chown -R ${appuser}:${appuser} /rails
RUN chmod 755 /rails

USER ${appuser}

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
