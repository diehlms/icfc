# ICFC

## Developer Setup

In a devcontainer-friendly IDE (VSCode, etc), ensure you have the devcontainers extension installed.

Follow the extension's prompt to build the image in .devcontainer (In VSCode, CMD+SHIFT+P -> "build devcontainer")

Once inside the container, run:

```sh
api/bin/rails db:prepare;
api/bin/rails db:seed;
api/foreman -f Procfile.dev;
```

Then, in your browser go to `http://localhost:3000`. Log in using one of the accounts in the seed file (`db/seeds.rb`)
