defmodule Server do
  # import used to import functions for use
  #import Plug.Conn
  # use intended for injecting code into current module
  use Plug.Router

  plug Plug.Logger
  plug Plug.Static, at: "/", from: :server

  plug :match
  plug :dispatch

  get "/" do
    conn = put_resp_content_type(conn, "text/html")
    send_file(conn, 200, "priv/static/index.html")
  end

  match _ do
    send_resp(conn, 404, "not found")
  end

  # TODO for fun, code to match index.html without using Plug.Router

end
