Ergonomic Framework for Humans
Backend TypeScript framework with End-to-End Type Safety, formidable speed, and exceptional developer experience.
Supercharged by Bun
Get Started
bun create elysia app

See why developers love Elysia

The first production ready,
and most loved Bun framework
Trusted by team at
X/Twitter
CS Money
CS Money
Bank for Agriculture and Agricultural Cooperatives Thailand
Abacate Pay
ConnexTicket
Decidable logo
Our Principle
Design for Humans
Our goal is to design an ergonomic, sensible, and productive framework that even beginners can use easily

Designed to avoid unnecessary complexity and type complexity for you to focus on building

A framework that feels just like JavaScript

import { Elysia, file } from 'elysia'

new Elysia()
	.get('/', 'Hello World')
	.get('/image', file('mika.webp'))
	.get('/stream', function* () {
		yield 'Hello'
		yield 'World'
	})
	.ws('/realtime', {
		message(ws, message) {
			ws.send('got:' + message)
		}
	})
	.listen(3000)
Just return
A string, number, or complex JSON

All we need to do is return

File support built-in
To send a file or image, just return

Nothing more or less

Stream response
Use yield to stream a response

All we need to do is return

Data in real-time
With µWebSocket built-in

Send live data in just 3 lines

21x
faster than Express

6x
faster than Fastify

Elysia Bun
2,454,631 reqs/s
Gin Go
676,019

Spring Java
506,087

Fastify Node
415,600

Express Node
113,117

Nest Node
105,064

Measured in requests/second. Result from TechEmpower Benchmark Round 22 (2023-10-17) in PlainText

It's all about
Single Source of Truth
Schema is the only source of truth for your entire server. From request validation, type inference, OpenAPI documentation, client-server communication. Every part of Elysia is design for complete type integrity.

Request Validation
Elysia validates, and normalize requests against your schema, ensuring that only valid data reaches your handlers.

Elysia also infers types directly from your schema, ensuring that your handlers always receive the correct types in both runtime, and type-level.

import { Elysia, t } from 'elysia'

new Elysia()
	.put('/', ({ body: { file } }) => file, {
		body: t.Object({
			file: t.File({ type: 'image' })
		})
	})
Advance Type Inference
Every part of Elysia is designed to be completely type-safe far more advance type inference than any other frameworks.

Elysia also infers type from your schema, provide an auto-completion for models or extends Elysia with your own custom property all while ensuring complete type integrity.


index.ts

auth.ts
import { Elysia } from 'elysia'
import { auth } from './auth'

new Elysia()
	.use(auth)
	.get('/profile', ({ user }) => user, {
        auth: true
	})
Client-Server Communication
Elysia can share types between client and server similar to tRPC, ensuring that both sides are always in sync.

Taking a step further, Elysia also handle multiple HTTP status and arrange them using discriminated union, allowing you to handle all possible error cases with ease.

import { treaty } from '@elysiajs/eden'
import type { App } from 'server'

const api = treaty<App>('api.elysiajs.com')

const { data } = await api.profile.patch({
    age: 21
})
OpenAPI Documentation
Elysia generates OpenAPI documentation from your schema in 1 line. Ensuring your API documentation are always accurate and up-to-date.

import { Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'

new Elysia()
	.use(openapi())
OpenAPI Type Gen
Introducing our most powerful feature yet
TypeScript to OpenAPI
Elysia can generate OpenAPI specifications directly from your TypeScript code without any annotations, without any configuration and CLI running.

Allowing you to turn your actual code from any library like Prisma, Drizzle and every TypeScript library into your own API documentation.

import { Elysia } from 'elysia'
import { openapi, fromTypes } from '@elysiajs/openapi'

export const app = new Elysia()
	.use(
		openapi({
			// ↓ Where magic happens 
			references: fromTypes()
		})
	)
Bring your ownValidator
With support for
Standard Schema
Elysia offers a robust built-in validation, but you can also bring your favorite validator, like Zod, Valibot, ArkType, Effect and more

With seamless support for type inference, and OpenAPI. You will feel right at home .


TypeBox

Zod

Valibot

ArkType

Effect
import { Elysia, t } from 'elysia'


new Elysia()
	// Try hover body  ↓
	.post('/user', ({ body }) => body, {
		body: t.Object({
			name: t.Literal('SaltyAom'),
			age: t.Number(),
			friends: t.Array(t.String())
		})
	})
11.88msPOST /character/:id/chatPlayback
Request
Validation
Transaction
Upload
Sync
For DevOps
OpenTelemetry
Elysia has 1st party support for OpenTelemetry. Instrumentation is built-in, so you can easily monitor your services regardless of the platform.

import { treaty } from '@elysiajs/eden'
import type { App } from 'server'

const api = treaty<App>('api.elysiajs.com')

const { data } = await api.profile.patch({
    age: 21
})
For Frontend
End-to-end Type Safety
Like tRPC, Elysia provides type-safety from the backend to the frontend without code generation. The interaction between frontend and backend is both type-checked at compile and runtime.

Test withConfidence
Type safe with
auto-completion
Elysia provides a type-safe layer to interact with and test your server, from routes to parameters.

With auto-completion, you can easily write tests for the server without any hassle.

import { treaty } from '@elysiajs/eden'
import { app } from './index'
import { test, expect } from 'bun:test'

const server = treaty(app)

test('should handle duplicated user', async () => {
	const { error } = await server.user.put({
Argument of type '{ username: string; }' is not assignable to parameter of type '{ username: string; password: string; }'.
  Property 'password' is missing in type '{ username: string; }' but required in type '{ username: string; password: string; }'.
	    username: 'mika',
	})

	expect(error?.value).toEqual({
		success: false,
		message: 'Username already taken'
	})
})

Your code,
Your Runtime
Elysia is optimized for Bun,
but not vendor lock-in to Bun
Elysia is built on Web-Standard
allowing you to run Elysia anywhere
Integration with AI SDK
Elysia provides a support for response streaming with ease, allowing you to integrate with Vercel AI SDKs seamlessly.

Response Streaming
Elysia support continous streaming of a ReadableStream and Response allowing you to return stream directly from the AI SDKs.


import { Elysia } from 'elysia'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

new Elysia().get('/', () => {
    const stream = streamText({
        model: openai('gpt-5'),
        system: 'You are Yae Miko from Genshin Impact',
        prompt: 'Hi! How are you doing?'
    })

    // Just return a ReadableStream
    return stream.textStream 

    // UI Message Stream is also supported
    return stream.toUIMessageStream() 
})
Elysia will handle the stream automatically, allowing you to use it in various ways.

Server Sent Event
Elysia also supports Server Sent Event for streaming response by simply wrap a ReadableStream with sse function.


import { Elysia, sse } from 'elysia'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

new Elysia().get('/', () => {
    const stream = streamText({
        model: openai('gpt-5'),
        system: 'You are Yae Miko from Genshin Impact',
        prompt: 'Hi! How are you doing?'
    })

    // Each chunk will be sent as a Server Sent Event
    return sse(stream.textStream) 

    // UI Message Stream is also supported
    return sse(stream.toUIMessageStream()) 
})
As Response
If you don't need a type-safety of the stream for further usage with Eden, you can return the stream directly as a response.


import { Elysia } from 'elysia'
import { ai } from 'ai'
import { openai } from '@ai-sdk/openai'

new Elysia().get('/', () => {
    const stream = streamText({
        model: openai('gpt-5'),
        system: 'You are Yae Miko from Genshin Impact',
        prompt: 'Hi! How are you doing?'
    })

    return stream.toTextStreamResponse() 

    // UI Message Stream Response will use SSE
    return stream.toUIMessageStreamResponse() 
})
Manual Streaming
If you want to have more control over the streaming, you can use a generator function to yield the chunks manually.


import { Elysia, sse } from 'elysia'
import { ai } from 'ai'
import { openai } from '@ai-sdk/openai'

new Elysia().get('/', async function* () {
    const stream = streamText({
        model: openai('gpt-5'),
        system: 'You are Yae Miko from Genshin Impact',
        prompt: 'Hi! How are you doing?'
    })

    for await (const data of stream.textStream) 
        yield sse({ 
            data, 
            event: 'message'
        }) 

    yield sse({
        event: 'done'
    })
})
Fetch
If AI SDK doesn't support model you're using, you can still use the fetch function to make requests to the AI SDKs and stream the response directly.


import { Elysia, fetch } from 'elysia'

new Elysia().get('/', () => {
    return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-5',
            stream: true,
            messages: [
                {
                    role: 'system',
                    content: 'You are Yae Miko from Genshin Impact'
                },
                { role: 'user', content: 'Hi! How are you doing?' }
            ]
        })
    })
})
Elysia will proxy fetch response with streaming support automatically.

For additional information, please refer to AI SDK documentation

Drizzle
Drizzle ORM is a headless TypeScript ORM with a focus on type safety and developer experience.

We may convert Drizzle schema to Elysia validation models using drizzle-typebox

Drizzle Typebox
Elysia.t is a fork of TypeBox, allowing us to use any TypeBox type in Elysia directly.

We can convert Drizzle schema into TypeBox schema using "drizzle-typebox", and use it directly on Elysia's schema validation.

Here's how it works:
Define your database schema in Drizzle.
Convert Drizzle schema into Elysia validation models using drizzle-typebox.
Use the converted Elysia validation models to ensure type validation.
OpenAPI schema is generated from Elysia validation models.
Add Eden Treaty to add type-safety to your frontend.

                                                    * ——————————————— *
                                                    |                 |
                                               | -> |  Documentation  |
* ————————— *             * ———————— * OpenAPI |    |                 |
|           |   drizzle-  |          | ——————— |    * ——————————————— *
|  Drizzle  | —————————-> |  Elysia  |
|           |  -typebox   |          | ——————— |    * ——————————————— *
* ————————— *             * ———————— *   Eden  |    |                 |
                                               | -> |  Frontend Code  |
												    |                 |
												    * ——————————————— *
Installation
To install Drizzle, run the following command:


bun add drizzle-orm drizzle-typebox
Then you need to pin @sinclair/typebox as there might be a mismatch version between drizzle-typebox and Elysia, this may cause conflict of Symbols between two versions.

We recommend pinning the version of @sinclair/typebox to the minimum version used by elysia by using:


grep "@sinclair/typebox" node_modules/elysia/package.json
We may use overrides field in package.json to pin the version of @sinclair/typebox:


{
  "overrides": {
  	"@sinclair/typebox": "0.32.4"
  }
}
Drizzle schema
Assuming we have a user table in our codebase as follows:


src/database/schema.ts

import {
    pgTable,
    varchar,
    timestamp
} from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'

export const user = pgTable(
    'user',
    {
        id: varchar('id')
            .$defaultFn(() => createId())
            .primaryKey(),
        username: varchar('username').notNull().unique(),
        password: varchar('password').notNull(),
        email: varchar('email').notNull().unique(),
        salt: varchar('salt', { length: 64 }).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
    }
)

export const table = {
	user
} as const

export type Table = typeof table
drizzle-typebox
We may convert the user table into TypeBox models by using drizzle-typebox:


src/index.ts

import { t } from 'elysia'
import { createInsertSchema } from 'drizzle-typebox'
import { table } from './database/schema'

const _createUser = createInsertSchema(table.user, {
	// Replace email with Elysia's email type
	email: t.String({ format: 'email' })
})

new Elysia()
	.post('/sign-up', ({ body }) => {
		// Create a new user
	}, {
		body: t.Omit(
			_createUser,
			['id', 'salt', 'createdAt']
		)
	})
This allows us to reuse the database schema in Elysia validation models

Type instantiation is possibly infinite
If you got an error like Type instantiation is possibly infinite this is because of the circular reference between drizzle-typebox and Elysia.

If we nested a type from drizzle-typebox into Elysia schema, it will cause an infinite loop of type instantiation.

To prevent this, we need to explicitly define a type between drizzle-typebox and Elysia schema:


import { t } from 'elysia'
import { createInsertSchema } from 'drizzle-typebox'

import { table } from './database/schema'

const _createUser = createInsertSchema(table.user, {
	email: t.String({ format: 'email' })
})

// ✅ This works, by referencing the type from `drizzle-typebox`
const createUser = t.Omit(
	_createUser,
	['id', 'salt', 'createdAt']
)

// ❌ This will cause an infinite loop of type instantiation
const createUser = t.Omit(
	createInsertSchema(table.user, {
		email: t.String({ format: 'email' })
	}),
	['id', 'salt', 'createdAt']
)
Always declare a variable for drizzle-typebox and reference it if you want to use Elysia type

Utility
As we are likely going to use t.Pick and t.Omit to exclude or include certain fields, it may be cumbersome to repeat the process:

We recommend using these utility functions (copy as-is) to simplify the process:


src/database/utils.ts

/**
 * @lastModified 2025-02-04
 * @see https://elysiajs.com/recipe/drizzle.html#utility
 */

import { Kind, type TObject } from '@sinclair/typebox'
import {
    createInsertSchema,
    createSelectSchema,
    BuildSchema,
} from 'drizzle-typebox'

import { table } from './schema'
import type { Table } from 'drizzle-orm'

type Spread<
    T extends TObject | Table,
    Mode extends 'select' | 'insert' | undefined,
> =
    T extends TObject<infer Fields>
        ? {
              [K in keyof Fields]: Fields[K]
          }
        : T extends Table
          ? Mode extends 'select'
              ? BuildSchema<
                    'select',
                    T['_']['columns'],
                    undefined
                >['properties']
              : Mode extends 'insert'
                ? BuildSchema<
                      'insert',
                      T['_']['columns'],
                      undefined
                  >['properties']
                : {}
          : {}

/**
 * Spread a Drizzle schema into a plain object
 */
export const spread = <
    T extends TObject | Table,
    Mode extends 'select' | 'insert' | undefined,
>(
    schema: T,
    mode?: Mode,
): Spread<T, Mode> => {
    const newSchema: Record<string, unknown> = {}
    let table

    switch (mode) {
        case 'insert':
        case 'select':
            if (Kind in schema) {
                table = schema
                break
            }

            table =
                mode === 'insert'
                    ? createInsertSchema(schema)
                    : createSelectSchema(schema)

            break

        default:
            if (!(Kind in schema)) throw new Error('Expect a schema')
            table = schema
    }

    for (const key of Object.keys(table.properties))
        newSchema[key] = table.properties[key]

    return newSchema as any
}

/**
 * Spread a Drizzle Table into a plain object
 *
 * If `mode` is 'insert', the schema will be refined for insert
 * If `mode` is 'select', the schema will be refined for select
 * If `mode` is undefined, the schema will be spread as is, models will need to be refined manually
 */
export const spreads = <
    T extends Record<string, TObject | Table>,
    Mode extends 'select' | 'insert' | undefined,
>(
    models: T,
    mode?: Mode,
): {
    [K in keyof T]: Spread<T[K], Mode>
} => {
    const newSchema: Record<string, unknown> = {}
    const keys = Object.keys(models)

    for (const key of keys) newSchema[key] = spread(models[key], mode)

    return newSchema as any
}
This utility function will convert Drizzle schema into a plain object, which can pick by property name as plain object:


// ✅ Using spread utility function
const user = spread(table.user, 'insert')

const createUser = t.Object({
	id: user.id, // { type: 'string' }
	username: user.username, // { type: 'string' }
	password: user.password // { type: 'string' }
})

// ⚠️ Using t.Pick
const _createUser = createInsertSchema(table.user)

const createUser = t.Pick(
	_createUser,
	['id', 'username', 'password']
)
Table Singleton
We recommend using a singleton pattern to store the table schema, this will allow us to access the table schema from anywhere in the codebase:


src/database/model.ts

import { table } from './schema'
import { spreads } from './utils'

export const db = {
	insert: spreads({
		user: table.user,
	}, 'insert'),
	select: spreads({
		user: table.user,
	}, 'select')
} as const
This will allow us to access the table schema from anywhere in the codebase:


src/index.ts

import { Elysia, t } from 'elysia'
import { db } from './database/model'

const { user } = db.insert

new Elysia()
	.post('/sign-up', ({ body }) => {
		// Create a new user
	}, {
		body: t.Object({
			id: user.username,
			username: user.username,
			password: user.password
		})
	})
Refinement
If type refinement is needed, you may use createInsertSchema and createSelectSchema to refine the schema directly.


src/database/model.ts

import { t } from 'elysia'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { table } from './schema'
import { spreads } from './utils'

export const db = {
	insert: spreads({
		user: createInsertSchema(table.user, {
			email: t.String({ format: 'email' })
		}),
	}, 'insert'),
	select: spreads({
		user: createSelectSchema(table.user, {
			email: t.String({ format: 'email' })
		})
	}, 'select')
} as const
In the code above, we refine a user.email schema to include a format property

The spread utility function will skip a refined schema, so you can use it as is.

For more information, please refer to the Drizzle ORM and Drizzle TypeBox documentation.
Better Auth
Better Auth is framework-agnostic authentication (and authorization) framework for TypeScript.

It provides a comprehensive set of features out of the box and includes a plugin ecosystem that simplifies adding advanced functionalities.

We recommend going through the Better Auth basic setup before going through this page.

Our basic setup will look like this:


import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

export const auth = betterAuth({
    database: new Pool()
})
Handler
After setting up Better Auth instance, we can mount to Elysia via mount.

We need to mount the handler to Elysia endpoint.


import { Elysia } from 'elysia'
import { auth } from './auth'

const app = new Elysia()
	.mount(auth.handler) 
	.listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
Then we can access Better Auth with http://localhost:3000/api/auth.

Custom endpoint
We recommend setting a prefix path when using mount.


import { Elysia } from 'elysia'

const app = new Elysia()
	.mount('/auth', auth.handler) 
	.listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
Then we can access Better Auth with http://localhost:3000/auth/api/auth.

But the URL looks redundant, we can customize the /api/auth prefix to something else in Better Auth instance.


import { betterAuth } from 'better-auth'
import { openAPI } from 'better-auth/plugins'
import { passkey } from 'better-auth/plugins/passkey'

import { Pool } from 'pg'

export const auth = betterAuth({
    basePath: '/api'
})
Then we can access Better Auth with http://localhost:3000/auth/api.

Unfortunately, we can't set basePath of a Better Auth instance to be empty or /.

OpenAPI
Better Auth support openapi with better-auth/plugins.

However if we are using @elysiajs/openapi, you might want to extract the documentation from Better Auth instance.

We may do that with the following code:


import { openAPI } from 'better-auth/plugins'

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema())

export const OpenAPI = {
    getPaths: (prefix = '/auth/api') =>
        getSchema().then(({ paths }) => {
            const reference: typeof paths = Object.create(null)

            for (const path of Object.keys(paths)) {
                const key = prefix + path
                reference[key] = paths[path]

                for (const method of Object.keys(paths[path])) {
                    const operation = (reference[key] as any)[method]

                    operation.tags = ['Better Auth']
                }
            }

            return reference
        }) as Promise<any>,
    components: getSchema().then(({ components }) => components) as Promise<any>
} as const
Then in our Elysia instance that use @elysiajs/openapi.


import { Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'

import { OpenAPI } from './auth'

const app = new Elysia().use(
    openapi({
        documentation: {
            components: await OpenAPI.components,
            paths: await OpenAPI.getPaths()
        }
    })
)
CORS
To configure cors, you can use the cors plugin from @elysiajs/cors.


import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { auth } from './auth'

const app = new Elysia()
    .use(
        cors({
            origin: 'http://localhost:3001',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization']
        })
    )
    .mount(auth.handler)
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
Macro
You can use macro with resolve to provide session and user information before pass to view.


import { Elysia } from 'elysia'
import { auth } from './auth'

// user middleware (compute user and session and pass to routes)
const betterAuth = new Elysia({ name: 'better-auth' })
    .mount(auth.handler)
    .macro({
        auth: {
            async resolve({ status, request: { headers } }) {
                const session = await auth.api.getSession({
                    headers
                })

                if (!session) return status(401)

                return {
                    user: session.user,
                    session: session.session
                }
            }
        }
    })

const app = new Elysia()
    .use(betterAuth)
    .get('/user', ({ user }) => user, {
        auth: true
    })
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
This will allow you to access the user and session object in all of your routes.