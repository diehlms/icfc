FROM ruby:3.2.2-bullseye

ENV GEM_HOME="/app/.bundle"
ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH

RUN apt-get update && apt-get install -y nodejs

RUN gem install bundler rails rake

ENV RAILS_ROOT /app

WORKDIR /app

EXPOSE ${PORT}

COPY entrypoint.sh .

ENTRYPOINT [ "/bin/sh", "/app/entrypoint.sh" ]
