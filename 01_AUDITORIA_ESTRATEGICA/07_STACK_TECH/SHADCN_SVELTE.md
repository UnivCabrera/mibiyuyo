Introduction

Next
Re-usable components built with Bits UI and Tailwind CSS.

An unofficial, community-led Svelte port of shadcn/ui. We are not affiliated with shadcn, but we did get his blessing before creating a Svelte version of his work. This project was born out of the need for a similar project for the Svelte ecosystem.

This is not a component library. It is how you build your component library.

You know how most traditional component libraries work: you install a package from NPM, import the components, and use them in your app.

This approach works well until you need to customize a component to fit your design system or require one that isn’t included in the library. Often, you end up wrapping library components, writing workarounds to override styles, or mixing components from different libraries with incompatible APIs.

This is what shadcn-svelte aims to solve. It is built around the following principles:

Open Code: The top layer of your component code is open for modification.
Composition: Every component uses a common, composable interface, making them predictable.
Distribution: A flat-file schema and command-line tool make it easy to distribute components.
Beautiful Defaults: Carefully chosen default styles, so you get great design out-of-the-box.
AI-Ready: Open code for LLMs to read, understand, and improve.
Open Code
shadcn-svelte hands you the actual component code. You have full control to customize and extend the components to your needs. This means:

Full Transparency: You see exactly how each component is built.
Easy Customization: Modify any part of a component to fit your design and functionality requirements.
AI Integration: Access to the code makes it straightforward for LLMs to read, understand, and even improve your components.
In a typical library, if you need to change a button’s behavior, you have to override styles or wrap the component. With shadcn-svelte, you simply edit the button code directly.

How do I pull upstream updates in an Open Code approach?
Composition
Every component in shadcn-svelte shares a common, composable interface. If a component does not exist, we bring it in, make it composable, and adjust its style to match and work with the rest of the design system.

A shared, composable interface means it's predictable for both your team and LLMs. You are not learning different APIs for every new component. Even for third-party ones.

Distribution
shadcn-svelte is also a code distribution system. It defines a schema for components and a CLI to distribute them.

Schema: A flat-file structure that defines the components, their dependencies, and properties.
CLI: A command-line tool to distribute and install components across projects with cross-framework support.
You can use the schema to distribute your components to other projects or have AI generate completely new components based on existing schema.

Beautiful Defaults
shadcn-svelte comes with a large collection of components that have carefully chosen default styles. They are designed to look good on their own and to work well together as a consistent system:

Good Out-of-the-Box: Your UI has a clean and minimal look without extra work.
Unified Design: Components naturally fit with one another. Each component is built to match the others, keeping your UI consistent.
Easily Customizable: If you want to change something, it's simple to override and extend the defaults.
AI-Ready
The design of shadcn-svelte makes it easy for AI tools to work with your code. Its open code and consistent API allow AI models to read, understand, and even generate new components.

An AI model can learn how your components work and suggest improvements or even create new components that integrate with your existing design.
SvelteKit

Previous
Next
How to setup shadcn-svelte in a SvelteKit project.

Create project
Use the SvelteKit CLI to create a new project.

pnpm
npm
bun
yarn
bun x sv create my-app
Copy
Add TailwindCSS
Use the Svelte CLI to add Tailwind CSS to your project.

pnpm
npm
bun
yarn
bun x sv add tailwindcss
Copy
Setup path aliases
If you are not using the default alias $lib, you'll need to update your svelte.config.js file to include those aliases.

svelte.config.js
const config = {
// ... other config
kit: {
// ... other config
alias: {
"@/_": "./path/to/lib/_",
},
},
};
Copy
Run the CLI
pnpm
npm
bun
yarn
bun x shadcn-svelte@latest init
Copy
Configure components.json
You will be asked a few questions to configure components.json:

Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
Copy
That's it
You can now start adding components to your project.

pnpm
npm
bun
yarn
bun x shadcn-svelte@latest add button
Copy
The command above will add the Button component to your project. You can then import it like this:

<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Click me</Button>
JavaScript

Previous
Next
How to use shadcn-svelte with JavaScript.

This project and the components are written in TypeScript. We recommend using TypeScript for your project as well.

However, we provide a JavaScript version of the components as well. The JavaScript version is only available via the CLI.

To opt-out of TypeScript, you can use the typescript flag in your components.json file.

components.json
{
"style": "default",
"tailwind": {
"css": "src/routes/layout.css"
},
"typescript": false,
"aliases": {
"utils": "$lib/utils",
    "components": "$lib/components",
"hooks": "$lib/hooks",
    "ui": "$lib/components/ui"
},
"registry": "https://shadcn-svelte.com/registry"
}
Copy
To configure import aliases, create a jsconfig.json file:

jsconfig.json
{
"compilerOptions": {
"paths": {
"$lib/_": ["./src/lib/_"]
}
}
}
Copy
CLI
Figma
Built by shadcn . Ported to Svelte by Huntabyte & CokaKoala.
SvelteKit

Previous
Next
How to setup shadcn-svelte in a SvelteKit project.

Create project
Use the SvelteKit CLI to create a new project.

pnpm
npm
bun
yarn
bun x sv create my-app
Copy
Add TailwindCSS
Use the Svelte CLI to add Tailwind CSS to your project.

pnpm
npm
bun
yarn
bun x sv add tailwindcss
Copy
Setup path aliases
If you are not using the default alias $lib, you'll need to update your svelte.config.js file to include those aliases.

svelte.config.js
const config = {
// ... other config
kit: {
// ... other config
alias: {
"@/_": "./path/to/lib/_",
},
},
};
Copy
Run the CLI
pnpm
npm
bun
yarn
bun x shadcn-svelte@latest init
Copy
Configure components.json
You will be asked a few questions to configure components.json:

Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
Copy
That's it
You can now start adding components to your project.

pnpm
npm
bun
yarn
bun x shadcn-svelte@latest add button
Copy
The command above will add the Button component to your project. You can then import it like this:

<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Click me</Button>
Components

Previous
Next
Here you can find all the components available in the library. We are working on adding more components.

Accordion
Alert Dialog
Alert
Aspect Ratio
Avatar
Badge
Breadcrumb
Button Group
Button
Calendar
Card
Carousel
Chart
Checkbox
Collapsible
Combobox
Command
Context Menu
Data Table
Date Picker
Dialog
Drawer
Dropdown Menu
Empty
Field
Formsnap
Hover Card
Input Group
Input OTP
Input
Item
Kbd
Label
Menubar
Native Select
Navigation Menu
Pagination
Popover
Progress
Radio Group
Range Calendar
Resizable
Scroll Area
Select
Separator
Sheet
Sidebar
Skeleton
Slider
Sonner
Spinner
Switch
Table
Tabs
Textarea
Toggle Group
Toggle
Tooltip
Typography
