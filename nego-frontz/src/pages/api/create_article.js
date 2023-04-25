import NextCors from "nextjs-cors";

const stripe = require("stripe")(
  "sk_test_51N0PlrIlm4reS1I6dLLB2hdCsyV3M96Hpw9abJcRKDxJAGtSqzAHWwaJOI86IN8Pf0g3INvTv9kooTKYOYiXHcWD004jCEoNMj"
);

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "POST") {
    console.log(req.body);
    const product = await stripe.products.create({
      name: req.body.name,
    });
    console.log(product);
    const price = await stripe.prices.create({
      unit_amount: req.body.price * 100,
      currency: "eur",
      product: product.id,
    });

    res.json({ product: product, price: price });
  }
}
