Meet Drizzle
Get started

New database

Bun SQL
Get Started with Drizzle and Bun:SQLite
This guide assumes familiarity with:
bun - javaScript all-in-one toolkit - read here
Bun SQL - native bindings for working with PostgreSQL databases - read here
WARNING
In version 1.2.0, Bun has issues with executing concurrent statements, which may lead to errors if you try to run several queries simultaneously. We’ve created a github issue that you can track. Once it’s fixed, you should no longer encounter any such errors on Bun’s SQL side

Basic file structure
This is the basic file structure of the project. In the src/db directory, we have table definition in schema.ts. In drizzle folder there are sql migration file and snapshots.

📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 │   ├ 📂 db
 │   │  └ 📜 schema.ts
 │   └ 📜 index.ts
 ├ 📜 .env
 ├ 📜 drizzle.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json

Step 1 - Install required packages
npm i drizzle-orm
npm i -D drizzle-kit @types/bun

Step 2 - Setup connection variables
Create a .env file in the root of your project and add your database connection variable:

DATABASE_URL=

Step 3 - Connect Drizzle ORM to the database
Create a index.ts file in the src directory and initialize the connection:

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/bun-sql';
const db = drizzle(process.env.DATABASE_URL!);

If you need to provide your existing driver:

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/bun-sql';
import { SQL } from 'bun';
const client = new SQL(process.env.DATABASE_URL!);
const db = drizzle({ client });

Step 4 - Create a table
Create a schema.ts file in the src/db directory and declare your table:

src/db/schema.ts

import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
Step 5 - Setup Drizzle config file
Drizzle config - a configuration file that is used by Drizzle Kit and contains all the information about your database connection, migration folder and schema files.

Create a drizzle.config.ts file in the root of your project and add the following content:

drizzle.config.ts

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
Step 6 - Applying changes to the database
You can directly apply changes to your database using the drizzle-kit push command. This is a convenient method for quickly testing new schema designs or modifications in a local development environment, allowing for rapid iterations without the need to manage migration files:

npx drizzle-kit push

Read more about the push command in documentation.

Tips
Alternatively, you can generate migrations using the drizzle-kit generate command and then apply them using the drizzle-kit migrate command:

Generate migrations:

npx drizzle-kit generate

Apply migrations:

npx drizzle-kit migrate

Read more about migration process in documentation.

Step 7 - Seed and Query the database
Let’s update the src/index.ts file with queries to create, read, update, and delete users

src/index.ts

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/bun-sql';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';
  
const db = drizzle(process.env.DATABASE_URL!);
async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };
  await db.insert(usersTable).values(user);
  console.log('New user created!')
  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */
  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')
  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')
}
main();
Step 8 - Run index.ts file
To run a script with bun, use the following command:

bun src/index.ts
Drizzle ORM
Drizzle ORM is a headless TypeScript ORM with a head. 🐲

Drizzle is a good friend who’s there for you when necessary and doesn’t bother when you need some space.

It looks and feels simple, performs on day 1000 of your project,
lets you do things your way, and is there when you need it.

It’s the only ORM with both relational and SQL-like query APIs, providing you the best of both worlds when it comes to accessing your relational data. Drizzle is lightweight, performant, typesafe, non-lactose, gluten-free, sober, flexible and serverless-ready by design. Drizzle is not just a library, it’s an experience. 🤩

Drizzle bestofjs

Headless ORM?
First and foremost, Drizzle is a library and a collection of complementary opt-in tools.

ORM stands for object relational mapping, and developers tend to call Django-like or Spring-like tools an ORM. We truly believe it’s a misconception based on legacy nomenclature, and we call them data frameworks.

WARNING
With data frameworks you have to build projects around them and not with them.

Drizzle lets you build your project the way you want, without interfering with your project or structure.

Using Drizzle you can define and manage database schemas in TypeScript, access your data in a SQL-like or relational way, and take advantage of opt-in tools to push your developer experience through the roof. 🤯

Why SQL-like?
If you know SQL, you know Drizzle.

Other ORMs and data frameworks tend to deviate/abstract you away from SQL, which leads to a double learning curve: needing to know both SQL and the framework’s API.

Drizzle is the opposite. We embrace SQL and built Drizzle to be SQL-like at its core, so you can have zero to no learning curve and access to the full power of SQL.

We bring all the familiar SQL schema, queries, automatic migrations and one more thing. ✨

// Access your data
await db
	.select()
	.from(countries)
	.leftJoin(cities, eq(cities.countryId, countries.id))
	.where(eq(countries.id, 10))

Why not SQL-like?
We’re always striving for a perfectly balanced solution, and while SQL-like does cover 100% of the needs, there are certain common scenarios where you can query data in a better way.

We’ve built the Queries API for you, so you can fetch relational nested data from the database in the most convenient and performant way, and never think about joins and data mapping.

Drizzle always outputs exactly 1 SQL query. Feel free to use it with serverless databases and never worry about performance or roundtrip costs!

const result = await db.query.users.findMany({
	with: {
		posts: true
	},
});

Serverless?
The best part is no part. Drizzle has exactly 0 dependencies!

Drizzle is slim an Serverless ready

Drizzle ORM is dialect-specific, slim, performant and serverless-ready by design.

We’ve spent a lot of time to make sure you have best-in-class SQL dialect support, including Postgres, MySQL, and others.

Drizzle operates natively through industry-standard database drivers. We support all major PostgreSQL, MySQL, SQLite or SingleStore drivers out there, and we’re adding new ones really fast.

Welcome on board!
More and more companies are adopting Drizzle in production, experiencing immense benefits in both DX and performance.

We’re always there to help, so don’t hesitate to reach out. We’ll gladly assist you in your Drizzle journey!

We have an outstanding Discord community and welcome all builders to our Twitter.

Now go build something awesome with Drizzle and your PostgreSQL, MySQL or SQLite database. 
Database connection with Drizzle
Drizzle ORM runs SQL queries on your database via database drivers.

import { drizzle } from "drizzle-orm/node-postgres"
import { users } from "./schema"
const db = drizzle(process.env.DATABASE_URL);
const usersCount = await db.$count(users);

                        ┌──────────────────────┐
                        │   db.$count(users)   │ <--- drizzle query
                        └──────────────────────┘     
                            │               ʌ
select count(*) from users -│               │
                            │               │- [{ count: 0 }]
                            v               │
                         ┌─────────────────────┐
                         │    node-postgres    │ <--- database driver
                         └─────────────────────┘
                            │               ʌ
01101000 01100101 01111001 -│               │
                            │               │- 01110011 01110101 01110000
                            v               │
                         ┌────────────────────┐
                         │      Database      │ 
                         └────────────────────┘

Under the hood Drizzle will create a node-postgres driver instance which you can access via db.$client if necessary

import { drizzle } from "drizzle-orm/node-postgres"
const db = drizzle(process.env.DATABASE_URL);
const pool = db.$client;

// above is equivalent to
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

Drizzle is by design natively compatible with every edge or serverless runtime, whenever you’d need access to a serverless database - we’ve got you covered

import { drizzle } from "drizzle-orm/neon-http";
const db = drizzle(process.env.DATABASE_URL);

And yes, we do support runtime specific drivers like Bun SQLite or Expo SQLite:

import { drizzle } from "drizzle-orm/bun-sqlite"
const db = drizzle(); // <--- will create an in-memory db
const db = drizzle("./sqlite.db");

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
const expo = openDatabaseSync("db.db");
const db = drizzle(expo);

Database connection URL
Just in case if you’re not familiar with database connection URL concept

postgresql://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/dbname
             └──┘ └───────┘ └─────────────────────────────────────────────┘ └────┘
              ʌ    ʌ          ʌ                                              ʌ
        role -│    │          │- hostname                                    │- database
                   │
                   │- password

Next
Drizzle <> PostgreSQL
This guide assumes familiarity with:
Database connection basics with Drizzle
node-postgres basics
postgres.js basics
Drizzle has native support for PostgreSQL connections with the node-postgres and postgres.js drivers.

There are a few differences between the node-postgres and postgres.js drivers that we discovered while using both and integrating them with the Drizzle ORM. For example:

With node-postgres, you can install pg-native to boost the speed of both node-postgres and Drizzle by approximately 10%.
node-postgres supports providing type parsers on a per-query basis without globally patching things. For more details, see Types Docs.
postgres.js uses prepared statements by default, which you may need to opt out of. This could be a potential issue in AWS environments, among others, so please keep that in mind.
If there’s anything else you’d like to contribute, we’d be happy to receive your PRs here
node-postgres
Step 1 - Install packages
bun add drizzle-orm pg
bun add -D drizzle-kit @types/pg

Step 2 - Initialize the driver and make a query
// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';
const db = drizzle(process.env.DATABASE_URL);
 
const result = await db.execute('select 1');

If you need to provide your existing driver:

// Make sure to install the 'pg' package 
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });
 
const result = await db.execute('select 1');

postgres.js
Step 1 - Install packages
bun add drizzle-orm postgres
bun add -D drizzle-kit

Step 2 - Initialize the driver and make a query
import { drizzle } from 'drizzle-orm/postgres-js';
const db = drizzle(process.env.DATABASE_URL);
const result = await db.execute('select 1');

If you need to provide your existing driver:

// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle({ client: queryClient });
const result = await db.execute('select 1');

Owner avatar
drizzle-mcp
Public
defrex/drizzle-mcp
Go to file
t
Name		
defrexclaude
defrex
and
claude
Update README with latest features and improvements
0b9f1b4
 · 
4 months ago
dist
Fix module resolution to use target project's dependencies
4 months ago
docs/packages/@modelcontextprotocol/typescript-sdk
Initial implementation of Drizzle MCP server
4 months ago
src
Fix module resolution to use target project's dependencies
4 months ago
.gitignore
Include dist folder in repository for GitHub installs
4 months ago
CLAUDE.md
Initial implementation of Drizzle MCP server
4 months ago
README.md
Update README with latest features and improvements
4 months ago
bun.lock
Add dotenv support for environment variable loading
4 months ago
package.json
Add dotenv support for environment variable loading
4 months ago
tsconfig.json
Initial implementation of Drizzle MCP server
4 months ago
Repository files navigation
README
Drizzle MCP Server
A Model Context Protocol (MCP) server that provides access to Drizzle ORM database operations and drizzle-kit CLI tools.

Features
Database Schema Management: Generate and run migrations using drizzle-kit
Query Execution: Execute raw SQL queries with parameter support
Schema Introspection: Explore database tables and schema information
Database Resources: Browse tables and schema through MCP resources
Cross-Project Compatibility: Works with any existing Drizzle project
Multi-Database Support: SQLite and PostgreSQL with automatic driver detection
Environment Variable Support: Automatic .env file loading for database credentials
Flexible Installation: Install globally, run with npx/bunx, or use as a linked package
Installation
Option 1: Install globally from GitHub
npm install -g github:defrex/drizzle-mcp
Option 2: Run directly with npx/bunx (no installation required)
npx github:defrex/drizzle-mcp --help
bunx github:defrex/drizzle-mcp --help
Option 3: Link for development (if working on the package)
# In the drizzle-mcp directory
bun link

# In your project directory
bun link drizzle-mcp
Usage
Basic Usage
Run the server with your Drizzle config file:

drizzle-mcp ./drizzle.config.ts
Or use the config option:

drizzle-mcp --config ./drizzle.config.ts
Claude Desktop Integration
Add to your Claude Desktop configuration:

{
  "mcpServers": {
    "drizzle": {
      "command": "npx",
      "args": ["github:defrex/drizzle-mcp", "./drizzle.config.ts"]
    }
  }
}
Or with bunx:

{
  "mcpServers": {
    "drizzle": {
      "command": "bunx",
      "args": ["github:defrex/drizzle-mcp", "./drizzle.config.ts"]
    }
  }
}
Command Line Options
drizzle-mcp [options] [config]

Arguments:
  config               Path to drizzle config file

Options:
  -V, --version        output the version number
  -c, --config <path>  Path to drizzle config file
  -d, --cwd <path>     Working directory (default: current directory)
  -v, --verbose        Enable verbose logging
  -h, --help           display help for command
Configuration
The server automatically detects your Drizzle configuration from:

Command line argument: drizzle-mcp ./my-config.ts
Current directory: drizzle.config.ts, drizzle.config.js, or drizzle.config.mjs
Your Drizzle config should be a standard drizzle-kit configuration file.

Environment Variables
The server automatically loads environment variables from .env.local and .env files in your project directory. This is useful for database credentials:

# .env.local
DATABASE_URL=postgresql://username:password@localhost:5432/database
The server will detect and use DATABASE_URL from your environment variables, so you can use it in your drizzle config:

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // ...
});
Available Tools
drizzle_generate_migration - Generate new migration files
drizzle_run_migrations - Apply pending migrations
drizzle_introspect_schema - Introspect existing database schema
execute_query - Execute raw SQL queries
initialize_database - Initialize database connection
Available Resources
database://tables - List all database tables
database://schema - Complete database schema information
Note: Resources are database-agnostic and work with both SQLite and PostgreSQL

Requirements
Node.js 18 or higher
An existing Drizzle project with:
drizzle-orm >= 0.40.0
drizzle-kit >= 0.30.0
For SQLite: better-sqlite3 >= 9.0.0
For PostgreSQL: pg >= 8.0.0 OR postgres >= 3.4.0
Note: The server automatically detects which database driver you have installed and uses the appropriate one.

Example Configuration
SQLite Configuration
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./src/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "./database.db",
  },
});
PostgreSQL Configuration
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    // Or use individual credentials:
    // host: "localhost",
    // port: 5432,
    // user: "username",
    // password: "password",
    // database: "database",
  },
});
Note: The server supports both pg (node-postgres) and postgres (postgres-js) drivers. It will automatically detect which one you have installed and use the appropriate one.

Supported Databases
Currently supports:

SQLite - Via better-sqlite3
PostgreSQL - Via pg (node-postgres) or postgres (postgres-js)
The server automatically detects which database drivers you have installed and uses the appropriate ones. For PostgreSQL, it will try postgres first, then fall back to pg.

Support for MySQL is planned for future releases.

Development
The server is built with:

Node.js - JavaScript runtime
TypeScript - Type-safe development
Drizzle ORM - Database ORM and query builder
Commander.js - CLI argument parsing
MCP SDK - Model Context Protocol implementation
dotenv - Environment variable loading
Building from Source
git clone https://github.com/defrex/drizzle-mcp.git
cd drizzle-mcp
bun install
bun run build
Key Features
Automatic Module Resolution: Resolves database drivers and drizzle-orm from your project's dependencies
Environment Variable Loading: Automatically loads .env.local and .env files from your project
Cross-Platform: Works with npm, bun, and various package managers
Comprehensive Error Handling: Detailed error messages with context for easier debugging
Security: Input validation and sanitization for all user inputs
