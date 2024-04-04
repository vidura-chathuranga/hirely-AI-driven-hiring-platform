export const shortListedEmailTemplate = (
  jobPosition: string,
  applicantName: string
) => {
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
              We are pleased to inform you that your application has been
              shortlisted for further consideration in the selection process for
              <strong>${jobPosition}</strong>.
            </p>
    
            <p>
              Our team was impressed with your qualifications and experience, which
              stood out among the many applications we received. We believe that
              your skills and background may be a good match for the role we are
              seeking to fill.
            </p>
            <p>
              We appreciate the effort you have put into your application and look
              forward to the possibility of working together.
            </p>
          </section>
          <section>
            <span>Warm regards,</span><br />
            <span id="company-name"><strong>HirelyAI</strong></span>
          </section>
        </main>
      </body>
    </html>
    `;
};
