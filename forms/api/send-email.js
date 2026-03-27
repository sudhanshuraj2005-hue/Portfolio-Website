// api/send-email.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer re_FqC1tvYf_AaZt2hGrPeuiKwCw2DeTvSwV`,
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: 'sudhanshuraj2005@gmail.com',
        reply_to: email,
        subject: `Portfolio: ${subject}`,
        html: `
          <h3>New Message from Portfolio</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).send("OK");
    } else {
      console.error(data);
      return res.status(500).send("Error from Resend API");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}