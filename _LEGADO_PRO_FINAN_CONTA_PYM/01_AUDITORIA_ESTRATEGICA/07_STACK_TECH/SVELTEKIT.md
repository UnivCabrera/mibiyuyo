SvelteKitGetting started
Introduction
On this page
Introduction
Before we begin
What is SvelteKit?
What is Svelte?
SvelteKit vs Svelte
Before we begin
If you’re new to Svelte or SvelteKit we recommend checking out the interactive tutorial.

If you get stuck, reach out for help in the Discord chatroom.

What is SvelteKit?
SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte. If you’re coming from React, SvelteKit is similar to Next. If you’re coming from Vue, SvelteKit is similar to Nuxt.

To learn more about the kinds of applications you can build with SvelteKit, see the documentation regarding project types.

What is Svelte?
In short, Svelte is a way of writing user interface components — like a navigation bar, comment section, or contact form — that users see and interact with in their browsers. The Svelte compiler converts your components to JavaScript that can be run to render the HTML for the page and to CSS that styles the page. You don’t need to know Svelte to understand the rest of this guide, but it will help. If you’d like to learn more, check out the Svelte tutorial.

SvelteKit vs Svelte
Svelte renders UI components. You can compose these components and render an entire page with just Svelte, but you need more than just Svelte to write an entire app.

SvelteKit helps you build web apps while following modern best practices and providing solutions to common development challenges. It offers everything from basic functionalities — like a router that updates your UI when a link is clicked — to more advanced capabilities. Its extensive list of features includes build optimizations to load only the minimal required code; offline support; preloading pages before user navigation; configurable rendering to handle different parts of your app on the server via SSR, in the browser through client-side rendering, or at build-time with prerendering; image optimization; and much more. Building an app with all the modern best practices is fiendishly complicated, but SvelteKit does all the boring stuff for you so that you can get on with the creative part.

It reflects changes to your code in the browser instantly to provide a lightning-fast and feature-rich development experience by leveraging Vite with a Svelte plugin to do Hot Module Replacement (HMR).
Creating a project
On this page
Creating a project
Editor setup
The easiest way to start building a SvelteKit app is to run npx sv create:

npx sv create my-app
cd my-app
npm run dev
The first command will scaffold a new project in the my-app directory asking if you’d like to set up some basic tooling such as TypeScript. See the CLI docs for information about these options and the integrations page for pointers on setting up additional tooling. npm run dev will then start the development server on localhost:5173 - make sure you install dependencies before running this if you didn’t do so during project creation.

There are two basic concepts:

Each page of your app is a Svelte component
You create pages by adding files to the src/routes directory of your project. These will be server-rendered so that a user’s first visit to your app is as fast as possible, then a client-side app takes over
Try editing the files to get a feel for how everything works.

Editor setup
We recommend using Visual Studio Code (aka VS Code) with the Svelte extension, but support also exists for numerous other editors.
SvelteKitGetting started
Project types
On this page
Project types
Default rendering
Static site generation
Single-page app
Multi-page app
Separate backend
Serverless app
Your own server
Container
Library
Offline app
Mobile app
Desktop app
Browser extension
Embedded device
SvelteKit offers configurable rendering, which allows you to build and deploy your project in several different ways. You can build all of the below types of applications and more with SvelteKit. Rendering settings are not mutually exclusive and you may choose the optimal manner with which to render different parts of your application.

If you don’t have a particular way you’d like to build your application in mind, don’t worry! The way your application is built, deployed, and rendered is controlled by which adapter you’ve chosen and a small amount of configuration and these can always be changed later. The project structure and routing will be the same regardless of the project type that you choose.

Default rendering
By default, when a user visits a site, SvelteKit will render the first page with server-side rendering (SSR) and subsequent pages with client-side rendering (CSR). Using SSR for the initial render improves SEO and perceived performance of the initial page load. Client-side rendering then takes over and updates the page without having to rerender common components, which is typically faster and eliminates a flash when navigating between pages. Apps built with this hybrid rendering approach have also been called transitional apps.

Static site generation
You can use SvelteKit as a static site generator (SSG) that fully prerenders your site with static rendering using adapter-static. You may also use the prerender option to prerender only some pages and then choose a different adapter with which to dynamically server-render other pages.

Tools built solely to do static site generation may scale the prerendering process more efficiently during build when rendering a very large number of pages. When working with very large statically generated sites, you can avoid long build times with Incremental Static Regeneration (ISR) if using adapter-vercel. And in contrast to purpose-built SSGs, SvelteKit allows for nicely mixing and matching different rendering types on different pages.

Single-page app
Single-page apps (SPAs) exclusively use client-side rendering (CSR). You can build single-page apps (SPAs) with SvelteKit. As with all types of SvelteKit applications, you can write your backend in SvelteKit or another language or framework. If you are building an application with no backend or a separate backend, you can simply skip over and ignore the parts of the docs talking about server files.

Multi-page app
SvelteKit isn’t typically used to build traditional multi-page apps. However, in SvelteKit you can remove all JavaScript on a page with csr = false, which will render subsequent links on the server, or you can use data-sveltekit-reload to render specific links on the server.

Separate backend
If your backend is written in another language such as Go, Java, PHP, Ruby, Rust, or C#, there are a couple of ways that you can deploy your application. The most recommended way would be to deploy your SvelteKit frontend separately from your backend utilizing adapter-node or a serverless adapter. Some users prefer not to have a separate process to manage and decide to deploy their application as a single-page app (SPA) served by their backend server, but note that single-page apps have worse SEO and performance characteristics.

If you are using an external backend, you can simply skip over and ignore the parts of the docs talking about server files. You may also want to reference the FAQ about how to make calls to a separate backend.

Serverless app
SvelteKit apps are simple to run on serverless platforms. The default zero config adapter will automatically run your app on a number of supported platforms or you can use adapter-vercel, adapter-netlify, or adapter-cloudflare to provide platform-specific configuration. And community adapters allow you to deploy your application to almost any serverless environment. Some of these adapters such as adapter-vercel and adapter-netlify offer an edge option, to support edge rendering for improved latency.

Your own server
You can deploy to your own server or VPS using adapter-node.

Container
You can use adapter-node to run a SvelteKit app within a container such as Docker or LXC.

Library
You can create a library to be used by other Svelte apps with the @sveltejs/package add-on to SvelteKit by choosing the library option when running sv create.

Offline app
SvelteKit has full support for service workers allowing you to build many types of applications such as offline apps and progressive web apps.

Mobile app
You can turn a SvelteKit SPA into a mobile app with Tauri or Capacitor. Mobile features like the camera, geolocation, and push notifications are available via plugins for both platforms.

These mobile development platforms work by starting a local web server and then serving your application like a static host on your phone. You may find bundleStrategy: 'single' to be a helpful option to limit the number of requests made. E.g. at the time of writing, the Capacitor local server uses HTTP/1, which limits the number of concurrent connections.

Desktop app
You can turn a SvelteKit SPA into a desktop app with Tauri, Wails, or Electron.

Browser extension
You can build browser extensions using either adapter-static or community adapters specifically tailored towards browser extensions.

Embedded device
Because of its efficient rendering, Svelte can be run on low power devices. Embedded devices like microcontrollers and TVs may limit the number of concurrent connections. In order to reduce the number of concurrent requests, you may find bundleStrategy: 'single' to be a helpful option in this deployment configuration.

SvelteKitGetting started
Project structure
On this page
Project structure
Project files
Other files
A typical SvelteKit project looks like this:

my-project/
├ src/
│ ├ lib/
│ │ ├ server/
│ │ │ └ [your server-only lib files]
│ │ └ [your lib files]
│ ├ params/
│ │ └ [your param matchers]
│ ├ routes/
│ │ └ [your routes]
│ ├ app.html
│ ├ error.html
│ ├ hooks.client.js
│ ├ hooks.server.js
│ ├ service-worker.js
│ └ tracing.server.js
├ static/
│ └ [your static assets]
├ tests/
│ └ [your tests]
├ package.json
├ svelte.config.js
├ tsconfig.json
└ vite.config.js
You’ll also find common files like .gitignore and .npmrc (and .prettierrc and eslint.config.js and so on, if you chose those options when running npx sv create).

Project files
src
The src directory contains the meat of your project. Everything except src/routes and src/app.html is optional.

lib contains your library code (utilities and components), which can be imported via the $lib alias, or packaged up for distribution using svelte-package
server contains your server-only library code. It can be imported by using the $lib/server alias. SvelteKit will prevent you from importing these in client code.
params contains any param matchers your app needs
routes contains the routes of your application. You can also colocate other components that are only used within a single route here
app.html is your page template — an HTML document containing the following placeholders:
%sveltekit.head% — <link> and <script> elements needed by the app, plus any <svelte:head> content
%sveltekit.body% — the markup for a rendered page. This should live inside a <div> or other element, rather than directly inside <body>, to prevent bugs caused by browser extensions injecting elements that are then destroyed by the hydration process. SvelteKit will warn you in development if this is not the case
%sveltekit.assets% — either paths.assets, if specified, or a relative path to paths.base
%sveltekit.nonce% — a CSP nonce for manually included links and scripts, if used
%sveltekit.env.[NAME]% - this will be replaced at render time with the [NAME] environment variable, which must begin with the publicPrefix (usually PUBLIC\_). It will fallback to '' if not matched.
%sveltekit.version% — the app version, which can be specified with the version configuration
error.html is the page that is rendered when everything else fails. It can contain the following placeholders:
%sveltekit.status% — the HTTP status
%sveltekit.error.message% — the error message
hooks.client.js contains your client hooks
hooks.server.js contains your server hooks
service-worker.js contains your service worker
instrumentation.server.js contains your observability setup and instrumentation code
Requires adapter support. If your adapter supports it, it is guaranteed to run prior to loading and running your application code.
(Whether the project contains .js or .ts files depends on whether you opt to use TypeScript when you create your project.)

If you added Vitest when you set up your project, your unit tests will live in the src directory with a .test.js extension.

static
Any static assets that should be served as-is, like robots.txt or favicon.png, go in here.

tests
If you added Playwright for browser testing when you set up your project, the tests will live in this directory.

package.json
Your package.json file must include @sveltejs/kit, svelte and vite as devDependencies.

When you create a project with npx sv create, you’ll also notice that package.json includes "type": "module". This means that .js files are interpreted as native JavaScript modules with import and export keywords. Legacy CommonJS files need a .cjs file extension.

svelte.config.js
This file contains your Svelte and SvelteKit configuration.

tsconfig.json
This file (or jsconfig.json, if you prefer type-checked .js files over .ts files) configures TypeScript, if you added typechecking during npx sv create. Since SvelteKit relies on certain configuration being set a specific way, it generates its own .svelte-kit/tsconfig.json file which your own config extends. To make changes to top-level options such as include and exclude, we recommend extending the generated config; see the typescript.config setting for more details.

vite.config.js
A SvelteKit project is really just a Vite project that uses the @sveltejs/kit/vite plugin, along with any other Vite configuration.

Other files
.svelte-kit
As you develop and build your project, SvelteKit will generate files in a .svelte-kit directory (configurable as outDir). You can ignore its contents, and delete them at any time (they will be regenerated when you next dev or build).

SvelteKitGetting started
Web standards
On this page
Web standards
Fetch APIs
FormData
Stream APIs
URL APIs
Web Crypto
Throughout this documentation, you’ll see references to the standard Web APIs that SvelteKit builds on top of. Rather than reinventing the wheel, we use the platform, which means your existing web development skills are applicable to SvelteKit. Conversely, time spent learning SvelteKit will help you be a better web developer elsewhere.

These APIs are available in all modern browsers and in many non-browser environments like Cloudflare Workers, Deno, and Vercel Functions. During development, and in adapters for Node-based environments (including AWS Lambda), they’re made available via polyfills where necessary (for now, that is — Node is rapidly adding support for more web standards).

In particular, you’ll get comfortable with the following:

Fetch APIs
SvelteKit uses fetch for getting data from the network. It’s available in hooks and server routes as well as in the browser.

A special version of fetch is available in load functions, server hooks and API routes for invoking endpoints directly during server-side rendering, without making an HTTP call, while preserving credentials. (To make credentialled fetches in server-side code outside load, you must explicitly pass cookie and/or authorization headers.) It also allows you to make relative requests, whereas server-side fetch normally requires a fully qualified URL.

Besides fetch itself, the Fetch API includes the following interfaces:

Request
An instance of Request is accessible in hooks and server routes as event.request. It contains useful methods like request.json() and request.formData() for getting data that was posted to an endpoint.

Response
An instance of Response is returned from await fetch(...) and handlers in +server.js files. Fundamentally, a SvelteKit app is a machine for turning a Request into a Response.

Headers
The Headers interface allows you to read incoming request.headers and set outgoing response.headers. For example, you can get the request.headers as shown below, and use the json convenience function to send modified response.headers:

src/routes/what-is-my-user-agent/+server

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ request }) => {
// log all headers
console.log(...request.headers);

    // create a JSON Response using a header we received
    return json({
    	// retrieve a specific header
    	userAgent: request.headers.get('user-agent')
    }, {
    	// set a header on the response
    	headers: { 'x-custom-header': 'potato' }
    });

};
FormData
When dealing with HTML native form submissions you’ll be working with FormData objects.

src/routes/hello/+server

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
const body = await event.request.formData();

    // log all fields
    console.log([...body]);

    return json({
    	// get a specific field's value
    	name: body.get('name') ?? 'world'
    });

};
Stream APIs
Most of the time, your endpoints will return complete data, as in the userAgent example above. Sometimes, you may need to return a response that’s too large to fit in memory in one go, or is delivered in chunks, and for this the platform provides streams — ReadableStream, WritableStream and TransformStream.

URL APIs
URLs are represented by the URL interface, which includes useful properties like origin and pathname (and, in the browser, hash). This interface shows up in various places — event.url in hooks and server routes, page.url in pages, from and to in beforeNavigate and afterNavigate and so on.

URLSearchParams
Wherever you encounter a URL, you can access query parameters via url.searchParams, which is an instance of URLSearchParams:

const foo = url.searchParams.get('foo');
Web Crypto
The Web Crypto API is made available via the crypto global. It’s used internally for Content Security Policy headers, but you can also use it for things like generating UUIDs:

const uuid = crypto.randomUUID();

velteKitCore concepts
Routing
On this page
Routing
+page
+error
+layout
+server
$types
Other files
Further reading
At the heart of SvelteKit is a filesystem-based router. The routes of your app — i.e. the URL paths that users can access — are defined by the directories in your codebase:

src/routes is the root route
src/routes/about creates an /about route
src/routes/blog/[slug] creates a route with a parameter, slug, that can be used to load data dynamically when a user requests a page like /blog/hello-world
You can change src/routes to a different directory by editing the project config.

Each route directory contains one or more route files, which can be identified by their + prefix.

We’ll introduce these files in a moment in more detail, but here are a few simple rules to help you remember how SvelteKit’s routing works:

All files can run on the server
All files run on the client except +server files
+layout and +error files apply to subdirectories as well as the directory they live in
+page
+page.svelte
A +page.svelte component defines a page of your app. By default, pages are rendered both on the server (SSR) for the initial request and in the browser (CSR) for subsequent navigation.

src/routes/+page

<h1>Hello and welcome to my site!</h1>
<a href="/about">About my site</a>
src/routes/about/+page

<h1>About this site</h1>
<p>TODO...</p>
<a href="/">Home</a>
SvelteKit uses <a> elements to navigate between routes, rather than a framework-specific <Link> component.

Pages can receive data from load functions via the data prop.

src/routes/blog/[slug]/+page

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>
PageProps was added in 2.16.0. In earlier versions, you had to type the data property manually with PageData instead, see $types.

In Svelte 4, you’d use export let data instead.

+page.js
Often, a page will need to load some data before it can be rendered. For this, we add a +page.js module that exports a load function:

src/routes/blog/[slug]/+page

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
if (params.slug === 'hello-world') {
return {
title: 'Hello world!',
content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
};
}

    error(404, 'Not found');

};
This function runs alongside +page.svelte, which means it runs on the server during server-side rendering and in the browser during client-side navigation. See load for full details of the API.

As well as load, +page.js can export values that configure the page’s behaviour:

export const prerender = true or false or 'auto'
export const ssr = true or false
export const csr = true or false
You can find more information about these in page options.

+page.server.js
If your load function can only run on the server — for example, if it needs to fetch data from a database or you need to access private environment variables like API keys — then you can rename +page.js to +page.server.js and change the PageLoad type to PageServerLoad.

src/routes/blog/[slug]/+page.server

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
const post = await getPostFromDatabase(params.slug);

    if (post) {
    	return post;
    }

    error(404, 'Not found');

};
During client-side navigation, SvelteKit will load this data from the server, which means that the returned value must be serializable using devalue. See load for full details of the API.

Like +page.js, +page.server.js can export page options — prerender, ssr and csr.

A +page.server.js file can also export actions. If load lets you read data from the server, actions let you write data to the server using the <form> element. To learn how to use them, see the form actions section.

+error
If an error occurs during load, SvelteKit will render a default error page. You can customise this error page on a per-route basis by adding an +error.svelte file:

src/routes/blog/[slug]/+error

<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>{page.status}: {page.error.message}</h1>
$app/state was added in SvelteKit 2.12. If you’re using an earlier version or are using Svelte 4, use $app/stores instead.

SvelteKit will ‘walk up the tree’ looking for the closest error boundary — if the file above didn’t exist it would try src/routes/blog/+error.svelte and then src/routes/+error.svelte before rendering the default error page. If that fails (or if the error was thrown from the load function of the root +layout, which sits ‘above’ the root +error), SvelteKit will bail out and render a static fallback error page, which you can customise by creating a src/error.html file.

If the error occurs inside a load function in +layout(.server).js, the closest error boundary in the tree is an +error.svelte file above that layout (not next to it).

If no route can be found (404), src/routes/+error.svelte (or the default error page, if that file does not exist) will be used.

+error.svelte is not used when an error occurs inside handle or a +server.js request handler.

You can read more about error handling here.

+layout
So far, we’ve treated pages as entirely standalone components — upon navigation, the existing +page.svelte component will be destroyed, and a new one will take its place.

But in many apps, there are elements that should be visible on every page, such as top-level navigation or a footer. Instead of repeating them in every +page.svelte, we can put them in layouts.

+layout.svelte
To create a layout that applies to every page, make a file called src/routes/+layout.svelte. The default layout (the one that SvelteKit uses if you don’t bring your own) looks like this...

<script>
	let { children } = $props();
</script>

{@render children()}
...but we can add whatever markup, styles and behaviour we want. The only requirement is that the component includes a @render tag for the page content. For example, let’s add a nav bar:

src/routes/+layout

<script lang="ts">
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/settings">Settings</a>
</nav>

{@render children()}
If we create pages for /, /about and /settings...

src/routes/+page

<h1>Home</h1>
src/routes/about/+page

<h1>About</h1>
src/routes/settings/+page

<h1>Settings</h1>
...the nav will always be visible, and clicking between the three pages will only result in the <h1> being replaced.

Layouts can be nested. Suppose we don’t just have a single /settings page, but instead have nested pages like /settings/profile and /settings/notifications with a shared submenu (for a real-life example, see github.com/settings).

We can create a layout that only applies to pages below /settings (while inheriting the root layout with the top-level nav):

src/routes/settings/+layout

<script lang="ts">
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<h1>Settings</h1>

<div class="submenu">
	{#each data.sections as section}
		<a href="/settings/{section.slug}">{section.title}</a>
	{/each}
</div>

{@render children()}
LayoutProps was added in 2.16.0. In earlier versions, you had to type the properties manually instead.

You can see how data is populated by looking at the +layout.js example in the next section just below.

By default, each layout inherits the layout above it. Sometimes that isn’t what you want - in this case, advanced layouts can help you.

+layout.js
Just like +page.svelte loading data from +page.js, your +layout.svelte component can get data from a load function in +layout.js.

src/routes/settings/+layout

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
return {
sections: [
{ slug: 'profile', title: 'Profile' },
{ slug: 'notifications', title: 'Notifications' }
]
};
};
If a +layout.js exports page options — prerender, ssr and csr — they will be used as defaults for child pages.

Data returned from a layout’s load function is also available to all its child pages:

src/routes/settings/profile/+page

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	console.log(data.sections); // [{ slug: 'profile', title: 'Profile' }, ...]
</script>

Often, layout data is unchanged when navigating between pages. SvelteKit will intelligently rerun load functions when necessary.

+layout.server.js
To run your layout’s load function on the server, move it to +layout.server.js, and change the LayoutLoad type to LayoutServerLoad.

Like +layout.js, +layout.server.js can export page options — prerender, ssr and csr.

+server
As well as pages, you can define routes with a +server.js file (sometimes referred to as an ‘API route’ or an ‘endpoint’), which gives you full control over the response. Your +server.js file exports functions corresponding to HTTP verbs like GET, POST, PATCH, PUT, DELETE, OPTIONS, and HEAD that take a RequestEvent argument and return a Response object.

For example we could create an /api/random-number route with a GET handler:

src/routes/api/random-number/+server

import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
const min = Number(url.searchParams.get('min') ?? '0');
const max = Number(url.searchParams.get('max') ?? '1');

    const d = max - min;

    if (isNaN(d) || d < 0) {
    	error(400, 'min and max must be numbers, and min must be less than max');
    }

    const random = min + Math.random() * d;

    return new Response(String(random));

};
The first argument to Response can be a ReadableStream, making it possible to stream large amounts of data or create server-sent events (unless deploying to platforms that buffer responses, like AWS Lambda).

You can use the error, redirect and json methods from @sveltejs/kit for convenience (but you don’t have to).

If an error is thrown (either error(...) or an unexpected error), the response will be a JSON representation of the error or a fallback error page — which can be customised via src/error.html — depending on the Accept header. The +error.svelte component will not be rendered in this case. You can read more about error handling here.

When creating an OPTIONS handler, note that Vite will inject Access-Control-Allow-Origin and Access-Control-Allow-Methods headers — these will not be present in production unless you add them.

+layout files have no effect on +server.js files. If you want to run some logic before each request, add it to the server handle hook.

Receiving data
By exporting POST / PUT/PATCH/DELETE/OPTIONS/HEAD handlers, +server.js files can be used to create a complete API:

src/routes/add/+page

<script lang="ts">
	let a = $state(0);
	let b = $state(0);
	let total = $state(0);

	async function add() {
		const response = await fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify({ a, b }),
			headers: {
				'content-type': 'application/json'
			}
		});

		total = await response.json();
	}
</script>

<input type="number" bind:value={a}> +
<input type="number" bind:value={b}> =
{total}

<button onclick={add}>Calculate</button>
src/routes/api/add/+server

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
const { a, b } = await request.json();
return json(a + b);
};
In general, form actions are a better way to submit data from the browser to the server.

If a GET handler is exported, a HEAD request will return the content-length of the GET handler’s response body.

Fallback method handler
Exporting the fallback handler will match any unhandled request methods, including methods like MOVE which have no dedicated export from +server.js.

src/routes/api/add/+server

import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
const { a, b } = await request.json();
return json(a + b);
};

// This handler will respond to PUT, PATCH, DELETE, etc.

export const fallback: RequestHandler = async ({ request }) => {
return text(`I caught your ${request.method} request!`);
};
For HEAD requests, the GET handler takes precedence over the fallback handler.

Content negotiation
+server.js files can be placed in the same directory as +page files, allowing the same route to be either a page or an API endpoint. To determine which, SvelteKit applies the following rules:

PUT / PATCH/DELETE/OPTIONS requests are always handled by +server.js since they do not apply to pages
GET / POST/HEAD requests are treated as page requests if the accept header prioritises text/html (in other words, it’s a browser page request), else they are handled by +server.js.
Responses to GET requests will include a Vary: Accept header, so that proxies and browsers cache HTML and JSON responses separately.
$types
Throughout the examples above, we’ve been importing types from a $types.d.ts file. This is a file SvelteKit creates for you in a hidden directory if you’re using TypeScript (or JavaScript with JSDoc type annotations) to give you type safety when working with your root files.

For example, annotating let { data } = $props() with PageProps (or LayoutProps, for a +layout.svelte file) tells TypeScript that the type of data is whatever was returned from load:

src/routes/blog/[slug]/+page

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

The PageProps and LayoutProps types, added in 2.16.0, are a shortcut for typing the data prop as PageData or LayoutData, as well as other props, such as form for pages, or children for layouts. In earlier versions, you had to type these properties manually. For example, for a page:

+page

import type { PageData, ActionData } from './$types';

let { data, form }: { data: PageData, form: ActionData } = $props();
Or, for a layout:

+layout

import type { LayoutData } from './$types';

let { data, children }: { data: LayoutData, children: Snippet } = $props();
In turn, annotating the load function with PageLoad, PageServerLoad, LayoutLoad or LayoutServerLoad (for +page.js, +page.server.js, +layout.js and +layout.server.js respectively) ensures that params and the return value are correctly typed.

If you’re using VS Code or any IDE that supports the language server protocol and TypeScript plugins then you can omit these types entirely! Svelte’s IDE tooling will insert the correct types for you, so you’ll get type checking without writing them yourself. It also works with our command line tool svelte-check.

You can read more about omitting $types in our blog post about it.

Other files
Any other files inside a route directory are ignored by SvelteKit. This means you can colocate components and utility modules with the routes that need them.

If components and modules are needed by multiple routes, it’s a good idea to put them in $lib.

Further reading
Tutorial: Routing
Tutorial: API routes
Docs: Advanced routing
Edit this page on GitHub
llms.txt

SvelteKitCore concepts
Loading data
On this page
Loading data
Page data
Layout data
page.data
Universal vs server
Using URL data
Making fetch requests
Cookies
Headers
Using parent data
Errors
Redirects
Streaming with promises
Parallel loading
Rerunning load functions
Implications for authentication
Using getRequestEvent
Further reading
Before a +page.svelte component (and its containing +layout.svelte components) can be rendered, we often need to get some data. This is done by defining load functions.

Page data
A +page.svelte file can have a sibling +page.js that exports a load function, the return value of which is available to the page via the data prop:

src/routes/blog/[slug]/+page

import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
return {
post: {
title: `Title for ${params.slug} goes here`,
content: `Content for ${params.slug} goes here`
}
};
};
src/routes/blog/[slug]/+page

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
Before version 2.16.0, the props of a page and layout had to be typed individually:

+page

import type { PageData } from './$types';

let { data }: { data: PageData } = $props();
In Svelte 4, you’d use export let data instead.

Thanks to the generated $types module, we get full type safety.

A load function in a +page.js file runs both on the server and in the browser (unless combined with export const ssr = false, in which case it will only run in the browser). If your load function should always run on the server (because it uses private environment variables, for example, or accesses a database) then it would go in a +page.server.js instead.

A more realistic version of your blog post’s load function, that only runs on the server and pulls data from a database, might look like this:

src/routes/blog/[slug]/+page.server

import \* as db from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
return {
post: await db.getPost(params.slug)
};
};
Notice that the type changed from PageLoad to PageServerLoad, because server load functions can access additional arguments. To understand when to use +page.js and when to use +page.server.js, see Universal vs server.

Layout data
Your +layout.svelte files can also load data, via +layout.js or +layout.server.js.

src/routes/blog/[slug]/+layout.server

import \* as db from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
return {
posts: await db.getPostSummaries()
};
};
src/routes/blog/[slug]/+layout

<script lang="ts">
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<main>
	<!-- +page.svelte is `@render`ed here -->
	{@render children()}
</main>

<aside>
	<h2>More posts</h2>
	<ul>
		{#each data.posts as post}
			<li>
				<a href="/blog/{post.slug}">
					{post.title}
				</a>
			</li>
		{/each}
	</ul>
</aside>
LayoutProps was added in 2.16.0. In earlier versions, properties had to be typed individually:

+layout

import type { LayoutData } from './$types';

let { data, children }: { data: LayoutData, children: Snippet } = $props();
Data returned from layout load functions is available to child +layout.svelte components and the +page.svelte component as well as the layout that it ‘belongs’ to.

src/routes/blog/[slug]/+page

<script lang="ts">
	import { page } from '$app/state';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	// we can access `data.posts` because it's returned from
	// the parent layout `load` function
	let index = $derived(data.posts.findIndex(post => post.slug === page.params.slug));
	let next = $derived(data.posts[index + 1]);
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>

{#if next}

<p>Next post: <a href="/blog/{next.slug}">{next.title}</a></p>
{/if}
If multiple load functions return data with the same key, the last one ‘wins’ — the result of a layout load returning { a: 1, b: 2 } and a page load returning { b: 3, c: 4 } would be { a: 1, b: 3, c: 4 }.

page.data
The +page.svelte component, and each +layout.svelte component above it, has access to its own data plus all the data from its parents.

In some cases, we might need the opposite — a parent layout might need to access page data or data from a child layout. For example, the root layout might want to access a title property returned from a load function in +page.js or +page.server.js. This can be done with page.data:

src/routes/+layout

<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>

<title>{page.data.title}</title>
</svelte:head>
Type information for page.data is provided by App.PageData.

$app/state was added in SvelteKit 2.12. If you’re using an earlier version or are using Svelte 4, use $app/stores instead. It provides a page store with the same interface that you can subscribe to, e.g. $page.data.title.

Universal vs server
As we’ve seen, there are two types of load function:

+page.js and +layout.js files export universal load functions that run both on the server and in the browser
+page.server.js and +layout.server.js files export server load functions that only run server-side
Conceptually, they’re the same thing, but there are some important differences to be aware of.

When does which load function run?
Server load functions always run on the server.

By default, universal load functions run on the server during SSR when the user first visits your page. They will then run again during hydration, reusing any responses from fetch requests. All subsequent invocations of universal load functions happen in the browser. You can customize the behavior through page options. If you disable server-side rendering, you’ll get an SPA and universal load functions always run on the client.

If a route contains both universal and server load functions, the server load runs first.

A load function is invoked at runtime, unless you prerender the page — in that case, it’s invoked at build time.

Input
Both universal and server load functions have access to properties describing the request (params, route and url) and various functions (fetch, setHeaders, parent, depends and untrack). These are described in the following sections.

Server load functions are called with a ServerLoadEvent, which inherits clientAddress, cookies, locals, platform and request from RequestEvent.

Universal load functions are called with a LoadEvent, which has a data property. If you have load functions in both +page.js and +page.server.js (or +layout.js and +layout.server.js), the return value of the server load function is the data property of the universal load function’s argument.

Output
A universal load function can return an object containing any values, including things like custom classes and component constructors.

A server load function must return data that can be serialized with devalue — anything that can be represented as JSON plus things like BigInt, Date, Map, Set and RegExp, or repeated/cyclical references — so that it can be transported over the network. Your data can include promises, in which case it will be streamed to browsers. If you need to serialize/deserialize custom types, use transport hooks.

When to use which
Server load functions are convenient when you need to access data directly from a database or filesystem, or need to use private environment variables.

Universal load functions are useful when you need to fetch data from an external API and don’t need private credentials, since SvelteKit can get the data directly from the API rather than going via your server. They are also useful when you need to return something that can’t be serialized, such as a Svelte component constructor.

In rare cases, you might need to use both together — for example, you might need to return an instance of a custom class that was initialised with data from your server. When using both, the server load return value is not passed directly to the page, but to the universal load function (as the data property):

src/routes/+page.server

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
return {
serverMessage: 'hello from server load function'
};
};
src/routes/+page

import type { PageLoad } from './$types';
export const load: PageLoad = async ({ data }) => {
return {
serverMessage: data.serverMessage,
universalMessage: 'hello from universal load function'
};
};
Using URL data
Often the load function depends on the URL in one way or another. For this, the load function provides you with url, route and params.

url
An instance of URL, containing properties like the origin, hostname, pathname and searchParams (which contains the parsed query string as a URLSearchParams object). url.hash cannot be accessed during load, since it is unavailable on the server.

In some environments this is derived from request headers during server-side rendering. If you’re using adapter-node, for example, you may need to configure the adapter in order for the URL to be correct.

route
Contains the name of the current route directory, relative to src/routes:

src/routes/a/[b]/[...c]/+page

import type { PageLoad } from './$types';

export const load: PageLoad = ({ route }) => {
console.log(route.id); // '/a/[b]/[...c]'
};
params
params is derived from url.pathname and route.id.

Given a route.id of /a/[b]/[...c] and a url.pathname of /a/x/y/z, the params object would look like this:

{
"b": "x",
"c": "y/z"
}
Making fetch requests
To get data from an external API or a +server.js handler, you can use the provided fetch function, which behaves identically to the native fetch web API with a few additional features:

It can be used to make credentialed requests on the server, as it inherits the cookie and authorization headers for the page request.
It can make relative requests on the server (ordinarily, fetch requires a URL with an origin when used in a server context).
Internal requests (e.g. for +server.js routes) go directly to the handler function when running on the server, without the overhead of an HTTP call.
During server-side rendering, the response will be captured and inlined into the rendered HTML by hooking into the text, json and arrayBuffer methods of the Response object. Note that headers will not be serialized, unless explicitly included via filterSerializedResponseHeaders.
During hydration, the response will be read from the HTML, guaranteeing consistency and preventing an additional network request - if you received a warning in your browser console when using the browser fetch instead of the load fetch, this is why.
src/routes/items/[id]/+page

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
const res = await fetch(`/api/items/${params.id}`);
const item = await res.json();

    return { item };

};
Cookies
A server load function can get and set cookies.

src/routes/+layout.server

import \* as db from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
const sessionid = cookies.get('sessionid');

    return {
    	user: await db.getUser(sessionid)
    };

};
Cookies will only be passed through the provided fetch function if the target host is the same as the SvelteKit application or a more specific subdomain of it.

For example, if SvelteKit is serving my.domain.com:

domain.com WILL NOT receive cookies
my.domain.com WILL receive cookies
api.domain.com WILL NOT receive cookies
sub.my.domain.com WILL receive cookies
Other cookies will not be passed when credentials: 'include' is set, because SvelteKit does not know which domain which cookie belongs to (the browser does not pass this information along), so it’s not safe to forward any of them. Use the handleFetch hook to work around it.

Headers
Both server and universal load functions have access to a setHeaders function that, when running on the server, can set headers for the response. (When running in the browser, setHeaders has no effect.) This is useful if you want the page to be cached, for example:

src/routes/products/+page

import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch, setHeaders }) => {
const url = `https://cms.example.com/products.json`;
const response = await fetch(url);

    // Headers are only set during SSR, caching the page's HTML
    // for the same length of time as the underlying data.
    setHeaders({
    	age: response.headers.get('age'),
    	'cache-control': response.headers.get('cache-control')
    });

    return response.json();

};
Setting the same header multiple times (even in separate load functions) is an error. You can only set a given header once using the setHeaders function. You cannot add a set-cookie header with setHeaders — use cookies.set(name, value, options) instead.

Using parent data
Occasionally it’s useful for a load function to access data from a parent load function, which can be done with await parent():

src/routes/+layout

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
return { a: 1 };
};
src/routes/abc/+layout

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
const { a } = await parent();
return { b: a + 1 };
};
src/routes/abc/+page

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
const { a, b } = await parent();
return { c: a + b };
};
src/routes/abc/+page

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<!-- renders `1 + 2 = 3` -->
<p>{data.a} + {data.b} = {data.c}</p>
Notice that the load function in +page.js receives the merged data from both layout load functions, not just the immediate parent.

Inside +page.server.js and +layout.server.js, parent returns data from parent +layout.server.js files.

In +page.js or +layout.js it will return data from parent +layout.js files. However, a missing +layout.js is treated as a ({ data }) => data function, meaning that it will also return data from parent +layout.server.js files that are not ‘shadowed’ by a +layout.js file

Take care not to introduce waterfalls when using await parent(). Here, for example, getData(params) does not depend on the result of calling parent(), so we should call it first to avoid a delayed render.

+page

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
const parentData = await parent();
const data = await getData(params);
const parentData = await parent();

    return {
    	...data,
    	meta: { ...parentData.meta, ...data.meta }
    };

};
Errors
If an error is thrown during load, the nearest +error.svelte will be rendered. For expected errors, use the error helper from @sveltejs/kit to specify the HTTP status code and an optional message:

src/routes/admin/+layout.server

import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
if (!locals.user) {
error(401, 'not logged in');
}

    if (!locals.user.isAdmin) {
    	error(403, 'not an admin');
    }

};
Calling error(...) will throw an exception, making it easy to stop execution from inside helper functions.

If an unexpected error is thrown, SvelteKit will invoke handleError and treat it as a 500 Internal Error.

In SvelteKit 1.x you had to throw the error yourself

Redirects
To redirect users, use the redirect helper from @sveltejs/kit to specify the location to which they should be redirected alongside a 3xx status code. Like error(...), calling redirect(...) will throw an exception, making it easy to stop execution from inside helper functions.

src/routes/user/+layout.server

import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
if (!locals.user) {
redirect(307, '/login');
}
};
Don’t use redirect() inside a try {...} block, as the redirect will immediately trigger the catch statement.

In the browser, you can also navigate programmatically outside of a load function using goto from $app.navigation.

In SvelteKit 1.x you had to throw the redirect yourself

Streaming with promises
When using a server load, promises will be streamed to the browser as they resolve. This is useful if you have slow, non-essential data, since you can start rendering the page before all the data is available:

src/routes/blog/[slug]/+page.server

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
return {
// make sure the `await` happens at the end, otherwise we
// can't start loading comments until we've loaded the post
comments: loadComments(params.slug),
post: await loadPost(params.slug)
};
};
This is useful for creating skeleton loading states, for example:

src/routes/blog/[slug]/+page

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>

{#await data.comments}
Loading comments...
{:then comments}
{#each comments as comment}

<p>{comment.content}</p>
{/each}
{:catch error}
<p>error loading comments: {error.message}</p>
{/await}
When streaming data, be careful to handle promise rejections correctly. More specifically, the server could crash with an “unhandled promise rejection” error if a lazy-loaded promise fails before rendering starts (at which point it’s caught) and isn’t handling the error in some way. When using SvelteKit’s fetch directly in the load function, SvelteKit will handle this case for you. For other promises, it is enough to attach a noop-catch to the promise to mark it as handled.

src/routes/+page.server

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ fetch }) => {
const ok_manual = Promise.reject();
ok_manual.catch(() => {});

    return {
    	ok_manual,
    	ok_fetch: fetch('/fetch/that/could/fail'),
    	dangerous_unhandled: Promise.reject()
    };

};
On platforms that do not support streaming, such as AWS Lambda or Firebase, responses will be buffered. This means the page will only render once all promises resolve. If you are using a proxy (e.g. NGINX), make sure it does not buffer responses from the proxied server.

Streaming data will only work when JavaScript is enabled. You should avoid returning promises from a universal load function if the page is server rendered, as these are not streamed — instead, the promise is recreated when the function reruns in the browser.

The headers and status code of a response cannot be changed once the response has started streaming, therefore you cannot setHeaders or throw redirects inside a streamed promise.

In SvelteKit 1.x top-level promises were automatically awaited, only nested promises were streamed.

Parallel loading
When rendering (or navigating to) a page, SvelteKit runs all load functions concurrently, avoiding a waterfall of requests. During client-side navigation, the result of calling multiple server load functions are grouped into a single response. Once all load functions have returned, the page is rendered.

Rerunning load functions
SvelteKit tracks the dependencies of each load function to avoid rerunning it unnecessarily during navigation.

For example, given a pair of load functions like these...

src/routes/blog/[slug]/+page.server

import \* as db from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
return {
post: await db.getPost(params.slug)
};
};
src/routes/blog/[slug]/+layout.server

import \* as db from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
return {
posts: await db.getPostSummaries()
};
};
...the one in +page.server.js will rerun if we navigate from /blog/trying-the-raw-meat-diet to /blog/i-regret-my-choices because params.slug has changed. The one in +layout.server.js will not, because the data is still valid. In other words, we won’t call db.getPostSummaries() a second time.

A load function that calls await parent() will also rerun if a parent load function is rerun.

Dependency tracking does not apply after the load function has returned — for example, accessing params.x inside a nested promise will not cause the function to rerun when params.x changes. (Don’t worry, you’ll get a warning in development if you accidentally do this.) Instead, access the parameter in the main body of your load function.

Search parameters are tracked independently from the rest of the url. For example, accessing event.url.searchParams.get("x") inside a load function will make that load function re-run when navigating from ?x=1 to ?x=2, but not when navigating from ?x=1&y=1 to ?x=1&y=2.

Untracking dependencies
In rare cases, you may wish to exclude something from the dependency tracking mechanism. You can do this with the provided untrack function:

src/routes/+page

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ untrack, url }) => {
// Untrack url.pathname so that path changes don't trigger a rerun
if (untrack(() => url.pathname === '/')) {
return { message: 'Welcome!' };
}
};
Manual invalidation
You can also rerun load functions that apply to the current page using invalidate(url), which reruns all load functions that depend on url, and invalidateAll(), which reruns every load function. Server load functions will never automatically depend on a fetched url to avoid leaking secrets to the client.

A load function depends on url if it calls fetch(url) or depends(url). Note that url can be a custom identifier that starts with [a-z]::

src/routes/random-number/+page

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, depends }) => {
// load reruns when `invalidate('https://api.example.com/random-number')` is called...
const response = await fetch('https://api.example.com/random-number');

    // ...or when `invalidate('app:random')` is called
    depends('app:random');

    return {
    	number: await response.json()
    };

};
src/routes/random-number/+page

<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	function rerunLoadFunction() {
		// any of these will cause the `load` function to rerun
		invalidate('app:random');
		invalidate('https://api.example.com/random-number');
		invalidate(url => url.href.includes('random-number'));
		invalidateAll();
	}
</script>

<p>random number: {data.number}</p>
<button onclick={rerunLoadFunction}>Update random number</button>
When do load functions rerun?
To summarize, a load function will rerun in the following situations:

It references a property of params whose value has changed
It references a property of url (such as url.pathname or url.search) whose value has changed. Properties in request.url are not tracked
It calls url.searchParams.get(...), url.searchParams.getAll(...) or url.searchParams.has(...) and the parameter in question changes. Accessing other properties of url.searchParams will have the same effect as accessing url.search.
It calls await parent() and a parent load function reran
A child load function calls await parent() and is rerunning, and the parent is a server load function
It declared a dependency on a specific URL via fetch (universal load only) or depends, and that URL was marked invalid with invalidate(url)
All active load functions were forcibly rerun with invalidateAll()
params and url can change in response to a <a href=".."> link click, a <form> interaction, a goto invocation, or a redirect.

Note that rerunning a load function will update the data prop inside the corresponding +layout.svelte or +page.svelte; it does not cause the component to be recreated. As a result, internal state is preserved. If this isn’t what you want, you can reset whatever you need to reset inside an afterNavigate callback, and/or wrap your component in a {#key ...} block.

Implications for authentication
A couple features of loading data have important implications for auth checks:

Layout load functions do not run on every request, such as during client side navigation between child routes. (When do load functions rerun?)
Layout and page load functions run concurrently unless await parent() is called. If a layout load throws, the page load function runs, but the client will not receive the returned data.
There are a few possible strategies to ensure an auth check occurs before protected code.

To prevent data waterfalls and preserve layout load caches:

Use hooks to protect multiple routes before any load functions run
Use auth guards directly in +page.server.js load functions for route specific protection
Putting an auth guard in +layout.server.js requires all child pages to call await parent() before protected code. Unless every child page depends on returned data from await parent(), the other options will be more performant.

Using getRequestEvent
When running server load functions, the event object passed to the function as an argument can also be retrieved with getRequestEvent. This allows shared logic (such as authentication guards) to access information about the current request without it needing to be passed around.

For example, you might have a function that requires users to be logged in, and redirects them to /login if not:

src/lib/server/auth

import { redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';

export function requireLogin() {
const { locals, url } = getRequestEvent();

    // assume `locals.user` is populated in `handle`
    if (!locals.user) {
    	const redirectTo = url.pathname + url.search;
    	const params = new URLSearchParams({ redirectTo });

    	redirect(307, `/login?${params}`);
    }

    return locals.user;

}
Now, you can call requireLogin in any load function (or form action, for example) to guarantee that the user is logged in:

+page.server

import { requireLogin } from '$lib/server/auth';

export function load() {
const user = requireLogin();

    // `user` is guaranteed to be a user object here, because otherwise
    // `requireLogin` would throw a redirect and we wouldn't get here
    return {
    	message: `hello ${user.name}!`
    };

}

SvelteKitCore concepts
Form actions
On this page
Form actions
Default actions
Named actions
Anatomy of an action
Loading data
Progressive enhancement
Alternatives
GET vs POST
Further reading
A +page.server.js file can export actions, which allow you to POST data to the server using the <form> element.

When using <form>, client-side JavaScript is optional, but you can easily progressively enhance your form interactions with JavaScript to provide the best user experience.

Default actions
In the simplest case, a page declares a default action:

src/routes/login/+page.server

import type { Actions } from './$types';

export const actions = {
default: async (event) => {
// TODO log the user in
}
} satisfies Actions;
To invoke this action from the /login page, just add a <form> — no JavaScript needed:

src/routes/login/+page

<form method="POST">
	<label>
		Email
		<input name="email" type="email">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Log in</button>
</form>
If someone were to click the button, the browser would send the form data via POST request to the server, running the default action.

Actions always use POST requests, since GET requests should never have side-effects.

We can also invoke the action from other pages (for example if there’s a login widget in the nav in the root layout) by adding the action attribute, pointing to the page:

src/routes/+layout

<form method="POST" action="/login">
	<!-- content -->
</form>
Named actions
Instead of one default action, a page can have as many named actions as it needs:

src/routes/login/+page.server

import type { Actions } from './$types';

export const actions = {
default: async (event) => {
login: async (event) => {
// TODO log the user in
},
register: async (event) => {
// TODO register the user
}
} satisfies Actions;
To invoke a named action, add a query parameter with the name prefixed by a / character:

src/routes/login/+page

<form method="POST" action="?/register">
src/routes/+layout

<form method="POST" action="/login?/register">
As well as the action attribute, we can use the formaction attribute on a button to POST the same form data to a different action than the parent <form>:

src/routes/login/+page

<form method="POST" action="?/login">
	<label>
		Email
		<input name="email" type="email">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Log in</button>
	<button formaction="?/register">Register</button>
</form>
We can’t have default actions next to named actions, because if you POST to a named action without a redirect, the query parameter is persisted in the URL, which means the next default POST would go through the named action from before.

Anatomy of an action
Each action receives a RequestEvent object, allowing you to read the data with request.formData(). After processing the request (for example, logging the user in by setting a cookie), the action can respond with data that will be available through the form property on the corresponding page and through page.form app-wide until the next update.

src/routes/login/+page.server

import \* as db from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
const user = await db.getUserFromSession(cookies.get('sessionid'));
return { user };
};

export const actions = {
login: async ({ cookies, request }) => {
const data = await request.formData();
const email = data.get('email');
const password = data.get('password');

    	const user = await db.getUser(email);
    	cookies.set('sessionid', await db.createSession(user), { path: '/' });

    	return { success: true };
    },
    register: async (event) => {
    	// TODO register the user
    }

} satisfies Actions;
src/routes/login/+page

<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

{#if form?.success}

<!-- this message is ephemeral; it exists because the page was rendered in
	       response to a form submission. it will vanish if the user reloads -->
<p>Successfully logged in! Welcome back, {data.user.name}</p>
{/if}
PageProps was added in 2.16.0. In earlier versions, you had to type the data and form properties individually:

+page

import type { PageData, ActionData } from './$types';

let { data, form }: { data: PageData, form: ActionData } = $props();
In Svelte 4, you’d use export let data and export let form instead to declare properties.

Validation errors
If the request couldn’t be processed because of invalid data, you can return validation errors — along with the previously submitted form values — back to the user so that they can try again. The fail function lets you return an HTTP status code (typically 400 or 422, in the case of validation errors) along with the data. The status code is available through page.status and the data through form:

src/routes/login/+page.server

import { fail } from '@sveltejs/kit';
import \* as db from '$lib/server/db';
import type { Actions } from './$types';

export const actions = {
login: async ({ cookies, request }) => {
const data = await request.formData();
const email = data.get('email');
const password = data.get('password');

    	if (!email) {
    		return fail(400, { email, missing: true });
    	}

    	const user = await db.getUser(email);

    	if (!user || user.password !== db.hash(password)) {
    		return fail(400, { email, incorrect: true });
    	}

    	cookies.set('sessionid', await db.createSession(user), { path: '/' });

    	return { success: true };
    },
    register: async (event) => {
    	// TODO register the user
    }

} satisfies Actions;
Note that as a precaution, we only return the email back to the page — not the password.

src/routes/login/+page

<form method="POST" action="?/login">
	{#if form?.missing}<p class="error">The email field is required</p>{/if}
	{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
	<label>
		Email
		<input name="email" type="email" value={form?.email ?? ''}>
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Log in</button>
	<button formaction="?/register">Register</button>
</form>
The returned data must be serializable as JSON. Beyond that, the structure is entirely up to you. For example, if you had multiple forms on the page, you could distinguish which <form> the returned form data referred to with an id property or similar.

Redirects
Redirects (and errors) work exactly the same as in load:

src/routes/login/+page.server

import { fail, redirect } from '@sveltejs/kit';
import \* as db from '$lib/server/db';
import type { Actions } from './$types';

export const actions = {
login: async ({ cookies, request, url }) => {
const data = await request.formData();
const email = data.get('email');
const password = data.get('password');

    	const user = await db.getUser(email);
    	if (!user) {
    		return fail(400, { email, missing: true });
    	}

    	if (user.password !== db.hash(password)) {
    		return fail(400, { email, incorrect: true });
    	}

    	cookies.set('sessionid', await db.createSession(user), { path: '/' });

    	if (url.searchParams.has('redirectTo')) {
    		redirect(303, url.searchParams.get('redirectTo'));
    	}

    	return { success: true };
    },
    register: async (event) => {
    	// TODO register the user
    }

} satisfies Actions;
Loading data
After an action runs, the page will be re-rendered (unless a redirect or an unexpected error occurs), with the action’s return value available to the page as the form prop. This means that your page’s load functions will run after the action completes.

Note that handle runs before the action is invoked, and does not rerun before the load functions. This means that if, for example, you use handle to populate event.locals based on a cookie, you must update event.locals when you set or delete the cookie in an action:

src/hooks.server

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
event.locals.user = await getUser(event.cookies.get('sessionid'));
return resolve(event);
};
src/routes/account/+page.server

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = (event) => {
return {
user: event.locals.user
};
};

export const actions = {
logout: async (event) => {
event.cookies.delete('sessionid', { path: '/' });
event.locals.user = null;
}
} satisfies Actions;
Progressive enhancement
In the preceding sections we built a /login action that works without client-side JavaScript — not a fetch in sight. That’s great, but when JavaScript is available we can progressively enhance our form interactions to provide a better user experience.

use:enhance
The easiest way to progressively enhance a form is to add the use:enhance action:

src/routes/login/+page

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	let { form }: PageProps = $props();
</script>

<form method="POST" use:enhance>
use:enhance can only be used with forms that have method="POST" and point to actions defined in a +page.server.js file. It will not work with method="GET", which is the default for forms without a specified method. Attempting to use use:enhance on forms without method="POST" or posting to a +server.js endpoint will result in an error.

Yes, it’s a little confusing that the enhance action and <form action> are both called ‘action’. These docs are action-packed. Sorry.

Without an argument, use:enhance will emulate the browser-native behaviour, just without the full-page reloads. It will:

update the form property, page.form and page.status on a successful or invalid response, but only if the action is on the same page you’re submitting from. For example, if your form looks like <form action="/somewhere/else" ..>, the form prop and the page.form state will not be updated. This is because in the native form submission case you would be redirected to the page the action is on. If you want to have them updated either way, use applyAction
reset the <form> element
invalidate all data using invalidateAll on a successful response
call goto on a redirect response
render the nearest +error boundary if an error occurs
reset focus to the appropriate element
Customising use:enhance
To customise the behaviour, you can provide a SubmitFunction that runs immediately before the form is submitted, and (optionally) returns a callback that runs with the ActionResult.

<form
	method="POST"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		// `formElement` is this `<form>` element
		// `formData` is its `FormData` object that's about to be submitted
		// `action` is the URL to which the form is posted
		// calling `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted

    	return async ({ result, update }) => {
    		// `result` is an `ActionResult` object
    		// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
    	};
    }}

> You can use these functions to show and hide loading UI, and so on.

If you return a callback, you override the default post-submission behavior. To get it back, call update, which accepts invalidateAll and reset parameters, or use applyAction on the result:

src/routes/login/+page

<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import type { PageProps } from './$types';
	let { form }: PageProps = $props();
</script>

<form
	method="POST"
	use:enhance={({ formElement, formData, action, cancel }) => {
		return async ({ result }) => {
			// `result` is an `ActionResult` object
			if (result.type === 'redirect') {
				goto(result.location);
			} else {
				await applyAction(result);
			}
		};
	}}
>
The behaviour of applyAction(result) depends on result.type:

success, failure — sets page.status to result.status and updates form and page.form to result.data (regardless of where you are submitting from, in contrast to update from enhance)
redirect — calls goto(result.location, { invalidateAll: true })
error — renders the nearest +error boundary with result.error
In all cases, focus will be reset.

Custom event listener
We can also implement progressive enhancement ourselves, without use:enhance, with a normal event listener on the <form>:

src/routes/login/+page

<script lang="ts">
	import { invalidateAll, goto } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import type { PageProps } from './$types';
	import type { ActionResult } from '@sveltejs/kit';
	let { form }: PageProps = $props();

	async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) {
		event.preventDefault();
		const data = new FormData(event.currentTarget, event.submitter);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<form method="POST" onsubmit={handleSubmit}>
	<!-- content -->
</form>
Note that you need to deserialize the response before processing it further using the corresponding method from $app/forms. JSON.parse() isn’t enough because form actions - like load functions - also support returning Date or BigInt objects.

If you have a +server.js alongside your +page.server.js, fetch requests will be routed there by default. To POST to an action in +page.server.js instead, use the custom x-sveltekit-action header:

const response = await fetch(this.action, {
method: 'POST',
body: data,
headers: {
'x-sveltekit-action': 'true'
}
});
Alternatives
Form actions are the preferred way to send data to the server, since they can be progressively enhanced, but you can also use +server.js files to expose (for example) a JSON API. Here’s how such an interaction could look like:

src/routes/send-message/+page

<script lang="ts">
	function rerun() {
		fetch('/api/ci', {
			method: 'POST'
		});
	}
</script>

<button onclick={rerun}>Rerun CI</button>
src/routes/api/ci/+server

import type { RequestHandler } from './$types';
export const POST: RequestHandler = () => {
// do something
};
GET vs POST
As we’ve seen, to invoke a form action you must use method="POST".

Some forms don’t need to POST data to the server — search inputs, for example. For these you can use method="GET" (or, equivalently, no method at all), and SvelteKit will treat them like <a> elements, using the client-side router instead of a full page navigation:

<form action="/search">
	<label>
		Search
		<input name="q">
	</label>
</form>
Submitting this form will navigate to /search?q=... and invoke your load function but will not invoke an action. As with <a> elements, you can set the data-sveltekit-reload, data-sveltekit-replacestate, data-sveltekit-keepfocus and data-sveltekit-noscroll attributes on the <form> to control the router’s behaviour.
SvelteKitCore concepts
Page options
On this page
Page options
prerender
entries
ssr
csr
trailingSlash
config
Further reading
By default, SvelteKit will render (or prerender) any component first on the server and send it to the client as HTML. It will then render the component again in the browser to make it interactive in a process called hydration. For this reason, you need to ensure that components can run in both places. SvelteKit will then initialize a router that takes over subsequent navigations.

You can control each of these on a page-by-page basis by exporting options from +page.js or +page.server.js, or for groups of pages using a shared +layout.js or +layout.server.js. To define an option for the whole app, export it from the root layout. Child layouts and pages override values set in parent layouts, so — for example — you can enable prerendering for your entire app then disable it for pages that need to be dynamically rendered.

You can mix and match these options in different areas of your app. For example, you could prerender your marketing page for maximum speed, server-render your dynamic pages for SEO and accessibility and turn your admin section into an SPA by rendering it on the client only. This makes SvelteKit very versatile.

prerender
It’s likely that at least some routes of your app can be represented as a simple HTML file generated at build time. These routes can be prerendered.

+page.js/+page.server.js/+server

export const prerender = true;
Alternatively, you can set export const prerender = true in your root +layout.js or +layout.server.js and prerender everything except pages that are explicitly marked as not prerenderable:

+page.js/+page.server.js/+server

export const prerender = false;
Routes with prerender = true will be excluded from manifests used for dynamic SSR, making your server (or serverless/edge functions) smaller. In some cases you might want to prerender a route but also include it in the manifest (for example, with a route like /blog/[slug] where you want to prerender your most recent/popular content but server-render the long tail) — for these cases, there’s a third option, ‘auto’:

+page.js/+page.server.js/+server

export const prerender = 'auto';
If your entire app is suitable for prerendering, you can use adapter-static, which will output files suitable for use with any static webserver.

The prerenderer will start at the root of your app and generate files for any prerenderable pages or +server.js routes it finds. Each page is scanned for <a> elements that point to other pages that are candidates for prerendering — because of this, you generally don’t need to specify which pages should be accessed. If you do need to specify which pages should be accessed by the prerenderer, you can do so with config.kit.prerender.entries, or by exporting an entries function from your dynamic route.

While prerendering, the value of building imported from $app/environment will be true.

Prerendering server routes
Unlike the other page options, prerender also applies to +server.js files. These files are not affected by layouts, but will inherit default values from the pages that fetch data from them, if any. For example if a +page.js contains this load function...

+page

import type { PageLoad } from './$types';
export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
const res = await fetch('/my-server-route.json');
return await res.json();
};
...then src/routes/my-server-route.json/+server.js will be treated as prerenderable if it doesn’t contain its own export const prerender = false.

When not to prerender
The basic rule is this: for a page to be prerenderable, any two users hitting it directly must get the same content from the server.

Not all pages are suitable for prerendering. Any content that is prerendered will be seen by all users. You can of course fetch personalized data in onMount in a prerendered page, but this may result in a poorer user experience since it will involve blank initial content or loading indicators.

Note that you can still prerender pages that load data based on the page’s parameters, such as a src/routes/blog/[slug]/+page.svelte route.

Accessing url.searchParams during prerendering is forbidden. If you need to use it, ensure you are only doing so in the browser (for example in onMount).

Pages with actions cannot be prerendered, because a server must be able to handle the action POST requests.

Route conflicts
Because prerendering writes to the filesystem, it isn’t possible to have two endpoints that would cause a directory and a file to have the same name. For example, src/routes/foo/+server.js and src/routes/foo/bar/+server.js would try to create foo and foo/bar, which is impossible.

For that reason among others, it’s recommended that you always include a file extension — src/routes/foo.json/+server.js and src/routes/foo/bar.json/+server.js would result in foo.json and foo/bar.json files living harmoniously side-by-side.

For pages, we skirt around this problem by writing foo/index.html instead of foo.

Troubleshooting
If you encounter an error like ‘The following routes were marked as prerenderable, but were not prerendered’ it’s because the route in question (or a parent layout, if it’s a page) has export const prerender = true but the page wasn’t reached by the prerendering crawler and thus wasn’t prerendered.

Since these routes cannot be dynamically server-rendered, this will cause errors when people try to access the route in question. There are a few ways to fix it:

Ensure that SvelteKit can find the route by following links from config.kit.prerender.entries or the entries page option. Add links to dynamic routes (i.e. pages with [parameters] ) to this option if they are not found through crawling the other entry points, else they are not prerendered because SvelteKit doesn’t know what value the parameters should have. Pages not marked as prerenderable will be ignored and their links to other pages will not be crawled, even if some of them would be prerenderable.
Ensure that SvelteKit can find the route by discovering a link to it from one of your other prerendered pages that have server-side rendering enabled.
Change export const prerender = true to export const prerender = 'auto'. Routes with 'auto' can be dynamically server rendered
entries
SvelteKit will discover pages to prerender automatically, by starting at entry points and crawling them. By default, all your non-dynamic routes are considered entry points — for example, if you have these routes...

/ # non-dynamic
/blog# non-dynamic
/blog/[slug] # dynamic, because of `[slug]`
...SvelteKit will prerender / and /blog, and in the process discover links like <a href="/blog/hello-world"> which give it new pages to prerender.

Most of the time, that’s enough. In some situations, links to pages like /blog/hello-world might not exist (or might not exist on prerendered pages), in which case we need to tell SvelteKit about their existence.

This can be done with config.kit.prerender.entries, or by exporting an entries function from a +page.js, a +page.server.js or a +server.js belonging to a dynamic route:

src/routes/blog/[slug]/+page.server

import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
return [
{ slug: 'hello-world' },
{ slug: 'another-blog-post' }
];
};

export const prerender = true;
entries can be an async function, allowing you to (for example) retrieve a list of posts from a CMS or database, in the example above.

ssr
Normally, SvelteKit renders your page on the server first and sends that HTML to the client where it’s hydrated. If you set ssr to false, it renders an empty ‘shell’ page instead. This is useful if your page is unable to be rendered on the server (because you use browser-only globals like document for example), but in most situations it’s not recommended (see appendix).

+page

export const ssr = false;
// If both `ssr` and `csr` are `false`, nothing will be rendered!
If you add export const ssr = false to your root +layout.js, your entire app will only be rendered on the client — which essentially means you turn your app into an SPA.

If all your page options are boolean or string literal values, SvelteKit will evaluate them statically. If not, it will import your +page.js or +layout.js file on the server (both at build time, and at runtime if your app isn’t fully static) so it can evaluate the options. In the second case, browser-only code must not run when the module is loaded. In practice, this means you should import browser-only code in your +page.svelte or +layout.svelte file instead.

csr
Ordinarily, SvelteKit hydrates your server-rendered HTML into an interactive client-side-rendered (CSR) page. Some pages don’t require JavaScript at all — many blog posts and ‘about’ pages fall into this category. In these cases you can disable CSR:

+page

export const csr = false;
// If both `csr` and `ssr` are `false`, nothing will be rendered!
Disabling CSR does not ship any JavaScript to the client. This means:

The webpage should work with HTML and CSS only.

<script> tags inside all Svelte components are removed.
<form> elements cannot be progressively enhanced.
Links are handled by the browser with a full-page navigation.
Hot Module Replacement (HMR) will be disabled.
You can enable csr during development (for example to take advantage of HMR) like so:

+page

import { dev } from '$app/environment';

export const csr = dev;
trailingSlash
By default, SvelteKit will remove trailing slashes from URLs — if you visit /about/, it will respond with a redirect to /about. You can change this behaviour with the trailingSlash option, which can be one of 'never' (the default), 'always', or 'ignore'.

As with other page options, you can export this value from a +layout.js or a +layout.server.js and it will apply to all child pages. You can also export the configuration from +server.js files.

src/routes/+layout

export const trailingSlash = 'always';
This option also affects prerendering. If trailingSlash is always, a route like /about will result in an about/index.html file, otherwise it will create about.html, mirroring static webserver conventions.

Ignoring trailing slashes is not recommended — the semantics of relative paths differ between the two cases (./y from /x is /y, but from /x/ is /x/y), and /x and /x/ are treated as separate URLs which is harmful to SEO.

config
With the concept of adapters, SvelteKit is able to run on a variety of platforms. Each of these might have specific configuration to further tweak the deployment — for example on Vercel you could choose to deploy some parts of your app on the edge and others on serverless environments.

config is an object with key-value pairs at the top level. Beyond that, the concrete shape is dependent on the adapter you’re using. Every adapter should provide a Config interface to import for type safety. Consult the documentation of your adapter for more information.

src/routes/+page

import type { Config } from 'some-adapter';

export const config: Config = {
	runtime: 'edge'
};
config objects are merged at the top level (but not deeper levels). This means you don’t need to repeat all the values in a +page.js if you want to only override some of the values in the upper +layout.js. For example this layout configuration...

src/routes/+layout

export const config = {
	runtime: 'edge',
	regions: 'all',
	foo: {
		bar: true
	}
}
...is overridden by this page configuration...

src/routes/+page

export const config = {
	regions: ['us1', 'us2'],
	foo: {
		baz: true
	}
}
...which results in the config value { runtime: 'edge', regions: ['us1', 'us2'], foo: { baz: true } } for that page.


SvelteKitCore concepts
State management
On this page
State management
Avoid shared state on the server
No side-effects in load
Using state and stores with context
Component and page state is preserved
Storing state in the URL
Storing ephemeral state in snapshots
If you’re used to building client-only apps, state management in an app that spans server and client might seem intimidating. This section provides tips for avoiding some common gotchas.

Avoid shared state on the server
Browsers are stateful — state is stored in memory as the user interacts with the application. Servers, on the other hand, are stateless — the content of the response is determined entirely by the content of the request.

Conceptually, that is. In reality, servers are often long-lived and shared by multiple users. For that reason it’s important not to store data in shared variables. For example, consider this code:

+page.server

import type { PageServerLoad, Actions } from './$types';
let user;

export const load: PageServerLoad = () => {
	return { user };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// NEVER DO THIS!
		user = {
			name: data.get('name'),
			embarrassingSecret: data.get('secret')
		};
	}
} satisfies Actions
The user variable is shared by everyone who connects to this server. If Alice submitted an embarrassing secret, and Bob visited the page after her, Bob would know Alice’s secret. In addition, when Alice returns to the site later in the day, the server may have restarted, losing her data.

Instead, you should authenticate the user using cookies and persist the data to a database.

No side-effects in load
For the same reason, your load functions should be pure — no side-effects (except maybe the occasional console.log(...)). For example, you might be tempted to write to a store or global state inside a load function so that you can use the value in your components:

+page

import { user } from '$lib/user';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/user');

	// NEVER DO THIS!
	user.set(await response.json());
};
As with the previous example, this puts one user’s information in a place that is shared by all users. Instead, just return the data...

+page

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/user');

	return {
		user: await response.json()
	};
};
...and pass it around to the components that need it, or use page.data.

If you’re not using SSR, then there’s no risk of accidentally exposing one user’s data to another. But you should still avoid side-effects in your load functions — your application will be much easier to reason about without them.

Using state and stores with context
You might wonder how we’re able to use page.data and other app state (or app stores) if we can’t use global state. The answer is that app state and app stores on the server use Svelte’s context API — the state (or store) is attached to the component tree with setContext, and when you subscribe you retrieve it with getContext. We can do the same thing with our own state:

src/routes/+layout

<script lang="ts">
	import { setContext } from 'svelte';
	import type { LayoutProps } from './$types';
	let { data }: LayoutProps = $props();

	// Pass a function referencing our state
	// to the context for child components to access
	setContext('user', () => data.user);
</script>

src/routes/user/+page

<script lang="ts">
	import { getContext } from 'svelte';

	// Retrieve user store from context
	const user = getContext('user');
</script>

<p>Welcome {user().name}</p>
We’re passing a function into setContext to keep reactivity across boundaries. Read more about it here

You also use stores from svelte/store for this, but when using Svelte 5 it is recommended to make use of universal reactivity instead.

Updating the value of context-based state in deeper-level pages or components while the page is being rendered via SSR will not affect the value in the parent component because it has already been rendered by the time the state value is updated. In contrast, on the client (when CSR is enabled, which is the default) the value will be propagated and components, pages, and layouts higher in the hierarchy will react to the new value. Therefore, to avoid values ‘flashing’ during state updates during hydration, it is generally recommended to pass state down into components rather than up.

If you’re not using SSR (and can guarantee that you won’t need to use SSR in future) then you can safely keep state in a shared module, without using the context API.

Component and page state is preserved
When you navigate around your application, SvelteKit reuses existing layout and page components. For example, if you have a route like this...

src/routes/blog/[slug]/+page

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// THIS CODE IS BUGGY!
	const wordCount = data.content.split(' ').length;
	const estimatedReadingTime = wordCount / 250;
</script>

<header>
	<h1>{data.title}</h1>
	<p>Reading time: {Math.round(estimatedReadingTime)} minutes</p>
</header>

<div>{@html data.content}</div>
...then navigating from /blog/my-short-post to /blog/my-long-post won’t cause the layout, page and any other components within to be destroyed and recreated. Instead the data prop (and by extension data.title and data.content) will update (as it would with any other Svelte component) and, because the code isn’t rerunning, lifecycle methods like onMount and onDestroy won’t rerun and estimatedReadingTime won’t be recalculated.

Instead, we need to make the value reactive:

src/routes/blog/[slug]/+page

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let wordCount = $derived(data.content.split(' ').length);
	let estimatedReadingTime = $derived(wordCount / 250);
</script>

If your code in onMount and onDestroy has to run again after navigation you can use afterNavigate and beforeNavigate respectively.

Reusing components like this means that things like sidebar scroll state are preserved, and you can easily animate between changing values. In the case that you do need to completely destroy and remount a component on navigation, you can use this pattern:

<script>
	import { page } from '$app/state';
</script>

{#key page.url.pathname}
<BlogPost title={data.title} content={data.title} />
{/key}
Storing state in the URL
If you have state that should survive a reload and/or affect SSR, such as filters or sorting rules on a table, URL search parameters (like ?sort=price&order=ascending) are a good place to put them. You can put them in <a href="..."> or <form action="..."> attributes, or set them programmatically via goto('?key=value'). They can be accessed inside load functions via the url parameter, and inside components via page.url.searchParams.

Storing ephemeral state in snapshots
Some UI state, such as ‘is the accordion open?’, is disposable — if the user navigates away or refreshes the page, it doesn’t matter if the state is lost. In some cases, you do want the data to persist if the user navigates to a different page and comes back, but storing the state in the URL or in a database would be overkill. For this, SvelteKit provides snapshots, which let you associate component state with a history entry.
Advanced
Best practices
Appendix
Reference
SvelteKitCore concepts
Remote functions
On this page
Remote functions
Overview
query
query.batch
form
command
prerender
Handling validation errors
Using getRequestEvent
Redirects
Available since 2.27

Remote functions are a tool for type-safe communication between client and server. They can be called anywhere in your app, but always run on the server, meaning they can safely access server-only modules containing things like environment variables and database clients.

Combined with Svelte’s experimental support for await, it allows you to load and manipulate data directly inside your components.

This feature is currently experimental, meaning it is likely to contain bugs and is subject to change without notice. You must opt in by adding the kit.experimental.remoteFunctions option in your svelte.config.js and optionally, the compilerOptions.experimental.async option to use await in components:

svelte.config

/\*_ @type {import('@sveltejs/kit').Config} _/
const config = {
kit: {
experimental: {
remoteFunctions: true
}
},
compilerOptions: {
experimental: {
async: true
}
}
};

export default config;
Overview
Remote functions are exported from a .remote.js or .remote.ts file, and come in four flavours: query, form, command and prerender. On the client, the exported functions are transformed to fetch wrappers that invoke their counterparts on the server via a generated HTTP endpoint. Remote files can be placed anywhere in your src directory (except inside the src/lib/server directory), and third party libraries can provide them, too.

query
The query function allows you to read dynamic data from the server (for static data, consider using prerender instead):

src/routes/blog/data.remote

import { query } from '$app/server';
import * as db from '$lib/server/database';

export const getPosts = query(async () => {
const posts = await db.sql`
		SELECT title, slug
		FROM post
		ORDER BY published_at
		DESC
	`;

    return posts;

});
Throughout this page, you’ll see imports from fictional modules like $lib/server/database and $lib/server/auth. These are purely for illustrative purposes — you can use whatever database client and auth setup you like.

The db.sql function above is a tagged template function that escapes any interpolated values.

The query returned from getPosts works as a Promise that resolves to posts:

src/routes/blog/+page

<script lang="ts">
	import { getPosts } from './data.remote';
</script>

<h1>Recent posts</h1>

<ul>
	{#each await getPosts() as { title, slug }}
		<li><a href="/blog/{slug}">{title}</a></li>
	{/each}
</ul>
Until the promise resolves — and if it errors — the nearest <svelte:boundary> will be invoked.

While using await is recommended, as an alternative the query also has loading, error and current properties:

src/routes/blog/+page

<script lang="ts">
	import { getPosts } from './data.remote';

	const query = getPosts();
</script>

<h1>Recent posts</h1>

{#if query.error}

<p>oops!</p>
{:else if query.loading}
<p>loading...</p>
{:else}
<ul>
{#each query.current as { title, slug }}
<li><a href="/blog/{slug}">{title}</a></li>
{/each}
</ul>
{/if}
For the rest of this document, we’ll use the await form.

Query arguments
Query functions can accept an argument, such as the slug of an individual post:

src/routes/blog/[slug]/+page

<script lang="ts">
	import { getPost } from '../data.remote';

	let { params } = $props();

	const post = $derived(await getPost(params.slug));
</script>

<h1>{post.title}</h1>
<div>{@html post.content}</div>
Since getPost exposes an HTTP endpoint, it’s important to validate this argument to be sure that it’s the correct type. For this, we can use any Standard Schema validation library such as Zod or Valibot:

src/routes/blog/data.remote

import _ as v from 'valibot';
import { error } from '@sveltejs/kit';
import { query } from '$app/server';
import _ as db from '$lib/server/database';

export const getPosts = query(async () => { /_ ... _/ });

export const getPost = query(v.string(), async (slug) => {
const [post] = await db.sql`
		SELECT * FROM post
		WHERE slug = ${slug}
	`;

    if (!post) error(404, 'Not found');
    return post;

});
Both the argument and the return value are serialized with devalue, which handles types like Date and Map (and custom types defined in your transport hook) in addition to JSON.

Refreshing queries
Any query can be re-fetched via its refresh method, which retrieves the latest value from the server:

<button onclick={() => getPosts().refresh()}>
Check for new posts
</button>
Queries are cached while they’re on the page, meaning getPosts() === getPosts(). This means you don’t need a reference like const posts = getPosts() in order to update the query.

query.batch
query.batch works like query except that it batches requests that happen within the same macrotask. This solves the so-called n+1 problem: rather than each query resulting in a separate database call (for example), simultaneous queries are grouped together.

On the server, the callback receives an array of the arguments the function was called with. It must return a function of the form (input: Input, index: number) => Output. SvelteKit will then call this with each of the input arguments to resolve the individual calls with their results.

weather.remote

import _ as v from 'valibot';
import { query } from '$app/server';
import _ as db from '$lib/server/database';

export const getWeather = query.batch(v.string(), async (cities) => {
const weather = await db.sql`
		SELECT * FROM weather
		WHERE city = ANY(${cities})
	`;
const lookup = new Map(weather.map(w => [w.city, w]));

    return (city) => lookup.get(city);

});
Weather

<script lang="ts">
	import CityWeather from './CityWeather.svelte';
	import { getWeather } from './weather.remote.js';

	let { cities } = $props();
	let limit = $state(5);
</script>

<h2>Weather</h2>

{#each cities.slice(0, limit) as city}

<h3>{city.name}</h3>
<CityWeather weather={await getWeather(city.id)} />
{/each}

{#if cities.length > limit}
<button onclick={() => limit += 5}>
Load more
</button>
{/if}
form
The form function makes it easy to write data to the server. It takes a callback that receives data constructed from the submitted FormData...

src/routes/blog/data.remote

import _ as v from 'valibot';
import { error, redirect } from '@sveltejs/kit';
import { query, form } from '$app/server';
import _ as db from '$lib/server/database';
import * as auth from '$lib/server/auth';

export const getPosts = query(async () => { /_ ... _/ });

export const getPost = query(v.string(), async (slug) => { /_ ... _/ });

export const createPost = form(
v.object({
title: v.pipe(v.string(), v.nonEmpty()),
content:v.pipe(v.string(), v.nonEmpty())
}),
async ({ title, content }) => {
// Check the user is logged in
const user = await auth.getUser();
if (!user) error(401, 'Unauthorized');

    	const slug = title.toLowerCase().replace(/ /g, '-');

    	// Insert into the database
    	await db.sql`
    		INSERT INTO post (slug, title, content)
    		VALUES (${slug}, ${title}, ${content})
    	`;

    	// Redirect to the newly created page
    	redirect(303, `/blog/${slug}`);
    }

);
...and returns an object that can be spread onto a <form> element. The callback is called whenever the form is submitted.

src/routes/blog/new/+page

<script lang="ts">
	import { createPost } from '../data.remote';
</script>

<h1>Create a new post</h1>

<form {...createPost}>
	<!-- form content goes here -->

    <button>Publish!</button>

</form>
The form object contains method and action properties that allow it to work without JavaScript (i.e. it submits data and reloads the page). It also has an attachment that progressively enhances the form when JavaScript is available, submitting data without reloading the entire page.

As with query, if the callback uses the submitted data, it should be validated by passing a Standard Schema as the first argument to form.

Fields
A form is composed of a set of fields, which are defined by the schema. In the case of createPost, we have two fields, title and content, which are both strings. To get the attributes for a field, call its .as(...) method, specifying which input type to use:

<form {...createPost}>
	<label>
		<h2>Title</h2>
		<input {...createPost.fields.title.as('text')} />
	</label>

    <label>
    	<h2>Write your post</h2>
    	<textarea {...createPost.fields.content.as('text')}></textarea>
    </label>

    <button>Publish!</button>

</form>
These attributes allow SvelteKit to set the correct input type, set a name that is used to construct the data passed to the handler, populate the value of the form (for example following a failed submission, to save the user having to re-enter everything), and set the aria-invalid state.

The generated name attribute uses JS object notation (e.g. nested.array[0].value). String keys that require quotes such as object['nested-array'][0].value are not supported. Under the hood, boolean checkbox and number field names are prefixed with b: and n:, respectively, to signal SvelteKit to coerce the values from strings prior to validation.

Fields can be nested in objects and arrays, and their values can be strings, numbers, booleans or File objects. For example, if your schema looked like this...

data.remote

const datingProfile = v.object({
name: v.string(),
photo: v.file(),
info: v.object({
height: v.number(),
likesDogs: v.optional(v.boolean(), false)
}),
attributes: v.array(v.string())
});

export const createProfile = form(datingProfile, (data) => { /_ ... _/ });
...your form could look like this:

<script>
	import { createProfile } from './data.remote';

	const { name, photo, info, attributes } = createProfile.fields;
</script>

<form {...createProfile} enctype="multipart/form-data">
	<label>
		<input {...name.as('text')} /> Name
	</label>

    <label>
    	<input {...photo.as('file')} /> Photo
    </label>

    <label>
    	<input {...info.height.as('number')} /> Height (cm)
    </label>

    <label>
    	<input {...info.likesDogs.as('checkbox')} /> I like dogs
    </label>

    <h2>My best attributes</h2>
    <input {...attributes[0].as('text')} />
    <input {...attributes[1].as('text')} />
    <input {...attributes[2].as('text')} />

    <button>submit</button>

</form>
Because our form contains a file input, we’ve added an enctype="multipart/form-data" attribute. The values for info.height and info.likesDogs are coerced to a number and a boolean respectively.

If a checkbox input is unchecked, the value is not included in the FormData object that SvelteKit constructs the data from. As such, we have to make the value optional in our schema. In Valibot that means using v.optional(v.boolean(), false) instead of just v.boolean(), whereas in Zod it would mean using z.coerce.boolean<boolean>().

In the case of radio and checkbox inputs that all belong to the same field, the value must be specified as a second argument to .as(...):

data.remote

export const survey = form(
v.object({
operatingSystem: v.picklist(['windows', 'mac', 'linux']),
languages: v.optional(v.array(v.picklist(['html', 'css', 'js'])), [])
}),
(data) => { /_ ... _/ }
);

<form {...survey}>
	<h2>Which operating system do you use?</h2>

    {#each ['windows', 'mac', 'linux'] as os}
    	<label>
    		<input {...survey.fields.operatingSystem.as('radio', os)}>
    		{os}
    	</label>
    {/each}

    <h2>Which languages do you write code in?</h2>

    {#each ['html', 'css', 'js'] as language}
    	<label>
    		<input {...survey.fields.languages.as('checkbox', language)}>
    		{language}
    	</label>
    {/each}

    <button>submit</button>

</form>
Alternatively, you could use select and select multiple:

<form {...survey}>
	<h2>Which operating system do you use?</h2>

    <select {...survey.fields.operatingSystem.as('select')}>
    	<option>windows</option>
    	<option>mac</option>
    	<option>linux</option>
    </select>

    <h2>Which languages do you write code in?</h2>

    <select {...survey.fields.languages.as('select multiple')}>
    	<option>html</option>
    	<option>css</option>
    	<option>js</option>
    </select>

    <button>submit</button>

</form>
As with unchecked checkbox inputs, if no selections are made then the data will be undefined. For this reason, the languages field uses v.optional(v.array(...), []) rather than just v.array(...).

Programmatic validation
In addition to declarative schema validation, you can programmatically mark fields as invalid inside the form handler using the invalid function. This is useful for cases where you can’t know if something is valid until you try to perform some action. Just like redirect or error, invalid throws. It expects a list of strings (for issues relating to the form as a whole) or standard-schema-compliant issues (for those relating to a specific field). Use the issue parameter for type-safe creation of such issues:

src/routes/shop/data.remote

import _ as v from 'valibot';
import { invalid } from '@sveltejs/kit';
import { form } from '$app/server';
import _ as db from '$lib/server/database';

export const buyHotcakes = form(
v.object({
qty: v.pipe(
v.number(),
v.minValue(1, 'you must buy at least one hotcake')
)
}),
async (data, issue) => {
try {
await db.buy(data.qty);
} catch (e) {
if (e.code === 'OUT_OF_STOCK') {
invalid(
issue.qty(`we don't have enough hotcakes`)
);
}
}
}
);
The invalid function works as both a function and a proxy:

Call invalid(issue1, issue2, ...issueN) to throw a validation error
If an issue is a string, it applies to the form as a whole (and will show up in fields.allIssues())
Use invalid.fieldName(message) to create an issue for a specific field. Like fields this is type-safe and you can use regular property access syntax to create issues for deeply nested objects (e.g. invalid.profile.email('Email already exists') or invalid.items[0].qty('Insufficient stock'))
Validation
If the submitted data doesn’t pass the schema, the callback will not run. Instead, each invalid field’s issues() method will return an array of { message: string } objects, and the aria-invalid attribute (returned from as(...)) will be set to true:

<form {...createPost}>
	<label>
		<h2>Title</h2>

    	{#each createPost.fields.title.issues() as issue}
    		<p class="issue">{issue.message}</p>
    	{/each}

    	<input {...createPost.fields.title.as('text')} />
    </label>

    <label>
    	<h2>Write your post</h2>

    	{#each createPost.fields.content.issues() as issue}
    		<p class="issue">{issue.message}</p>
    	{/each}

    	<textarea {...createPost.fields.content.as('text')}></textarea>
    </label>

    <button>Publish!</button>

</form>
You don’t need to wait until the form is submitted to validate the data — you can call validate() programmatically, for example in an oninput callback (which will validate the data on every keystroke) or an onchange callback:

<form {...createPost} oninput={() => createPost.validate()}>
	<!-- -->
</form>
By default, issues will be ignored if they belong to form controls that haven’t yet been interacted with. To validate all inputs, call validate({ includeUntouched: true }).

For client-side validation, you can specify a preflight schema which will populate issues() and prevent data being sent to the server if the data doesn’t validate:

<script>
	import * as v from 'valibot';
	import { createPost } from '../data.remote';

	const schema = v.object({
		title: v.pipe(v.string(), v.nonEmpty()),
		content: v.pipe(v.string(), v.nonEmpty())
	});
</script>

<h1>Create a new post</h1>

<form {...createPost.preflight(schema)}>
	<!-- -->
</form>
The preflight schema can be the same object as your server-side schema, if appropriate, though it won’t be able to do server-side checks like ‘this value already exists in the database’. Note that you cannot export a schema from a .remote.ts or .remote.js file, so the schema must either be exported from a shared module, or from a <script module> block in the component containing the <form>.

To get a list of all issues, rather than just those belonging to a single field, you can use the fields.allIssues() method:

{#each createPost.fields.allIssues() as issue}

<p>{issue.message}</p>
{/each}
Getting/setting inputs
Each field has a value() method that reflects its current value. As the user interacts with the form, it is automatically updated:

<form {...createPost}>
	<!-- -->
</form>

<div class="preview">
	<h2>{createPost.fields.title.value()}</h2>
	<div>{@html render(createPost.fields.content.value())}</div>
</div>
Alternatively, createPost.fields.value() would return a { title, content } object.

You can update a field (or a collection of fields) via the set(...) method:

<script>
	import { createPost } from '../data.remote';

	// this...
	createPost.fields.set({
		title: 'My new blog post',
		content: 'Lorem ipsum dolor sit amet...'
	});

	// ...is equivalent to this:
	createPost.fields.title.set('My new blog post');
	createPost.fields.content.set('Lorem ipsum dolor sit amet');
</script>

Handling sensitive data
In the case of a non-progressively-enhanced form submission (i.e. where JavaScript is unavailable, for whatever reason) value() is also populated if the submitted data is invalid, so that the user does not need to fill the entire form out from scratch.

You can prevent sensitive data (such as passwords and credit card numbers) from being sent back to the user by using a name with a leading underscore:

<form {...register}>
	<label>
		Username
		<input {...register.fields.username.as('text')} />
	</label>

    <label>
    	Password
    	<input {...register.fields._password.as('password')} />
    </label>

    <button>Sign up!</button>

</form>
In this example, if the data does not validate, only the first <input> will be populated when the page reloads.

Single-flight mutations
By default, all queries used on the page (along with any load functions) are automatically refreshed following a successful form submission. This ensures that everything is up-to-date, but it’s also inefficient: many queries will be unchanged, and it requires a second trip to the server to get the updated data.

Instead, we can specify which queries should be refreshed in response to a particular form submission. This is called a single-flight mutation, and there are two ways to achieve it. The first is to refresh the query on the server, inside the form handler:

export const getPosts = query(async () => { /_ ... _/ });

export const getPost = query(v.string(), async (slug) => { /_ ... _/ });

export const createPost = form(
v.object({/_ ... _/}),
async (data) => {
// form logic goes here...

    	// Refresh `getPosts()` on the server, and send
    	// the data back with the result of `createPost`
    	await getPosts().refresh();

    	// Redirect to the newly created page
    	redirect(303, `/blog/${slug}`);
    }

);

export const updatePost = form(
v.object({/_ ... _/}),
async (data) => {
// form logic goes here...
const result = externalApi.update(post);

    	// The API already gives us the updated post,
    	// no need to refresh it, we can set it directly
    	await getPost(post.id).set(result);
    }

);
The second is to drive the single-flight mutation from the client, which we’ll see in the section on enhance.

Returns and redirects
The example above uses redirect(...), which sends the user to the newly created page. Alternatively, the callback could return data, in which case it would be available as createPost.result:

src/routes/blog/data.remote

export const createPost = form(
v.object({/_ ... _/}),
async (data) => {
// ...

    	return { success: true };
    }

);
src/routes/blog/new/+page

<script lang="ts">
	import { createPost } from '../data.remote';
</script>

<h1>Create a new post</h1>

<form {...createPost}>
	<!-- -->
</form>

{#if createPost.result?.success}

<p>Successfully published!</p>
{/if}
This value is ephemeral — it will vanish if you resubmit, navigate away, or reload the page.

The result value need not indicate success — it can also contain validation errors, along with any data that should repopulate the form on page reload.

If an error occurs during submission, the nearest +error.svelte page will be rendered.

enhance
We can customize what happens when the form is submitted with the enhance method:

src/routes/blog/new/+page

<script lang="ts">
	import { createPost } from '../data.remote';
	import { showToast } from '$lib/toast';
</script>

<h1>Create a new post</h1>

<form {...createPost.enhance(async ({ form, data, submit }) => {
	try {
		await submit();
		form.reset();

    	showToast('Successfully published!');
    } catch (error) {
    	showToast('Oh no! Something went wrong');
    }

})}>

<!-- -->

</form>
When using enhance, the <form> is not automatically reset — you must call form.reset() if you want to clear the inputs.

The callback receives the form element, the data it contains, and a submit function.

To enable client-driven single-flight mutations, use submit().updates(...). For example, if the getPosts() query was used on this page, we could refresh it like so:

await submit().updates(getPosts());
We can also override the current data while the submission is ongoing:

await submit().updates(
getPosts().withOverride((posts) => [newPost, ...posts])
);
The override will be applied immediately, and released when the submission completes (or fails).

Multiple instances of a form
Some forms may be repeated as part of a list. In this case you can create separate instances of a form function via for(id) to achieve isolation.

src/routes/todos/+page

<script lang="ts">
	import { getTodos, modifyTodo } from '../data.remote';
</script>

<h1>Todos</h1>

{#each await getTodos() as todo}
{@const modify = modifyTodo.for(todo.id)}

<form {...modify}>
<!-- -->
<button disabled={!!modify.pending}>save changes</button>
</form>
{/each}
buttonProps
By default, submitting a form will send a request to the URL indicated by the <form> element’s action attribute, which in the case of a remote function is a property on the form object generated by SvelteKit.

It’s possible for a <button> inside the <form> to send the request to a different URL, using the formaction attribute. For example, you might have a single form that allows you to log in or register depending on which button was clicked.

This attribute exists on the buttonProps property of a form object:

src/routes/login/+page

<script lang="ts">
	import { login, register } from '$lib/auth';
</script>

<form {...login}>
	<label>
		Your username
		<input {...login.fields.username.as('text')} />
	</label>

    <label>
    	Your password
    	<input {...login.fields._password.as('password')} />
    </label>

    <button>login</button>
    <button {...register.buttonProps}>register</button>

</form>
Like the form object itself, buttonProps has an enhance method for customizing submission behaviour.

command
The command function, like form, allows you to write data to the server. Unlike form, it’s not specific to an element and can be called from anywhere.

Prefer form where possible, since it gracefully degrades if JavaScript is disabled or fails to load.

As with query and form, if the function accepts an argument, it should be validated by passing a Standard Schema as the first argument to command.

likes.remote

import _ as v from 'valibot';
import { query, command } from '$app/server';
import _ as db from '$lib/server/database';

export const getLikes = query(v.string(), async (id) => {
const [row] = await db.sql`
		SELECT likes
		FROM item
		WHERE id = ${id}
	`;

    return row.likes;

});

export const addLike = command(v.string(), async (id) => {
await db.sql`
		UPDATE item
		SET likes = likes + 1
		WHERE id = ${id}
	`;
});
Now simply call addLike, from (for example) an event handler:

+page

<script lang="ts">
	import { getLikes, addLike } from './likes.remote';
	import { showToast } from '$lib/toast';

	let { item } = $props();
</script>

<button
onclick={async () => {
try {
await addLike(item.id);
} catch (error) {
showToast('Something went wrong!');
}
}}

>

    add like

</button>

<p>likes: {await getLikes(item.id)}</p>
Commands cannot be called during render.

Updating queries
To update getLikes(item.id), or any other query, we need to tell SvelteKit which queries need to be refreshed (unlike form, which by default invalidates everything, to approximate the behaviour of a native form submission).

We either do that inside the command itself...

likes.remote

export const getLikes = query(v.string(), async (id) => { /_ ... _/ });

export const addLike = command(v.string(), async (id) => {
await db.sql`
		UPDATE item
		SET likes = likes + 1
		WHERE id = ${id}
	`;

    getLikes(id).refresh();
    // Just like within form functions you can also do
    // getLikes(id).set(...)
    // in case you have the result already

});
...or when we call it:

try {
await addLike(item.id).updates(getLikes(item.id));
} catch (error) {
showToast('Something went wrong!');
}
As before, we can use withOverride for optimistic updates:

try {
await addLike(item.id).updates(
getLikes(item.id).withOverride((n) => n + 1)
);
} catch (error) {
showToast('Something went wrong!');
}
prerender
The prerender function is similar to query, except that it will be invoked at build time to prerender the result. Use this for data that changes at most once per redeployment.

src/routes/blog/data.remote

import { prerender } from '$app/server';
import * as db from '$lib/server/database';

export const getPosts = prerender(async () => {
const posts = await db.sql`
		SELECT title, slug
		FROM post
		ORDER BY published_at
		DESC
	`;

    return posts;

});
You can use prerender functions on pages that are otherwise dynamic, allowing for partial prerendering of your data. This results in very fast navigation, since prerendered data can live on a CDN along with your other static assets.

In the browser, prerendered data is saved using the Cache API. This cache survives page reloads, and will be cleared when the user first visits a new deployment of your app.

When the entire page has export const prerender = true, you cannot use queries, as they are dynamic.

Prerender arguments
As with queries, prerender functions can accept an argument, which should be validated with a Standard Schema:

src/routes/blog/data.remote

import _ as v from 'valibot';
import { error } from '@sveltejs/kit';
import { prerender } from '$app/server';
import _ as db from '$lib/server/database';

export const getPosts = prerender(async () => { /_ ... _/ });

export const getPost = prerender(v.string(), async (slug) => {
const [post] = await db.sql`
		SELECT * FROM post
		WHERE slug = ${slug}
	`;

    if (!post) error(404, 'Not found');
    return post;

});
Any calls to getPost(...) found by SvelteKit’s crawler while prerendering pages will be saved automatically, but you can also specify which values it should be called with using the inputs option:

src/routes/blog/data.remote

export const getPost = prerender(
v.string(),
async (slug) => { /_ ... _/ },
{
inputs: () => [
'first-post',
'second-post',
'third-post'
]
}
);
Svelte does not yet support asynchronous server-side rendering, so it’s likely that you’re only calling remote functions from the browser, rather than during prerendering. Because of this, you will need to use inputs, for now. We’re actively working on this roadblock.

By default, prerender functions are excluded from your server bundle, which means that you cannot call them with any arguments that were not prerendered. You can set dynamic: true to change this behaviour:

src/routes/blog/data.remote

export const getPost = prerender(
v.string(),
async (slug) => { /_ ... _/ },
{
dynamic: true,
inputs: () => [
'first-post',
'second-post',
'third-post'
]
}
);
Handling validation errors
As long as you’re not passing invalid data to your remote functions, there are only two reasons why the argument passed to a command, query or prerender function would fail validation:

the function signature changed between deployments, and some users are currently on an older version of your app
someone is trying to attack your site by poking your exposed endpoints with bad data
In the second case, we don’t want to give the attacker any help, so SvelteKit will generate a generic 400 Bad Request response. You can control the message by implementing the handleValidationError server hook, which, like handleError, must return an App.Error (which defaults to { message: string }):

src/hooks.server

import type { HandleValidationError } from '@sveltejs/kit';

export const handleValidationError: HandleValidationError = ({ event, issues }) => {
return {
message: 'Nice try, hacker!'
};
};
If you know what you’re doing and want to opt out of validation, you can pass the string 'unchecked' in place of a schema:

data.remote

import { query } from '$app/server';

export const getStuff = query('unchecked', async ({ id }: { id: string }) => {
// the shape might not actually be what TypeScript thinks
// since bad actors might call this function with other arguments
});
Using getRequestEvent
Inside query, form and command you can use getRequestEvent to get the current RequestEvent object. This makes it easy to build abstractions for interacting with cookies, for example:

user.remote

import { getRequestEvent, query } from '$app/server';
import { findUser } from '$lib/server/database';

export const getProfile = query(async () => {
const user = await getUser();

    return {
    	name: user.name,
    	avatar: user.avatar
    };

});

// this query could be called from multiple places, but
// the function will only run once per request
const getUser = query(async () => {
const { cookies } = getRequestEvent();

    return await findUser(cookies.get('session_id'));

});
Note that some properties of RequestEvent are different inside remote functions:

you cannot set headers (other than writing cookies, and then only inside form and command functions)
route, params and url relate to the page the remote function was called from, not the URL of the endpoint SvelteKit creates for the remote function. Queries are not re-run when the user navigates (unless the argument to the query changes as a result of navigation), and so you should be mindful of how you use these values. In particular, never use them to determine whether or not a user is authorized to access certain data.
Redirects
Inside query, form and prerender functions it is possible to use the redirect(...) function. It is not possible inside command functions, as you should avoid redirecting here. (If you absolutely have to, you can return a { redirect: location } object and deal with it in the client.) ETC AND MORE

Core features
Compiler-based approach: Svelte is a compiler that transforms your components into small, efficient, imperative code at build time, eliminating the need for a framework runtime in the browser.
Reactivity: It uses a unique reactive system that tracks variables and updates only the parts of the DOM that depend on them.
Single-file components: You can write your component's markup, styles, and logic in a single file, with CSS automatically scoped to prevent conflicts.
Readable syntax: The syntax is often described as HTML with JavaScript sprinkled in, making it familiar and easy to learn.
Smaller bundle sizes: Because it compiles to vanilla JavaScript, Svelte applications are smaller and faster, which is ideal for low-power devices and slow networks.
SvelteKit features
File-based routing: SvelteKit provides a file-based system for defining routes and layouts, simplifying app structure.
Server-Side Rendering (SSR): It supports SSR out-of-the-box for better performance and SEO.
Static Site Generation (SSG): You can pre-render pages at build time for static site benefits.
API routes: It allows you to define serverless functions and API endpoints directly within your SvelteKit project.
Performance optimizations: SvelteKit includes features like code-splitting, prefetching, and request coalescing to improve performance.
Recent and notable features
Snippets: Svelte 5 introduces snippets, which are reusable blocks of markup and logic that can be rendered multiple times or passed to other components.
Native TypeScript support: Builds are faster, and you can use TypeScript annotations directly in your Svelte markup.
Derived statements are now writable: In Svelte 5, derived statements have been made writable, adding more flexibility.
Form handling: Features like default defaultValue and defaultChecked for inputs are now supported.
Reactive browser API: Svelte now provides a reactive browser API, making it easier to interact with browser features.
