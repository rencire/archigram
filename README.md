# Archigram
Archigram is a simple tool to help with drawing and visualizing diagrams.  Original purpose is to help with drawing software architecture diagrams.

# Installation

To run, just copy the static files (html/css/js) from `server/priv/static/` and put them on a web server.


Alternatively, if you have elixir installed, just navigate to the server directory and run from iex console:

$ cd server
$ iex -S mix
iex> c "lib/server.ex"
iex> {:ok, _} = Plug.Adapters.Cowboy.http Server, []

Now navigate to localhost:4000.

#Project Management
Trello board:
https://trello.com/b/eUE5jIHf/archigram#






