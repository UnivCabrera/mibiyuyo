Full Stack Monitoring
Your code is telling you more than what your logs let on. Sentry’s full stack monitoring gives you full visibility into your code, so you can catch issues before they become downtime.

Sentry character illustration
Learn about Tracing
With Sentry’s performance monitoring, you can trace performance issues to poor-performing api calls and slow database queries.

Distributed Tracing 101 for Full Stack Developers
Learn the ins-and-outs of distributed tracing and how it can assist you in monitoring the increasingly complex requirements of full stack applications.

Tracing for the Frontend (to the Backend)
Join Dustin Bailey (Solutions Engineer) as he shows how developers can trace those pesky performance issues to poor-performing API calls & slow database queries across all your services.

Find the Root Cause Faster with Trace View and Trace Navigator
Trace View and Trace Navigator give you a throughline between transactions across all your projects.

Learn about Suspect Spans
Find the slowest operation or “work” taking place on your service. All without having to click into each trace.

Getting Started is Simple

JavaScript

Node

Python

PHP

Ruby

Go
Grab the Sentry JavaScript SDK:

Click to Copy

<script src="https://browser.sentry-cdn.com/<VERSION>/bundle.min.js"></script>

Configure your DSN:

Click to Copy
Sentry.init({ dsn: 'https://<key>@sentry.io/<project>' });
Check our documentation for the latest instructions.

More than 150K organizations trust Sentry with their application monitoring.

Trace. Triage. Triumph.
Errors don’t exist in a vacuum. With full-stack monitoring, you can trace frontend errors caused by backend code (and vice versa). Being able to correlate your apm logs with distributed tracing means that you can understand how your stack reacts to your latest deploy or integrating a third-party service.

See the sprawl
Humans are visual creatures. Software errors, not so much. Instead of your eyes slogging over logs, Sentry’s full stack monitoring shows you a complete picture of what’s frustrating your users. Now you can connect those user facing problems on the frontend to impacted services on the backend and fix what matters first.

Understand what your code is thinking. Really.
Connecting issues to their root cause doesn’t have to be a guessing game. With full-stack monitoring, you get added context about the application state so you’re able to quickly understand the impact of specific problems. What’s more, all unhandled exceptions are automatically captured, with individual errors rolling up into larger issues.

”Sometimes errors on the front-end have roots on the backend. We use Sentry’s tags and metadata about a request that comes in to pass along a version of distributed tracing to link these back.”

Tony Stuck
Engineering Manager at CloudFlare
FAQs

What is the difference between Sentry and traditional logging?

Traditional logging provides you with a trail of events. Some of those events are errors, but many times they’re simply informational. Sentry is fundamentally different because we focus on exceptions, or in other words, we capture application crashes. We discuss in more detail here and on our blog.

What languages does Sentry support?

Sentry supports every major language, framework, and library. You can browse each of them here.

How much does Sentry cost?

You can get started for free. Pricing depends on the number of monthly events, transactions, and attachments that you send Sentry. For more details, visit our pricing page.

How does Sentry impact the performance of my app?

Sentry doesn’t impact a web site’s performance.

If you look at the configuration options for when you initialize Sentry in your code, you’ll see there’s nothing regarding minimizing its impact on your app’s performance. This is because our team of SDK engineers already developed Sentry with this in mind.

Sentry is a listener/handler for errors that asynchronously sends out the error/event to Sentry.io. This is non-blocking. The error/event only goes out if this is an error.

Global handlers have almost no impact as well, as they are native APIs provided by the browsers.
