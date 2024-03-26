# Backend Birthday Reminder App

This project is the backend of the Birthday Reminder App, developed by [Otavie Okuoyo](https://github.com/Otavie). It is built using TypeScript and leverages various libraries and frameworks such as Express.js, MongoDB, Node.js, and more. The backend handles the logic for managing celebrants' birthdays and sending out reminder emails.

## Features

- **Add Celebrant**: Users can add celebrants with their usernames, emails, and dates of birth. Duplicate usernames and emails are not allowed.
- **Get All Celebrants**: Retrieves all celebrants from the database.
- **Automatic Birthday Emails**: Sends birthday emails to celebrants on their birthdays.

## Installation

To run this project locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Otavie/birthday-reminder-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd birthday-reminder-backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up your environment variables by creating a `.env` file in the root directory and filling it with your configurations. Here is an example:

   ```
   PORT=your_port_number
   DB_URI=your_mongodb_uri
   EMAIL_ADDRESS=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

## Usage

1. Start the backend server:
   ```bash
   npm run start:backend
   ```
2. Once the server is running, you can access the API endpoints to manage celebrants' birthdays.

## API Endpoints

- `GET /birthdays`: Retrieves all celebrants.
- `POST /birthdays`: Adds a new celebrant.

## Dependencies

- [Express](https://expressjs.com/): Web application framework for Node.js.
- [mongoose](https://mongoosejs.com/): MongoDB object modeling for Node.js.
- [Joi](https://joi.dev/): Schema description language and data validator for JavaScript.
- [nodemailer](https://nodemailer.com/): Module for sending emails from Node.js applications.
- [node-cron](https://github.com/node-cron/node-cron): Task scheduler for Node.js based on cron syntax.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for new features, changes, or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
