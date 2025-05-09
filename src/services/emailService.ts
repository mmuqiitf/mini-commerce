import nodemailer from 'nodemailer';
import config from '../config/config';
import logger from '../utils/logger';
import { Product } from '../database/repositories/productRepository';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;
  private defaultSender: string;

  constructor() {
    // This should come from environment variables in a real app
    this.defaultSender =
      config.email?.from || 'notifications@mini-commerce.com';

    // Create a nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: config.email?.host || 'smtp.example.com',
      port: config.email?.port || 587,
      secure: config.email?.secure || false,
      auth: {
        user: config.email?.user || 'user',
        pass: config.email?.password || 'password',
      },
    });
  }

  /**
   * Send email notification
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: options.from || this.defaultSender,
        to: options.to,
        subject: options.subject,
        html: options.html,
      };

      // In development mode, just log the email instead of sending
      if (config.nodeEnv !== 'production') {
        logger.info(
          `[DEV MODE] Email would be sent: ${JSON.stringify(mailOptions)}`,
        );
        return true;
      }

      // Send the actual email in production
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent: ${info.messageId}`);
      return true;
    } catch (error) {
      logger.error(`Failed to send email: ${error}`);
      return false;
    }
  }

  /**
   * Send low stock notification email
   */
  async sendLowStockNotification(
    to: string,
    products: Product[],
    threshold: number,
  ): Promise<boolean> {
    const subject = `[ALERT] Low Stock Products - ${products.length} items below threshold`;

    // Create HTML table for the email
    const productsTable = products
      .map(
        (p) => `
      <tr>
        <td>${p.code}</td>
        <td>${p.name}</td>
        <td>${p.quantity}</td>
        <td>${threshold - p.quantity}</td>
      </tr>
    `,
      )
      .join('');

    const html = `
      <h2>Low Stock Alert</h2>
      <p>The following ${products.length} products have inventory levels below the threshold of ${threshold} units:</p>
      
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Code</th>
            <th>Product</th>
            <th>Current Stock</th>
            <th>Units Below Threshold</th>
          </tr>
        </thead>
        <tbody>
          ${productsTable}
        </tbody>
      </table>
      
      <p>Please review and restock these items as necessary.</p>
      <p>This is an automated notification from Mini-Commerce.</p>
    `;

    return this.sendEmail({ to, subject, html });
  }
}

export default new EmailService();
