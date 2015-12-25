require 'socket'
require 'uri'

WEB_ROOT = './public'

CONTENT_TYPE_MAPPING = {
  'html' => 'text/html',
  'plain' => 'text/plain',
  'js' => 'text/javascript',
  'png' => 'image/png',
  'jpg' => 'image/jpg',
}

DEFAULT_CONTENT_TYPE = 'application/octet-stream'

# takes in a File or String
def content_type(path)
  ext = File.extname(path).split(".").last
  CONTENT_TYPE_MAPPING.fetch(ext, DEFAULT_CONTENT_TYPE)
end

# e.g "GET /somepath?foo=bar HTTP/1.1"
def requested_file(request_line)
  request_uri = request_line.split(" ")[1]
  path = URI.unescape(URI(request_uri).path)

  clean = []

  # split path into components
  parts = path.split("/")

  parts.each do |part|
    # skip any empty or current directory (".") path components
    next if part.empty? || part == '.'
    # If the path component goes up one directory level (".."),
    # remove the last clean component.
    # Otherwise, add the component to the Array of clean components
    part == '..' ? clean.pop : clean << part
  end

  File.join(WEB_ROOT, *clean)
end


server = TCPServer.new('localhost', 2345)

loop do
  socket = server.accept
  request_line = socket.gets

  STDERR.puts request_line

  path = requested_file(request_line)

  path = File.join(path, 'index.html') if File.directory?(path)

  if File.exists?(path) and !File.directory?(path)
    File.open(path, "rb") do |file|
      socket.print "HTTP/1.1 200 OK\r\n" +
                   "Content-Type: #{content_type(file)}\r\n" +
                   "Content-Legth: #{file.size}\r\n" +
                   "Connection: close\r\n"

      socket.print "\r\n"

      # executes binary data by default?
      IO.copy_stream(file, socket)
    end
  else
    message = "File not found\n"

    socket.print "HTTP/1.1 404 Not Found\r\n" +
                 "Content-Type: text/plain\r\n" +
                 "Content-Legth: #{message.size}\r\n" +
                 "Connection: close\r\n"

    socket.print message
  end

  socket.close
end



