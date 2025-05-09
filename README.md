# Mini Commerce Project

A lightweight e-commerce backend API built with Node.js, Express, TypeScript, and MySQL.

## Features

- User authentication and authorization
- Product management
- Category management
- Order processing
- Address management
- Low stock notifications

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and update the values
4. Start the development server: `npm run dev`

## Low Stock Notification System

The project includes an automated low stock notification system using the node-schedule library. This system will:

1. Check inventory levels on a scheduled basis (default: daily at 9 AM)
2. Identify products with stock below a configurable threshold
3. Log warnings for low-stock items
4. Send email notifications to administrators

### Configuration

To configure the low stock notification system, set the following environment variables:

```
# Email Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=notifications@mini-commerce.com

# Notification Settings
ADMIN_EMAIL=admin@example.com
LOW_STOCK_THRESHOLD=10
ENABLE_SCHEDULED_NOTIFICATIONS=true
NOTIFICATION_SCHEDULE="0 9 * * *"  # Cron expression for daily at 9 AM
```

### API Endpoints

The system also includes API endpoints to manage the notification scheduler:

- `POST /api/scheduler/low-stock/start` - Start the scheduler with optional parameters
  - Parameters: `{ "threshold": 10, "cronExpression": "0 9 * * *" }`
- `POST /api/scheduler/low-stock/stop` - Stop the scheduler
- `GET /api/scheduler/low-stock/check` - Trigger an immediate check for low stock products
  - Query parameter: `?threshold=10`
- `GET /api/scheduler/status` - Check the current status of the scheduler

### Cron Expressions

The `NOTIFICATION_SCHEDULE` uses cron expressions. Some examples:

- `0 9 * * *` - Every day at 9 AM
- `0 */2 * * *` - Every 2 hours
- `0 9-17 * * 1-5` - Every hour from 9 AM to 5 PM, Monday to Friday
- `0 9 * * MON` - Every Monday at 9 AM

## License

MIT
