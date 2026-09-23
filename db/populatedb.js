require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  message TEXT,
  added TIMESTAMPTZ NOT NULL DEFAULT now();
);

INSERT INTO messages (name, message)
VALUES
  ('Charles', 'Hello World')
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();
