import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

const secret = 'YOUR_SECRET_KEY'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body

    // Check if the email and password are correct
    // You would need to implement your own logic here to verify the user's credentials
    if (email !== 'user@example.com' || password !== 'password') {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Create a JWT for the user
    const token = jwt.sign({ email }, secret, { expiresIn: '1h' })

    // Send the JWT to the client
    res.json({ token })
  } catch (error) {}
}