const stripe = require("stripe")(
  "sk_test_51N0PlrIlm4reS1I6dLLB2hdCsyV3M96Hpw9abJcRKDxJAGtSqzAHWwaJOI86IN8Pf0g3INvTv9kooTKYOYiXHcWD004jCEoNMj"
);
const express = require("express");
const app = express();
app.use(express.static("public"));
const cors = require("cors");

app.use(cors());

const YOUR_DOMAIN = "http://localhost:3000";

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1N0Q7PIlm4reS1I61EUcAAzM",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
