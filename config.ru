require './app'

use Rack::Cache,
  verbose: true,
  default_ttl: 30 * 60,
  metastore:   ENV['MEMCACHE_SERVERS'] ? "memcached://#{ENV['MEMCACHE_SERVERS']}/meta" : 'file:tmp/cache/rack/meta',
  entitystore: ENV['MEMCACHE_SERVERS'] ? "memcached://#{ENV['MEMCACHE_SERVERS']}/body" : 'file:tmp/cache/rack/entity'

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
