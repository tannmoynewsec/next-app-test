# Next App Test

This project is a Next.js app configured for manual deployment on Hostinger.in. It is not deployed through Vercel.

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Production build

Build the app for production:

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

## Manual deployment on Hostinger.in

Use a Node.js hosting plan on Hostinger.in for this project. This is a Next.js app and should not be deployed as a static site.

### Recommended deployment flow

1. Push the project files to your Hostinger hosting account or upload them using the Hostinger file manager / Git deployment method.
2. In the project root, install dependencies:

```bash
npm install
```

3. Build the app:

```bash
npm run build
```

4. Start the app in production mode:

```bash
npm run start
```

5. Configure the Hostinger Node.js app or domain settings to point to the project and use the app start command as needed for your hosting configuration.

### Notes

- If your Hostinger plan supports a Node.js app, use the project root as the application folder.
- Make sure the app is running with the correct Node version supported by this project.
- Do not use the Vercel deployment flow for this project.

## Useful commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Razorpay payment plan

Use the Razorpay dashboard here: [Razorpay Dashboard](https://dashboard.razorpay.com/app/paymentbuttons)

For this business model, the payment should be treated as a professional consultancy or service invoice, not just a simple product sale.

### What can be created after payment

1. Consultancy service payment
   - A client pays for a consulting service such as website help, business advice, strategy, setup, or support.
   - After payment, the client receives a confirmation and invoice record.

2. Service package sale
   - Sell a service bundle such as a basic package, premium package, or monthly support plan.
   - Each payment can be linked to a service description and scope.

3. One-time project payment
   - A client pays for a defined project, milestone, or one-time engagement.
   - Store the invoice details for tax and accounting records.

4. Retainer or monthly support plan
   - Collect recurring payment for ongoing services.
   - Keep a clear record of service period and payment dates.

5. Tax-friendly invoice data capture
   - Capture name, business name, email, phone, GST/Tax ID, invoice number, service description, date, and amount.
   - This makes it easier for future tax filing and accounting.

### Recommended fields to collect

For each payment, store these details:

- client name
- company name or business name
- email address
- phone number
- service description
- payment amount
- payment date
- invoice number
- invoice date
- GST number or tax ID (if applicable)
- payment status
- mode of payment
- project or package name

### Recommended payment flow

- Create a Razorpay payment button or order.
- Show a service description and amount clearly.
- Collect the client details before or after checkout.
- On successful payment, redirect to a thank-you page.
- Save payment details to a database or spreadsheet.
- Send an invoice or service confirmation email.
- Keep the record available for future tax reporting.

### Example service-based use cases

- Business consultancy fee
- Website development service payment
- Digital marketing service fee
- Technical support plan
- Branding and setup package
- Monthly maintenance or retainer contract

### Best practice for future tax purposes

Keep the payment process simple but professional:

- clear service name
- exact amount
- invoice number
- client information
- payment date and receipt
- tax-related fields when required

This creates a clean record of business income and makes future tax filing and reporting much easier.
