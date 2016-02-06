# Server

**TODO: Add description**

Running server:
iex -S mix
c "lib/server.ex"
{:ok, _} = Plug.Adapters.Cowboy.http Server, []

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed as:

  1. Add server to your list of dependencies in `mix.exs`:

        def deps do
          [{:server, "~> 0.0.1"}]
        end

  2. Ensure server is started before your application:

        def application do
          [applications: [:server]]
        end
