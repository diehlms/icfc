# Step 1: Frontend Build
FROM node:18-alpine AS frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
RUN npm run build

# Step 2: Rails Build
FROM ruby:3.2.2-bullseye AS rails-builder
WORKDIR /rails

RUN apt-get update && apt-get install -y \
    nodejs \
    git

COPY api/Gemfile api/Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3

# Copy Rails app from api/ directory
COPY api/. .
COPY --from=frontend /app/build/ public/

RUN adduser --disabled-password --gecos "" rails
USER rails

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
