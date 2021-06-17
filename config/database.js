module.exports = ({ env }) => {

  if(env('NODE_ENV') === 'development') {
    return  {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: env('DATABASE_HOST', 'cgpstagingdb.ccykwjrfzgx8.eu-central-1.rds.amazonaws.com'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'cgpweb_bulk_qa'),
            username: env('DATABASE_USERNAME', 'cgpdbuser'),
            password: env('DATABASE_PASSWORD', 'Rp5fckMzxejT7HmY'),
            ssl: env.bool('DATABASE_SSL', false),
          },
          options: {}
        },
      },
    }
  } else if(env('NODE_ENV') === 'staging'){
    return   {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: env('DATABASE_HOST', 'cgpstagingdb.ccykwjrfzgx8.eu-central-1.rds.amazonaws.com'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'cgpweb_qa'),
            username: env('DATABASE_USERNAME', 'cgpdbuser'),
            password: env('DATABASE_PASSWORD', 'Rp5fckMzxejT7HmY'),
            ssl: env.bool('DATABASE_SSL', false),
          },
          options: {}
        },
      },
    }
  } else if (env('NODE_ENV') === 'production') {
    return   {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: env('DATABASE_HOST', 'cgpstagingdb.ccykwjrfzgx8.eu-central-1.rds.amazonaws.com'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'cgpweb_staging'),
            username: env('DATABASE_USERNAME', 'cgpdbuser'),
            password: env('DATABASE_PASSWORD', 'Rp5fckMzxejT7HmY'),
            ssl: env.bool('DATABASE_SSL', false),
          },
          options: {}
        },
      },
    }
  }
}
// API_URL=http://18.184.207.46:3001/api/
// host: env('DATABASE_HOST', '159.69.6.195'),
// port: env.int('DATABASE_PORT', 5432),
// database: env('DATABASE_NAME', 'datapunkdb'),
// username: env('DATABASE_USERNAME', 'datauser'),
// password: env('DATABASE_PASSWORD', 'TeChie@230'),
// ssl: env.bool('DATABASE_SSL', false),

// host: env('DATABASE_HOST', 'cgpstagingdb.ccykwjrfzgx8.eu-central-1.rds.amazonaws.com'),
// port: env.int('DATABASE_PORT', 5432),
// database: env('DATABASE_NAME', 'cgpweb_staging'),
// username: env('DATABASE_USERNAME', 'cgpdbuser'),
// password: env('DATABASE_PASSWORD', 'Rp5fckMzxejT7HmY'),
// ssl: env.bool('DATABASE_SSL', false),

// host: env('DATABASE_HOST', 'localhost'),
// port: env.int('DATABASE_PORT', 5433),
// database: env('DATABASE_NAME', 'dataBunk01'),
// username: env('DATABASE_USERNAME', 'postgres'),
// password: env('DATABASE_PASSWORD', 'root'),
// ssl: env.bool('DATABASE_SSL', false),
