FROM node:18-alpine AS frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM ruby:3.2-alpine AS rails-builder
WORKDIR /rails

RUN apk add --no-cache \
    build-base \
    postgresql-dev \
    git

COPY api/Gemfile api/Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3

COPY api/. .
COPY --from=frontend /app/dist/ public/

RUN bundle exec rails assets:precompile

RUN adduser -D rails
USER rails

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]