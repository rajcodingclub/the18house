const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.warn(
      '[Mailer] EMAIL_USER / EMAIL_APP_PASSWORD not set — booking/contact emails will be skipped.'
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  return transporter;
}

/**
 * Sends a new-booking notification to the restaurant, and a confirmation
 * copy to the guest who submitted the form.
 */
async function sendBookingEmails(booking) {
  const t = getTransporter();
  if (!t) return;

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER;
  const fromAddress = `"The 18 House" <${process.env.EMAIL_USER}>`;

  const detailsHtml = `
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${booking.name}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;">${booking.email}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${booking.phone}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Date</td><td style="padding:6px 12px;">${booking.date}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Time</td><td style="padding:6px 12px;">${booking.time}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Message</td><td style="padding:6px 12px;">${booking.message || '—'}</td></tr>
    </table>
  `;

  const adminMail = {
    from: fromAddress,
    to: adminEmail,
    replyTo: booking.email,
    subject: `New Table Booking — ${booking.name} (${booking.date} ${booking.time})`,
    html: `<h2>New table reservation received</h2>${detailsHtml}`
  };

  const guestMail = {
    from: fromAddress,
    to: booking.email,
    subject: 'The 18 House — We received your reservation request',
    html: `
      <h2>Thank you, ${booking.name}!</h2>
      <p>We've received your table reservation request and will confirm it shortly.</p>
      ${detailsHtml}
      <p style="margin-top:16px;">If any of these details are wrong, just reply to this email.</p>
      <p>— The 18 House</p>
    `
  };

  const results = await Promise.allSettled([t.sendMail(adminMail), t.sendMail(guestMail)]);
  results.forEach((r) => {
    if (r.status === 'rejected') console.error('[Mailer] Failed to send booking email:', r.reason.message);
  });
}

module.exports = { sendBookingEmails };
