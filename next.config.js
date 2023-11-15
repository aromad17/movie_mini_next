/** @type {import('next').NextConfig} */



const nextConfig = {



  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/form",
        destination: "/new",
        permanent: false,
      },
    ];
  },
  async rewrites() {

    const API_KEY = process.env.API_KEY;

    return [{
      source: "/api/movies",
      destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
    },
    {
      source: "/api/movies/:id",
      destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`
    }
    ]
  },

}



module.exports = nextConfig; 