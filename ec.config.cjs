module.exports = {
    apps : [{
      name   : "backend",
      script : "go run ."
    },
    {
        name   : "frontend",
        script : "yarn run dev"
    }  ,
    {
        mame :"database",
        script : "docker-compose up"
    }  ,
    {
      name : "tunnel-fe",
      script : "cloudflared tunnel --config cftunnels/fe.yml --url localhost:8080 run dw-frontend"
    },{
      name : 'tunnel-be',
      script : "cloudflared tunnel --config cftunnels/be.yml --url localhost:5001 run dw-backend"

    }
]
  }
  