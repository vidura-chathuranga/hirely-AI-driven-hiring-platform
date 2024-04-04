const rejectedEmailTemplate = (jobPosition: string, applicantName: string) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <style>
          * {
            font-size: 20px;
          }
          #email-body {
            text-align: justify;
            padding: 0 6px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 10px;
          }
          #company-name {
            text-decoration: underline;
            
          }
          #image-section {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            background-color: #020817;
          }
         
        </style>
        <main>
          <section id="image-section">
            <img src="https://iili.io/JNhU7J2.png" height="80px" />
          </section>
          <p id="applicant-name">
            <strong>Dear ${applicantName},</strong>
          </p>
          <section id="email-body">
            <p>
            Thank you for your interest in the <strong>${jobPosition}</strong>. We appreciate the time and effort you put into your application.
            </p>
    
            <p>
            Should a suitable position become available in the future, we will be sure to contact you.
            Thank you once again for considering a career with us.
            </p>
          </section>
          <section>
            <span>Warm regards,</span><br />
            <span id="company-name"><strong>HirelyAI</strong></span>
          </section>
        </main>
      </body>
    </html>`;
};

export default rejectedEmailTemplate;
