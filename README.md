# Archigram
Archigram is a simple tool to help with drawing and visualizing diagrams.  Original purpose is to help with drawing software architecture diagrams.

# Installation

First install [JSPM](http://jspm.io/).
Next, go to 'server/priv/static' and enter `jspm install`.

Open up `index.html` to see the site.



Alternatively, if you have elixir installed, just navigate to the server directory and run from iex console:

$ cd server
$ iex -S mix
iex> c "lib/server.ex"
iex> {:ok, _} = Plug.Adapters.Cowboy.http Server, []

Now navigate to localhost:4000.


#Project Management
Trello board:
https://trello.com/b/eUE5jIHf/archigram#






