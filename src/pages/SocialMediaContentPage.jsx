// If you intend to use this as a JavaScript object, assign it to a variable:
const config = {
  rewrites: [
    {
      source: "/(.*)",
      destination: "/index.html"
    }
  ],
  headers: [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; style-src 'self' 'unsafe-inline' https://unpkg.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; connect-src 'self' https://*.supabase.co https://js.stripe.com https://codecanverse.app.n8n.cloud; img-src 'self' data: https://source.unsplash.com https://*.supabase.co https://codecanverse.app.n8n.cloud; frame-src https://js.stripe.com"
        }
      ]
    }
  ]
};
