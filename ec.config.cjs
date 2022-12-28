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
    }  
]
  }
  