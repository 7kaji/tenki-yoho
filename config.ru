require './app'

mem_client = Dalli::Client.new((ENV["MEMCACHIER_SERVERS"] || "").split(","),
                               :username => ENV["MEMCACHIER_USERNAME"],
                               :password => ENV["MEMCACHIER_PASSWORD"],
                               :failover => true,
                               :socket_timeout => 1.5,
                               :socket_failure_delay => 0.2,
                               :value_max_bytes => 10485760)

use Rack::Cache,
  verbose: true,
  default_ttl: 30 * 60,
  metastore:   ENV["MEMCACHIER_SERVERS"].nil? ? 'file:tmp/cache/rack/meta' : mem_client,
  entitystore: ENV["MEMCACHIER_SERVERS"].nil? ? 'file:tmp/cache/rack/entity' : mem_client

use Rack::Cors do
  allow do
    origins 'localhost:8080', '127.0.0.1:8080'

    resource '/api/v1/*',
      methods: [:get, :post, :delete, :put, :patch, :options, :head],
      headers: :any,
      credentials: false

      # headers: 'x-domain-token',
      # expose: ['Some-Custom-Response-Header'],
      # max_age: 600
      # headers to expose
  end

  # allow do
  #   origins '*'
  #   resource '/public/*', headers: :any, methods: :get
  # end
end

use Rack::Static, urls: {'/' => 'index.html'}, root: 'public'

run App
