const signupMailTemplate = (username) => {
  return {
    subject: "Welcome to AgroTech!",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        border: 1px solid #e0e0e0;
        padding: 30px;
        border-radius: 10px;
        background-color: #f9f9f9;
        color: #333;
      ">
        <h1 style="color: #2f855a;">Welcome, ${username} </h1>
        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for signing up to <strong>AgroTech</strong> — your trusted agricultural marketplace.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          You can now explore equipment, make bookings, or post your own adverts.
        </p>

        <div style="margin-top: 30px;">
          <a href="https://agritech-link.netlify.app/" style="
            background-color: #38a169;
            color: #fff;
            padding: 12px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
          ">
            Visit the Website
          </a>
        </div>

        <p style="font-size: 14px; color: #666; margin-top: 40px;">
          If you did not sign up for this account, you can safely ignore this email.
        </p>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #aaa; text-align: center;">
          &copy; ${new Date().getFullYear()} AgroTech Ghana. All rights reserved.
        </p>
      </div>
    `
  };
};

module.exports = signupMailTemplate;
