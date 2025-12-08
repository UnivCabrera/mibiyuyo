Docker Compose release notes
Page options
For more detailed information, see the release notes in the Compose repo.

2.40.3
2025-10-30
Bug fixes and enhancements
Lifecycle hooks now apply to the restart command
Improved override support when publishing OCI artifacts
Fixed an issue to ensure an image exists only for targeted services with the run command
Added a default Prompt implementation
2.40.2
2025-10-22
Bug fixes and enhancements
Added a check to fail builds if the minimal required Buildx version isn’t installed
Removed unused code to rely solely on api.Service
Improved image detection by checking digests/canonical references, not just tags
Introduced WithPrompt which adds a pluggable UI for user interactions
Reverted fix for secret/config setup of uid:gid to match container's USER definition
2.40.1
2025-10-17
Bug fixes and enhancements
Fixed a few issues when building with bake
Added support of extends with profiles when using the publish command
Added support of CTRL+Z to run Compose in background
Fixed secret/config setup of uid:gid to match container's USER definition
Update
Dependencies upgrade: bump docker engine and cli to v28.5.1
Dependencies upgrade: bump buildx to v0.29.1
Dependencies upgrade: bump golang to v1.24.9
2.40.0
2025-10-03
Bug fixes and enhancements
Added the option to publish Compose applications as a compose.yaml with images
Fixed support for secrets based on environment variables when building with bake
Fixed support for escaped '$' character when building with bake
Update
Dependencies upgrade: bump docker engine and cli to v28.5.0
2.39.4
2025-09-19
Bug fixes and enhancements
Added initial_sync attribute to the Compose Develop Specification definition, to sync files after starting a watch session
Fixed a TLS issue when building with bake
Disabled Tty on run when running as a piped command
Update
Dependencies upgrade: bump compose-go to v2.9.0
2.39.3
2025-09-09
Bug fixes and enhancements
Added completions for --progress flag
Fixed minor issues when building with bake
Fixed issue when publishing a Compose stack with bind mounts and -y flag
Update
Dependencies upgrade: bump docker engine and cli to v28.4.0
Dependencies upgrade: bump compose-go to v2.8.2
Dependencies upgrade: bump buildx to v0.28.0
Dependencies upgrade: bump buildkit to v0.24.0
Dependencies upgrade: bump golang to v1.24.7
2.39.2
2025-08-04
Bug fixes and enhancements
Fixed multiple rendering issues with the build output
Fixed issue when pull and no_cache attributes were not applied with bake
Removed log display of explicitly un-attached services on up command
Update
Dependencies upgrade: bump docker engine and cli to v28.3.3
Dependencies upgrade: bump golang to v1.23.12
Dependencies upgrade: bump containerd to 2.1.4
2.39.1
2025-07-24
Bug fixes and enhancements
Added metrics to monitor models usage
Update
Dependencies upgrade: bump compose-go to v2.8.1
2.39.0
2025-07-24
Bug fixes and enhancements
Added --models flag to config command to list models
Added --since and --until flags to events
Introduced provenance and sbom attributes to build section
Fixed bridge convert issue on Windows
Fixed multiple issues with bake builds
Update
Dependencies upgrade: bump docker engine and cli to v28.3.2
Dependencies upgrade: bump buildx to v0.26.1
Dependencies upgrade: bump compose-go to v2.8.0
2.38.2
2025-07-08
Bug fixes and enhancements
Added --networks flag to config command to list networks
Fixed an issue on down command with Docker Model Runner used as a provider service
Fixed a display issue on Docker Model Runner progress
Fixed an issue with services with profile missing secrets
Update
Dependencies upgrade: bump docker engine and cli to v28.3.1
Dependencies upgrade: bump buildkit to v0.23.2
Dependencies upgrade: bump golang to v1.23.10
2.38.1
2025-06-30
Bug fixes and enhancements
Added support of model_variable for service models configuration
Update
Dependencies upgrade: bump compose-go to v2.7.1
2.38.0
2025-06-30
Bug fixes and enhancements
Introduced support of models for LLM configuration
Added volumes command
Removed publish limitation on bind mounts
Fixed an issue mounting the docker socket to container which doesn't need it
Fixed an issue with bake hanging on output
Update
Dependencies upgrade: bump compose-go to v2.7.0
Dependencies upgrade: bump docker engine and cli to v28.3.0
2.37.3
2025-06-24
Bug fixes and enhancements
Added support of cache_to for Bake
Fixed issue with Bake integration
Fixed multiple issues affecting run command
Update
Dependencies upgrade: bump buildkit to v0.23.1
2.37.2
2025-06-20
Bug fixes and enhancements
Introduce use_api_socket
Fixed compose images JSON output format
Fixed panic using w shortcut on project without watch support
Fixed a permission issue with bake metadata files on Windows
Fixed a panic error on provider service startup
Update
Dependencies upgrade: bump compose-go to v2.6.5
Dependencies upgrade: bump buildx to v0.25.0
Dependencies upgrade: bump buildkit to v0.23.0
2.37.1
2025-06-12
Bug fixes and enhancements
Fixed a permission issue with bake metadata files on Windows
Fixed a panic error on provider service startup
Reverted compose images JSON output to array format
2.37.0
2025-06-05
Bug fixes and enhancements
Fixed an issue with random port allocation
Fixed an issue recreating containers when not needed during inner loop
Fixed a problem during up --build with additional_context
Update
Dependencies upgrade: bump compose-go to v2.6.4
Dependencies upgrade: bump buildx to v0.24.0
Dependencies upgrade: bump buildkit to v0.22.0
2.36.2
2025-05-23
Bug fixes and enhancements
Compose Bridge features are now part of Compose
Improved display of the docker compose images command
Promoted bake as the default build tool for Compose
Fixed issues around build flow
Fixed the restart of dependent services after watch rebuild images
Update
Dependencies upgrade: bump docker engine and cli to v28.2.2
2.36.1
2025-05-19
Bug fixes and enhancements
Introduced support of arrays for provider service options attribute
Added debug messages in the extension protocol
Fixed an issue when trying to publish a Compose application with a provider service
Fixed build issues on Compose applications with service.provider
Introduced --lock-image-digests to config command
Update
Dependencies upgrade: bump compose-go to v2.6.3
Dependencies upgrade: bump containerd to 2.1.0
2.36.0
2025-05-07
Bug fixes and enhancements
Introduced networks.interface_name
Added support for COMPOSE_PROGRESS env variable
Added service.provider to external binaries
Introduced build --check flag
Fixed multiple panic issues when parsing Compose files
Update
Dependencies upgrade: bump compose-go to v2.6.2
Dependencies upgrade: bump docker engine and cli to v28.1.0
Dependencies upgrade: bump containerd to 2.0.5
Dependencies upgrade: bump buildkit to v0.21.1
2.35.1
2025-04-17
Bug fixes and enhancements
Fixed an issue with bind mounts
Update
Dependencies upgrade: bump compose-go to v2.6.0
Dependencies upgrade: bump docker engine and cli to v28.0.4
Dependencies upgrade: bump buildx to v0.22.0
2.35.0
2025-04-10
Bug fixes and enhancements
Added support for Docker Model Runner to easily integrate AI models into your Compose applications
Added build --print command to help debug complex build configurations by showing the equivalent bake file
Added volume.type=image to provide more flexible volume management for container images
Added --quiet options to the run command for cleaner output when running containers
Added config --no-env-resolution option to view raw configuration without environment variable substitution
Fixed behavior of depends_on to prevent unnecessary container recreation when dependencies change
Fixed support for secrets defined by environment variables when using include
Fixed volume mount handling to ensure bind mounts work correctly in all scenarios
Update
Dependencies upgrade: bump docker engine and cli to v28.1.0
Dependencies upgrade: bump buildx to v0.23.0
Dependencies upgrade: bump buildkit to v0.21.0
2.34.0
2025-03-14
Bug fixes and enhancements
Added support of refresh pull_policy values daily, weekly and every_<duration>
Introduced include attribut to watch definition to match file patterns
Introduced --env-from-file in flag for the docker compose run command
Promoted publish as a regular command of Compose
Fixed a bug by loading env_file after services have been selected
Update
Dependencies upgrade: bump docker engine and cli to v28.0.1
Dependencies upgrade: bump buildkit to v0.17.1
Dependencies upgrade: Bump compose-go v2.4.9
Dependencies upgrade: Bump buildx v0.21.2
2.33.1
2025-02-21
Bug fixes and enhancements
Added support for gw_priority, enable_ipv4 (requires Docker v28.0)
Fixed an issue with the navigation menu
Improved error message when using non-file secret/config with read-only service
Update
Dependencies upgrade: bump docker engine and cli to v28.0.0
2.33.0
2025-02-13
Bug fixes and enhancements
Introduced a hint to promote the use of Bake
Introduced support for the additional_context attribute referencing another service
Added support for BUILDKIT_PROGRESS
Compose now warns you when a published Compose application includes environment variables
Added a --with-env flag to publish a Compose application with environment variables
Updated ls --quiet help description
Fixed multiple issues delegating build to Bake
Updated help in stats command
Fixed support for "builtin" seccomp profile
Fixed support for watch with multiple services
Removed exit code per error type used by legacy metrics system
Fixed test coverage for compatibility
Removed raw os.Args sent to OpenTelemetry
Enabled copyloopvar linter
Fixed provenance for binaries and generate SBOM
Main branch for docs upstream validation is now used
Added codeowners file
Added Docker Engine v28.x to the test-matrix
Get Docker
Learn how to install Docker for Mac, Windows, or Linux and explore our developer tools.

Get Docker
Low-fi desktop app
Get started
Learn Docker basics and the benefits of containerization.
Guides
Learn how Docker can optimize your development workflows.
Manuals
Learn how to install, set up, configure, and use Docker products.
Reference
Browse the CLI and API documentation.
Docker Hardened Images New
Secure, minimal, production-ready images with near-zero known CVEs.

Start your free trial
Explore images
Low-fi desktop app
Docker State of Application Development survey

Share your feedback and help us better understand and serve the application development community. It will take just 20 minutes of your time. We want to know where you are focused, what you are working on, and what is most important to you.

You can save your progress and return at any time. As a thank-you, you can opt into a raffle for Docker swag and other prizes.

Take the survey
Browse by section
Docker Desktop
Manage containers, applications, and images directly from your machine.

 Overview
 Explore Docker Desktop
 Release notes
Docker Hardened Images
Secure, minimal images for trusted software delivery.

 Overview
 Quickstart
 Use an image
Docker MCP Catalog and Toolkit
Augment your AI workflows with MCP servers.

 Overview
 Quickstart
 Explore the MCP Toolkit
Docker Engine
The definitive open source container client and runtime.

 Overview
 Install
 Release notes
Docker Build
Package, test, and ship your applications.

 Overview
 Packaging your software
 Release notes
Docker Build Cloud
Run your builds in the cloud.

 Overview
 Setup
 Release notes
Docker Compose
Define and run multi-container applications with Docker.

 Overview
 Try Docker Compose
 Release notes
Docker Hub
Find and share container images and other artifacts.

 Overview
 Create an account
 Create a repository
Docker Scout
Strengthen your software supply chain with Docker Scout.

 Overview
 Quickstart
 Image analysis
Subscription
Licensing for commercial use of Docker components.

 Overview
 Subscriptions and features
 Change subscription
Billing
Manage your billing and payment settings for your subscription.

 Overview
 Update payment method
 View billing history
Administration
Manage company and organization users, permissions, and more.

 Overview
 Organization administration
 Company administration
Security
Security guardrails for both administrators and developers.

 Overview
 SSO
 SCIM
Testcontainers Cloud
Testcontainers Cloud lets you run heavy test workloads remotely.

 Overview
 Getting started
 TCC for CI
Docker Offload
Build and run containers in the cloud.

 Overview
 Quickstart
 About Docker OffloadGet started with Docker Sandboxes
Page options
Availability:
Experimental 
Requires:
Docker Desktop 4.50 or later
This guide will help you run Claude Code in a sandboxed environment for the first time.

Prerequisites
Before you begin, ensure you have:

Docker Desktop 4.50 or later
A Claude Code subscription
Run a sandboxed agent
Follow these steps to run Claude Code in a sandboxed environment:

Navigate to Your Project


 cd ~/my-project
Start Claude in a sandbox


 docker sandbox run claude
Authenticate: on first run, Claude will prompt you to authenticate.

Once you've authenticated, the credentials are stored in a persistent Docker volume and reused for future sessions.

Claude Code launches inside the container.

What just happened?
When you ran docker sandbox run claude:

Docker created a container from a template image
Your current directory was mounted at the same path inside the container
Your Git name and email were injected into the container
Your API key was stored in a Docker volume (docker-claude-sandbox-data)
Claude Code started with bypass permissions enabled
The container continues running in the background. Running docker sandbox run claude again in the same directory reuses the existing container, allowing the agent to maintain state (installed packages, temporary files) across sessions.

Basic commands
Here are a few essential commands to manage your sandboxes:

List your sandboxes

 docker sandbox ls
Shows all your sandboxes with their IDs, names, status, and creation time.

Remove a sandbox

 docker sandbox rm <sandbox-id>
Deletes a sandbox when you're done with it. Get the sandbox ID from docker sandbox ls.

View sandbox details

 docker sandbox inspect <sandbox-id>
Shows detailed information about a specific sandbox in JSON format.

For a complete list of all commands and options, see the CLI reference.

Advanced configurations
Page options
Availability:
Experimental 
Requires:
Docker Desktop 4.50 or later
This guide covers advanced configurations for sandboxed agents running locally.

Managing sandboxes
Recreating sandboxes
Since Docker enforces one sandbox per workspace, the same sandbox is reused each time you run docker sandbox run <agent> in a given directory. To create a fresh sandbox, you need to remove the existing one first:


 docker sandbox ls  # Find the sandbox ID
 docker sandbox rm <sandbox-id>
 docker sandbox run <agent>  # Creates a new sandbox
When to recreate sandboxes
Sandboxes remember their initial configuration and don't pick up changes from subsequent docker sandbox run commands. You must recreate the sandbox to modify:

Environment variables (the -e flag)
Volume mounts (the -v flag)
Docker socket access (the --mount-docker-socket flag)
Credentials mode (the --credentials flag)
Listing and inspecting sandboxes
View all your sandboxes:


 docker sandbox ls
Get detailed information about a specific sandbox:


 docker sandbox inspect <sandbox-id>
This shows the sandbox's configuration, including environment variables, volumes, and creation time.

Removing sandboxes
Remove a specific sandbox:


 docker sandbox rm <sandbox-id>
Remove all sandboxes at once:


 docker sandbox rm $(docker sandbox ls -q)
This is useful for cleanup when you're done with a project or want to start fresh.

Giving agents access to Docker
Mount the Docker socket to give agents access to Docker commands inside the container. The agent can build images, run containers, and work with Docker Compose setups.

Caution
Mounting the Docker socket grants the agent full access to your Docker daemon, which has root-level privileges on your system. The agent can start or stop any container, access volumes, and potentially escape the sandbox. Only use this option when you fully trust the code the agent is working with.

Enable Docker socket access
Use the --mount-docker-socket flag:


 docker sandbox run --mount-docker-socket claude
This mounts your host's Docker socket (/var/run/docker.sock) into the container, giving the agent access to Docker commands.

Important
The agent can see and interact with all containers on your host, not just those created within the sandbox.

Example: Testing a containerized application
If your project has a Dockerfile, the agent can build and test it:


 cd ~/my-docker-app
 docker sandbox run --mount-docker-socket claude
Example conversation:


You: "Build the Docker image and run the tests"

Claude: *runs*
  docker build -t myapp:test .
  docker run myapp:test npm test
What agents can do with Docker socket access
With Docker access enabled, agents can:

Start multi-container applications with Docker Compose
Build images for multiple architectures
Manage existing containers on your host
Validate Dockerfiles and test build processes
Environment variables
Pass environment variables to configure the sandbox environment with the -e flag:


 docker sandbox run \
  -e NODE_ENV=development \
  -e DATABASE_URL=postgresql://localhost/myapp_dev \
  -e DEBUG=true \
  claude
These variables are available to all processes in the container, including the agent and any commands it runs. Use multiple -e flags for multiple variables.

Example: Development environment setup
Set up a complete development environment:


 docker sandbox run \
  -e NODE_ENV=development \
  -e DATABASE_URL=postgresql://localhost/myapp_dev \
  -e REDIS_URL=redis://localhost:6379 \
  -e LOG_LEVEL=debug \
  claude
Example conversation:


You: "Run the database migrations and start the development server"

Claude: *uses DATABASE_URL and other environment variables*
  npm run migrate
  npm run dev
Common use cases
API keys for testing:


 docker sandbox run \
  -e STRIPE_TEST_KEY=sk_test_xxx \
  -e SENDGRID_API_KEY=SG.xxx \
  claude
Caution
Only use test/development API keys in sandboxes, never production keys.

Loading from .env files:

Sandboxes don't automatically load .env files from your workspace, but you can ask Claude to use them:


You: "Load environment variables from .env.development and start the server"
Claude can use dotenv tools or source the file directly.

Volume mounting
Mount additional directories or files to share data beyond your main workspace. Use the -v flag with the syntax host-path:container-path:


 docker sandbox run -v ~/datasets:/data claude
This makes ~/datasets available at /data inside the container. The agent can read and write files in this location.

Read-only mounts:

Add :ro to prevent modifications:


 docker sandbox run -v ~/configs/app.yml:/config/app.yml:ro claude
Multiple mounts:

Use multiple -v flags to mount several locations:


 docker sandbox run \
  -v ~/datasets:/data:ro \
  -v ~/models:/models \
  -v ~/.cache/pip:/root/.cache/pip \
  claude
Example: Machine learning workflow
Set up an ML environment with shared datasets, model storage, and persistent caches:


 docker sandbox run \
  -v ~/datasets:/data:ro \
  -v ~/models:/models \
  -v ~/.cache/pip:/root/.cache/pip \
  claude
This provides read-only access to datasets (preventing accidental modifications), read-write access to save trained models, and a persistent pip cache for faster package installs across sessions.

Example conversation:


You: "Train a model on the MNIST dataset and save it to /models"

Claude: *runs*
  python train.py --data /data/mnist --output /models/mnist_model.h5
Common use cases
Shared configuration files:


 docker sandbox run -v ~/.aws:/root/.aws:ro claude
Build caches:


 docker sandbox run \
  -v ~/.cache/go-build:/root/.cache/go-build \
  -v ~/go/pkg/mod:/go/pkg/mod \
  claude
Custom tools:


 docker sandbox run -v ~/bin:/shared-bin:ro claude
Custom templates
Create custom sandbox templates to reuse configured environments. Instead of installing tools every time you start an agent, build a Docker image with everything pre-installed:


# syntax=docker/dockerfile:1
FROM docker/sandbox-templates:claude-code
RUN <<EOF
curl -LsSf https://astral.sh/uv/install.sh | sh
. ~/.local/bin/env
uv tool install ruff@latest
EOF
ENV PATH="$PATH:~/.local/bin"
Build the image, and use the docker sandbox run --template flag to start a new sandbox based on the image.


 docker build -t my-dev-env .
 docker sandbox run --template my-dev-env claude
Using standard images
You can use standard Docker images as sandbox templates, but they don't include agent binaries, shell configuration, or runtime dependencies that Docker's sandbox templates provide. Using a standard Python image directly fails:


 docker sandbox run --template python:3-slim claude
The claude binary was not found in the sandbox; please check this is the correct sandbox for this agent.
To use a standard image, create a Dockerfile that installs the agent binary, dependencies, and shell configuration on top of your base image. This approach makes sense when you need a specific base image (for example, an exact OS version or a specialized image with particular build tools).
Troubleshooting
Page options
Availability:
Experimental 
Requires:
Docker Desktop 4.50 or later
This guide helps you resolve common issues when sandboxing Claude Code locally.

'sandbox' is not a docker command
When you run docker sandbox, you see an error saying the command doesn't exist.

This means the CLI plugin isn't installed or isn't in the correct location. To fix:

Verify the plugin exists:


 ls -la ~/.docker/cli-plugins/docker-sandbox
The file should exist and be executable.

If using Docker Desktop, restart it to detect the plugin.

"Experimental Features" needs to be enabled by your administrator
You see an error about beta features being disabled when trying to use sandboxes.

This happens when your Docker Desktop installation is managed by an administrator who has locked settings. If your organization uses Settings Management, ask your administrator to allow beta features:


{
  "configurationFileVersion": 2,
  "allowBetaFeatures": {
    "locked": false,
    "value": true
  }
}
Authentication failure
Claude can't authenticate, or you see API key errors.

The API key is likely invalid, expired, or not configured correctly. How to fix depends on your credential mode:

If using --credentials=sandbox (the default):

Remove the stored credentials:


 docker volume rm docker-claude-sandbox-data
Start a new sandbox and complete the authentication workflow:


 docker sandbox run claude
Workspace contains API key configuration
You see a warning about conflicting credentials when starting a sandbox.

This happens when your workspace has a .claude.json file with a primaryApiKey field. Choose one of these approaches:

Remove the primaryApiKey field from your .claude.json:


{
  "apiKeyHelper": "/path/to/script",
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.anthropic.com"
  }
}
Or proceed with the warning - workspace credentials will be ignored in favor of sandbox credentials.

Permission denied when accessing workspace files
Claude or commands fail with "Permission denied" errors when accessing files in the workspace.

This usually means the workspace path isn't accessible to Docker, or file permissions are too restrictive.

If using Docker Desktop:

Check File Sharing settings at Docker Desktop → Settings → Resources → File Sharing.

Ensure your workspace path (or a parent directory) is listed under Virtual file shares.

If missing, click "+" to add the directory containing your workspace.

Restart Docker Desktop.

For all platforms, verify file permissions:


 ls -la <workspace>
Ensure files are readable. If needed:


 chmod -R u+r <workspace>
Also verify the workspace path exists:


 cd <workspace>
Get started with DMR
Page options
Docker Model Runner (DMR) lets you run and manage AI models locally using Docker. This page shows you how to enable DMR, pull and run a model, configure model settings, and publish custom models.

Enable Docker Model Runner
You can enable DMR using Docker Desktop or Docker Engine. Follow the instructions below based on your setup.

Docker Desktop
In the settings view, go to the AI tab.
Select the Enable Docker Model Runner setting.
If you use Windows with a supported NVIDIA GPU, you also see and can select Enable GPU-backed inference.
Optional: To enable TCP support, select Enable host-side TCP support.
In the Port field, type the port you want to use.
If you interact with Model Runner from a local frontend web app, in CORS Allows Origins, select the origins that Model Runner should accept requests from. An origin is the URL where your web app runs, for example http://localhost:3131.
You can now use the docker model command in the CLI and view and interact with your local models in the Models tab in the Docker Desktop Dashboard.

Important
For Docker Desktop versions 4.45 and earlier, this setting was under the Beta features tab.

Docker Engine
Ensure you have installed Docker Engine.

Docker Model Runner is available as a package. To install it, run:

Ubuntu/Debian RPM-base distributions

$ sudo apt-get update
$ sudo apt-get install docker-model-plugin
Test the installation:


$ docker model version
$ docker model run ai/smollm2
Note
TCP support is enabled by default for Docker Engine on port 12434.

Update DMR in Docker Engine
To update Docker Model Runner in Docker Engine, uninstall it with docker model uninstall-runner then reinstall it:


docker model uninstall-runner --images && docker model install-runner
Note
With the above command, local models are preserved. To delete the models during the upgrade, add the --models option to the uninstall-runner command.

Pull a model
Models are cached locally.

Note
When you use the Docker CLI, you can also pull models directly from HuggingFace.

From Docker Desktop From the Docker CLI
Select Models and select the Docker Hub tab.
Find the model you want and select Pull.
Screenshot showing the Docker Hub view.
Run a model
From Docker Desktop From the Docker CLI
Select Models and select the Local tab.
Select the play button. The interactive chat screen opens.
Screenshot showing the Local view.
Configure a model
You can configure a model, such as its maximum token limit and more, use Docker Compose. See Models and Compose - Model configuration options.

Publish a model
Note
This works for any Container Registry supporting OCI Artifacts, not only Docker Hub.

You can tag existing models with a new name and publish them under a different namespace and repository:


# Tag a pulled model under a new name
$ docker model tag ai/smollm2 myorg/smollm2

# Push it to Docker Hub
$ docker model push myorg/smollm2
For more details, see the docker model tag and docker model push command documentation.

You can also package a model file in GGUF format as an OCI Artifact and publish it to Docker Hub.


# Download a model file in GGUF format, for example from HuggingFace
$ curl -L -o model.gguf https://huggingface.co/TheBloke/Mistral-7B-v0.1-GGUF/resolve/main/mistral-7b-v0.1.Q4_K_M.gguf

# Package it as OCI Artifact and push it to Docker Hub
$ docker model package --gguf "$(pwd)/model.gguf" --push myorg/mistral-7b-v0.1:Q4_K_M
For more details, see the docker model package command documentation.

Troubleshooting
Display the logs
To troubleshoot issues, display the logs:

From Docker Desktop From the Docker CLI
Select Models and select the Logs tab.

Screenshot showing the Models view.
Inspect requests and responses
Inspecting requests and responses helps you diagnose model-related issues. For example, you can evaluate context usage to verify you stay within the model's context window or display the full body of a request to control the parameters you are passing to your models when developing with a framework.

In Docker Desktop, to inspect the requests and responses for each model:

Select Models and select the Requests tab. This view displays all the requests to all models:
The time the request was sent.
The model name and version
The prompt/request
The context usage
The time it took for the response to be generated.
Select one of the requests to display further details:
In the Overview tab, view the token usage, response metadata and generation speed, and the actual prompt and response.
In the Request and Response tabs, view the full JSON payload of the request and the response.
Note
You can also display the requests for a specific model when you select a model and then select the Requests tab.
DMR REST API
Page options
Once Model Runner is enabled, new API endpoints are available. You can use these endpoints to interact with a model programmatically.

Determine the base URL
The base URL to interact with the endpoints depends on how you run Docker:

Docker Desktop Docker Engine
From containers: http://model-runner.docker.internal/
From host processes: http://localhost:12434/, assuming TCP host access is enabled on the default port (12434).
Available DMR endpoints
Create a model:


POST /models/create
List models:


GET /models
Get a model:


GET /models/{namespace}/{name}
Delete a local model:


DELETE /models/{namespace}/{name}
Available OpenAI endpoints
DMR supports the following OpenAI endpoints:

List models:


GET /engines/llama.cpp/v1/models
Retrieve model:


GET /engines/llama.cpp/v1/models/{namespace}/{name}
List chat completions:


POST /engines/llama.cpp/v1/chat/completions
Create completions:


POST /engines/llama.cpp/v1/completions
Create embeddings:


POST /engines/llama.cpp/v1/embeddings
To call these endpoints via a Unix socket (/var/run/docker.sock), prefix their path with /exp/vDD4.40.

Note
You can omit llama.cpp from the path. For example: POST /engines/v1/chat/completions.

REST API examples
Request from within a container
To call the chat/completions OpenAI endpoint from within another container using curl:


#!/bin/sh

curl http://model-runner.docker.internal/engines/llama.cpp/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "ai/smollm2",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Please write 500 words about the fall of Rome."
            }
        ]
    }'
Request from the host using TCP
To call the chat/completions OpenAI endpoint from the host via TCP:

Enable the host-side TCP support from the Docker Desktop GUI, or via the Docker Desktop CLI. For example: docker desktop enable model-runner --tcp <port>.

If you are running on Windows, also enable GPU-backed inference. See Enable Docker Model Runner.

Interact with it as documented in the previous section using localhost and the correct port.


#!/bin/sh

  curl http://localhost:12434/engines/llama.cpp/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "ai/smollm2",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Please write 500 words about the fall of Rome."
            }
        ]
    }'
Request from the host using a Unix socket
To call the chat/completions OpenAI endpoint through the Docker socket from the host using curl:


#!/bin/sh

curl --unix-socket $HOME/.docker/run/docker.sock \
    localhost/exp/vDD4.40/engines/llama.cpp/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "ai/smollm2",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Please write 500 words about the fall of Rome."
            }
        ]
    }'


DMR examples
Page options
See some examples of complete workflows using Docker Model Runner.

Sample project
You can now start building your generative AI application powered by Docker Model Runner.

If you want to try an existing GenAI application, follow these steps:

Set up the sample app. Clone and run the following repository:


 git clone https://github.com/docker/hello-genai.git
In your terminal, go to the hello-genai directory.

Run run.sh to pull the chosen model and run the app.

Open your app in the browser at the addresses specified in the repository README.

You see the GenAI app's interface where you can start typing your prompts.

You can now interact with your own GenAI app, powered by a local model. Try a few prompts and notice how fast the responses are — all running on your machine with Docker.

Use Model Runner in GitHub Actions
Here is an example of how to use Model Runner as part of a GitHub workflow. The example installs Model Runner, tests the installation, pulls and runs a model, interacts with the model via the API, and deletes the model.

dmr-run.yml

name: Docker Model Runner Example Workflow

permissions:
  contents: read

on:
  workflow_dispatch:
    inputs:
      test_model:
        description: 'Model to test with (default: ai/smollm2:360M-Q4_K_M)'
        required: false
        type: string
        default: 'ai/smollm2:360M-Q4_K_M'

jobs:
  dmr-test:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - name: Set up Docker
        uses: docker/setup-docker-action@v4

      - name: Install docker-model-plugin
        run: |
          echo "Installing docker-model-plugin..."
          # Add Docker's official GPG key:
          sudo apt-get update
          sudo apt-get install ca-certificates curl
          sudo install -m 0755 -d /etc/apt/keyrings
          sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
          sudo chmod a+r /etc/apt/keyrings/docker.asc
          
          # Add the repository to Apt sources:
          echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
          $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
          sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
          sudo apt-get update
          sudo apt-get install -y docker-model-plugin
          
          echo "Installation completed successfully"

      - name: Test docker model version
        run: |
          echo "Testing docker model version command..."
          sudo docker model version
          
          # Verify the command returns successfully
          if [ $? -eq 0 ]; then
            echo "✅ docker model version command works correctly"
          else
            echo "❌ docker model version command failed"
            exit 1
          fi

      - name: Pull the provided model and run it
        run: |
          MODEL="${{ github.event.inputs.test_model || 'ai/smollm2:360M-Q4_K_M' }}"
          echo "Testing with model: $MODEL"
          
          # Test model pull
          echo "Pulling model..."
          sudo docker model pull "$MODEL"
          
          if [ $? -eq 0 ]; then
            echo "✅ Model pull successful"
          else
            echo "❌ Model pull failed"
            exit 1
          fi
                  
          # Test basic model run (with timeout to avoid hanging)
          echo "Testing docker model run..."
          timeout 60s sudo docker model run "$MODEL" "Give me a fact about whales." || {
            exit_code=$?
            if [ $exit_code -eq 124 ]; then
              echo "✅ Model run test completed (timed out as expected for non-interactive test)"
            else
              echo "❌ Model run failed with exit code: $exit_code"
              exit 1
            fi
          }
               - name: Test model pull and run
        run: |
          MODEL="${{ github.event.inputs.test_model || 'ai/smollm2:360M-Q4_K_M' }}"
          echo "Testing with model: $MODEL"
          
          # Test model pull
          echo "Pulling model..."
          sudo docker model pull "$MODEL"
          
          if [ $? -eq 0 ]; then
            echo "✅ Model pull successful"
          else
            echo "❌ Model pull failed"
            exit 1
          fi
                  
          # Test basic model run (with timeout to avoid hanging)
          echo "Testing docker model run..."
          timeout 60s sudo docker model run "$MODEL" "Give me a fact about whales." || {
            exit_code=$?
            if [ $exit_code -eq 124 ]; then
              echo "✅ Model run test completed (timed out as expected for non-interactive test)"
            else
              echo "❌ Model run failed with exit code: $exit_code"
              exit 1
            fi
          }

      - name: Test API endpoint
        run: |
          MODEL="${{ github.event.inputs.test_model || 'ai/smollm2:360M-Q4_K_M' }}"
          echo "Testing API endpoint with model: $MODEL"
                  
          # Test API call with curl
          echo "Testing API call..."
          RESPONSE=$(curl -s http://localhost:12434/engines/llama.cpp/v1/chat/completions \
            -H "Content-Type: application/json" \
            -d "{
                \"model\": \"$MODEL\",
                \"messages\": [
                    {
                        \"role\": \"user\",
                        \"content\": \"Say hello\"
                    }
                ],
                \"top_k\": 1,
                \"temperature\": 0
            }")
          
          if [ $? -eq 0 ]; then
            echo "✅ API call successful"
            echo "Response received: $RESPONSE"
            
            # Check if response contains "hello" (case-insensitive)
            if echo "$RESPONSE" | grep -qi "hello"; then
              echo "✅ Response contains 'hello' (case-insensitive)"
            else
              echo "❌ Response does not contain 'hello'"
              echo "Full response: $RESPONSE"
              exit 1
            fi
          else
            echo "❌ API call failed"
            exit 1
          fi

      - name: Test model cleanup
        run: |
          MODEL="${{ github.event.inputs.test_model || 'ai/smollm2:360M-Q4_K_M' }}"
          
          echo "Cleaning up test model..."
          sudo docker model rm "$MODEL" || echo "Model removal failed or model not found"
          
          # Verify model was removed
          echo "Verifying model cleanup..."
          sudo docker model ls
          
          echo "✅ Model cleanup completed"

      - name: Report success
        if: success()
        run: |
          echo "🎉 Docker Model Runner daily health check completed successfully!"
          echo "All tests passed:"
          echo "  ✅ docker-model-plugin installation successful"
          echo "  ✅ docker model version command working"
          echo "  ✅ Model pull and run operations successful"
          echo "  ✅ API endpoint operations successful"
          echo "  ✅ Cleanup operations successful"
Related pages

Model Context Protocol (MCP)
Page options
Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context and additional functionality to large language models. MCP functions as a client-server protocol, where the client, for example an application like Gordon, sends requests, and the server processes those requests to deliver the necessary context to the AI. This context may be gathered by the MCP server by executing code to perform an action and retrieving the result, calling external APIs, or other similar operations.

Gordon, along with other MCP clients like Claude Desktop or Cursor, can interact with MCP servers running as containers.

Built-in tools
Use the built-in tools.

Ask Gordon
Page options
Availability:
Beta 
Requires:
Docker Desktop 4.38.0 or later
Ask Gordon is your personal AI assistant embedded in Docker Desktop and the Docker CLI. It's designed to streamline your workflow and help you make the most of the Docker ecosystem.

Key features
Ask Gordon provides AI-powered assistance in Docker tools. It can:

Improve Dockerfiles
Run and troubleshoot containers
Interact with your images and code
Find vulnerabilities or configuration issues
Migrate a Dockerfile to use Docker Hardened Images
It understands your local environment, including source code, Dockerfiles, and images, to provide personalized and actionable guidance.

Ask Gordon remembers conversations, allowing you to switch topics more easily.

Ask Gordon is not enabled by default, and is not production-ready. You may also encounter the term "Docker AI" as a broader reference to this technology.

Note
Ask Gordon is powered by Large Language Models (LLMs). Like all LLM-based tools, its responses may sometimes be inaccurate. Always verify the information provided.

What data does Gordon access?
When you use Ask Gordon, the data it accesses depends on your query:

Local files: If you use the docker ai command, Ask Gordon can access files and directories in the current working directory where the command is executed. In Docker Desktop, if you ask about a specific file or directory in the Ask Gordon view, you'll be prompted to select the relevant context.
Local images: Gordon integrates with Docker Desktop and can view all images in your local image store. This includes images you've built or pulled from a registry.
To provide accurate responses, Ask Gordon may send relevant files, directories, or image metadata to the Gordon backend with your query. This data transfer occurs over the network but is never stored persistently or shared with third parties. It is used only to process your request and formulate a response. For details about privacy terms and conditions for Docker AI, review Gordon's Supplemental Terms.

All data transferred is encrypted in transit.

How your data is collected and used
Docker collects anonymized data from your interactions with Ask Gordon to improve the service. This includes:

Your queries: Questions you ask Gordon.
Responses: Answers provided by Gordon.
Feedback: Thumbs-up and thumbs-down ratings.
To ensure privacy and security:

Data is anonymized and cannot be traced back to you or your account.
Docker does not use this data to train AI models or share it with third parties.
By using Ask Gordon, you help improve Docker AI's reliability and accuracy for everyone.

If you have concerns about data collection or usage, you can disable the feature at any time.

Enable Ask Gordon
Sign in to your Docker account.

Go to the Beta features tab in settings.

Check the Enable Docker AI checkbox.

The Docker AI terms of service agreement appears. You must agree to the terms before you can enable the feature. Review the terms and select Accept and enable to continue.

Select Apply.

Important
For Docker Desktop versions 4.41 and earlier, this setting is under the Experimental features tab on the Features in development page.

Using Ask Gordon
You can access Gordon:

In Docker Desktop, in the Ask Gordon view.
In the Docker CLI, with the docker ai command.
After you enable Docker AI features, you will also see Ask Gordon in other places in Docker Desktop. Whenever you see a button with the Sparkles (✨) icon, you can use it to get contextual support from Ask Gordon.

Example workflows
Ask Gordon is a general-purpose AI assistant for Docker tasks and workflows. Here are some things you can try:

Troubleshoot a crashed container
Get help with running a container
Improve a Dockerfile
Migrate a Dockerfile to DHI
For more examples, try asking Gordon directly. For example:


 docker ai "What can you do?"
Troubleshoot a crashed container
If you start a container with an invalid configuration or command, use Ask Gordon to troubleshoot the error. For example, try starting a Postgres container without a database password:


 docker run postgres
Error: Database is uninitialized and superuser password is not specified.
       You must specify POSTGRES_PASSWORD to a non-empty value for the
       superuser. For example, "-e POSTGRES_PASSWORD=password" on "docker run".

       You may also use "POSTGRES_HOST_AUTH_METHOD=trust" to allow all
       connections without a password. This is *not* recommended.

       See PostgreSQL documentation about "trust":
       https://www.postgresql.org/docs/current/auth-trust.html
In the Containers view in Docker Desktop, select the ✨ icon next to the container's name, or inspect the container and open the Ask Gordon tab.

Get help with running a container
If you want to run a specific image but are not sure how, Gordon can help you get set up:

Pull an image from Docker Hub (for example, postgres).
Open the Images view in Docker Desktop and select the image.
Select the Run button.
In the Run a new container dialog, you see a message about Ask Gordon.

Screenshot showing Ask Gordon hint in Docker Desktop.
The linked text in the hint is a suggested prompt to start a conversation with Ask Gordon.

Improve a Dockerfile
Gordon can analyze your Dockerfile and suggest improvements. To have Gordon evaluate your Dockerfile using the docker ai command:

Go to your project directory:


 cd <path-to-your-project>
Use the docker ai command to rate your Dockerfile:


 docker ai rate my Dockerfile
Gordon will analyze your Dockerfile and identify opportunities for improvement across several dimensions:

Build cache optimization
Security
Image size efficiency
Best practices compliance
Maintainability
Reproducibility
Portability
Resource efficiency
Migrate a Dockerfile to DHI
Migrating your Dockerfile to use Docker Hardened Images helps you build more secure, minimal, and production-ready containers. DHIs reduce vulnerabilities, enforce best practices, and simplify compliance, making them a strong foundation for secure software supply chains.

To request Gordon's help for the migration:

Ensure Gordon is enabled.

In Gordon's Toolbox, ensure Gordon's Developer MCP Toolkit is enabled.

In the terminal, navigate to the directory containing your Dockerfile.

Start a conversation with Gordon:


docker ai
Type:


"Migrate my dockerfile to DHI"
Follow the conversation with Gordon. Gordon will edit your Dockerfile, so when it requests access to the filesystem and more, type yes to allow Gordon to proceed.

Note
To learn more about Gordon's data retention and the data it can access, see Gordon.

When the migration is complete, you see a success message:


The migration to Docker Hardened Images (DHI) is complete. The updated Dockerfile
successfully builds the image, and no vulnerabilities were detected in the final image.
The functionality and optimizations of the original Dockerfile have been preserved.
Important
As with any AI tool, you must verify Gordon's edits and test your image.

Disable Ask Gordon
For individual users
If you've enabled Ask Gordon and you want to disable it again:

Open the Settings view in Docker Desktop.
Go to Beta features.
Clear the Enable Docker AI checkbox.
Select Apply.
For organizations
To disable Ask Gordon for your entire Docker organization, use Settings Management and add this property to your admin-settings.json file:


{
  "enableDockerAI": {
    "value": false,
    "locked": true
  }
}
Or disable all Beta features by setting allowBetaFeatures to false:


{
  "allowBetaFeatures": {
    "value": false,
    "locked": true
  }
}
Feedback
We value your input on Ask Gordon and encourage you to share your experience. Your feedback helps us improve and refine Ask Gordon for all users. If you encounter issues, have suggestions, or simply want to share what you like, here's how you can get in touch:

Thumbs-up and thumbs-down buttons

Rate Ask Gordon's responses using the thumbs-up or thumbs-down buttons in the response.

Feedback survey

You can access the Ask Gordon survey by following the Give feedback link in the Ask Gordon view in Docker Desktop, or from the CLI by running the docker ai feedback command.

Define AI Models in Docker Compose applications
Page options
Requires:
Docker Compose 2.38.0 and later
Compose lets you define AI models as core components of your application, so you can declare model dependencies alongside services and run the application on any platform that supports the Compose Specification.

Prerequisites
Docker Compose v2.38 or later
A platform that supports Compose models such as Docker Model Runner (DMR) or compatible cloud providers. If you are using DMR, see the requirements.
What are Compose models?
Compose models are a standardized way to define AI model dependencies in your application. By using the models top-level element in your Compose file, you can:

Declare which AI models your application needs
Specify model configurations and requirements
Make your application portable across different platforms
Let the platform handle model provisioning and lifecycle management
Basic model definition
To define models in your Compose application, use the models top-level element:


services:
  chat-app:
    image: my-chat-app
    models:
      - llm

models:
  llm:
    model: ai/smollm2
This example defines:

A service called chat-app that uses a model named llm
A model definition for llm that references the ai/smollm2 model image
Model configuration options
Models support various configuration options:


models:
  llm:
    model: ai/smollm2
    context_size: 1024
    runtime_flags:
      - "--a-flag"
      - "--another-flag=42"
Common configuration options include:

model (required): The OCI artifact identifier for the model. This is what Compose pulls and runs via the model runner.

context_size: Defines the maximum token context size for the model.

Note
Each model has its own maximum context size. When increasing the context length, consider your hardware constraints. In general, try to keep context size as small as feasible for your specific needs.

runtime_flags: A list of raw command-line flags passed to the inference engine when the model is started. For example, if you use llama.cpp, you can pass any of the available parameters.

Platform-specific options may also be available via extension attributes x-*

Tip
See more example in the Common runtime configurations section.

Service model binding
Services can reference models in two ways: short syntax and long syntax.

Short syntax
The short syntax is the simplest way to bind a model to a service:


services:
  app:
    image: my-app
    models:
      - llm
      - embedding-model

models:
  llm:
    model: ai/smollm2
  embedding-model:
    model: ai/all-minilm
With short syntax, the platform automatically generates environment variables based on the model name:

LLM_URL - URL to access the LLM model
LLM_MODEL - Model identifier for the LLM model
EMBEDDING_MODEL_URL - URL to access the embedding-model
EMBEDDING_MODEL_MODEL - Model identifier for the embedding-model
Long syntax
The long syntax allows you to customize environment variable names:


services:
  app:
    image: my-app
    models:
      llm:
        endpoint_var: AI_MODEL_URL
        model_var: AI_MODEL_NAME
      embedding-model:
        endpoint_var: EMBEDDING_URL
        model_var: EMBEDDING_NAME

models:
  llm:
    model: ai/smollm2
  embedding-model:
    model: ai/all-minilm
With this configuration, your service receives:

AI_MODEL_URL and AI_MODEL_NAME for the LLM model
EMBEDDING_URL and EMBEDDING_NAME for the embedding model
Platform portability
One of the key benefits of using Compose models is portability across different platforms that support the Compose specification.

Docker Model Runner
When Docker Model Runner is enabled:


services:
  chat-app:
    image: my-chat-app
    models:
      llm:
        endpoint_var: AI_MODEL_URL
        model_var: AI_MODEL_NAME

models:
  llm:
    model: ai/smollm2
    context_size: 4096
    runtime_flags:
      - "--no-prefill-assistant"
Docker Model Runner will:

Pull and run the specified model locally
Provide endpoint URLs for accessing the model
Inject environment variables into the service
Cloud providers
The same Compose file can run on cloud providers that support Compose models:


services:
  chat-app:
    image: my-chat-app
    models:
      - llm

models:
  llm:
    model: ai/smollm2
    # Cloud-specific configurations
    x-cloud-options:
      - "cloud.instance-type=gpu-small"
      - "cloud.region=us-west-2"
Cloud providers might:

Use managed AI services instead of running models locally
Apply cloud-specific optimizations and scaling
Provide additional monitoring and logging capabilities
Handle model versioning and updates automatically
Common runtime configurations
Below are some example configurations for various use cases.

Development

services:
  app:
    image: app
    models:
      dev_model:
        endpoint_var: DEV_URL
        model_var: DEV_MODEL

models:
  dev_model:
    model: ai/model
    context_size: 4096
    runtime_flags:
      - "--verbose"                       # Set verbosity level to infinity
      - "--verbose-prompt"                # Print a verbose prompt before generation
      - "--log-prefix"                    # Enable prefix in log messages
      - "--log-timestamps"                # Enable timestamps in log messages
      - "--log-colors"                    # Enable colored logging
Conservative with disabled reasoning

services:
  app:
    image: app
    models:
      conservative_model:
        endpoint_var: CONSERVATIVE_URL
        model_var: CONSERVATIVE_MODEL

models:
  conservative_model:
    model: ai/model
    context_size: 4096
    runtime_flags:
      - "--temp"                # Temperature
      - "0.1"
      - "--top-k"               # Top-k sampling
      - "1"
      - "--reasoning-budget"    # Disable reasoning
      - "0"
Creative with high randomness

services:
  app:
    image: app
    models:
      creative_model:
        endpoint_var: CREATIVE_URL
        model_var: CREATIVE_MODEL

models:
  creative_model:
    model: ai/model
    context_size: 4096
    runtime_flags:
      - "--temp"                # Temperature
      - "1"
      - "--top-p"               # Top-p sampling
      - "0.9"
Highly deterministic

services:
  app:
    image: app
    models:
      deterministic_model:
        endpoint_var: DET_URL
        model_var: DET_MODEL

models:
  deterministic_model:
    model: ai/model
    context_size: 4096
    runtime_flags:
      - "--temp"                # Temperature
      - "0"
      - "--top-k"               # Top-k sampling
      - "1"
Concurrent processing

services:
  app:
    image: app
    models:
      concurrent_model:
        endpoint_var: CONCURRENT_URL
        model_var: CONCURRENT_MODEL

models:
  concurrent_model:
    model: ai/model
    context_size: 2048
    runtime_flags:
      - "--threads"             # Number of threads to use during generation
      - "8"
      - "--mlock"               # Lock memory to prevent swapping
Rich vocabulary model

services:
  app:
    image: app
    models:
      rich_vocab_model:
        endpoint_var: RICH_VOCAB_URL
        model_var: RICH_VOCAB_MODEL

models:
  rich_vocab_model:
    model: ai/model
    context_size: 4096
    runtime_flags:
      - "--temp"                # Temperature
      - "0.1"
      - "--top-p"               # Top-p sampling
      - "0.9"
Alternative configuration with provider services
Important
This approach is deprecated. Use the models top-level element instead.

You can also use the provider service type, which allows you to declare platform capabilities required by your application. For AI models, you can use the model type to declare model dependencies.

To define a model provider:


services:
  chat:
    image: my-chat-app
    depends_on:
      - ai_runner

  ai_runner:
    provider:
      type: model
      options:
        model: ai/smollm2
        context-size: 1024
        runtime-flags: "--no-prefill-assistant"

Get started with Docker MCP Toolkit
Page options
Availability:
Beta 
The Docker MCP Toolkit makes it easy to set up, manage, and run containerized Model Context Protocol (MCP) servers, and connect them to AI agents. It provides secure defaults and support for a growing ecosystem of LLM-based clients. This page shows you how to get started quickly with the Docker MCP Toolkit.

Setup
Before you begin, make sure you meet the following requirements to get started with Docker MCP Toolkit.

Download and install the latest version of Docker Desktop.
Open the Docker Desktop settings and select Beta features.
Select Enable Docker MCP Toolkit.
Select Apply.
The Learning center in Docker Desktop provides walkthroughs and resources to help you get started with Docker products and features. On the MCP Toolkit page, the Get started walkthrough that guides you through installing an MCP server, connecting a client, and testing your setup.

Alternatively, follow the step-by-step instructions on this page to:

Install MCP servers
Connect clients
Verify connections
Install MCP servers
Docker Desktop CLI
In Docker Desktop, select MCP Toolkit and select the Catalog tab.

Search for the GitHub Official server from the catalog and then select the plus icon to add it.

In the GitHub Official server page, select the Configuration tab and select OAuth.

Note
The type of configuration required depends on the server you select. For the GitHub Official server, you must authenticate using OAuth.

Your browser opens the GitHub authorization page. Follow the on-screen instructions to authenticate via OAuth.

Return to Docker Desktop when the authentication process is complete.

Search for the Playwright server from the catalog and add it.

You’ve now successfully added an MCP server. Next, connect an MCP client to use the MCP Toolkit in an AI application.

Connect clients
To connect a client to MCP Toolkit:

In Docker Desktop, select MCP Toolkit and select the Clients tab.
Find your application in the list.
Select Connect to configure the client.
If your client isn't listed, you can connect the MCP Toolkit manually over stdio by configuring your client to run the following command:


docker mcp gateway run
For example, if your client uses a JSON file to configure MCP servers, you may add an entry like:


{
  "servers": {
    "MCP_DOCKER": {
      "command": "docker",
      "args": ["mcp", "gateway", "run"],
      "type": "stdio"
    }
  }
}
Consult the documentation of the application you're using for instructions on how to set up MCP servers manually.

Verify connections
Refer to the relevant section for instructions on how to verify that your setup is working:

Claude Code
Claude Desktop
OpenAI Codex
Continue
Cursor
Gemini
Goose
Gordon
LM Studio
OpenCode
Sema4.ai
Visual Studio Code
Zed
Claude Code
If you configured the MCP Toolkit for a specific project, navigate to the relevant project directory. Then run claude mcp list. The output should show MCP_DOCKER with a "connected" status:


 claude mcp list
Checking MCP server health...

MCP_DOCKER: docker mcp gateway run - ✓ Connected
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


 claude "Use the GitHub MCP server to show me my open pull requests"
Claude Desktop
Restart Claude Desktop and check the Search and tools menu in the chat input. You should see the MCP_DOCKER server listed and enabled:

Claude Desktop
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


Use the GitHub MCP server to show me my open pull requests
Codex
Run codex mcp list to view active MCP servers and their statuses. The MCP_DOCKER server should appear in the list with an "enabled" status:


 codex mcp list
Name        Command  Args             Env  Cwd  Status   Auth
MCP_DOCKER  docker   mcp gateway run  -    -    enabled  Unsupported
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


 codex "Use the GitHub MCP server to show me my open pull requests"
Continue
Launch the Continue terminal UI by running cn. Use the /mcp command to view active MCP servers and their statuses. The MCP_DOCKER server should appear in the list with a "connected" status:


   MCP Servers

   ➤ 🟢 MCP_DOCKER (🔧75 📝3)
     🔄 Restart all servers
     ⏹️ Stop all servers
     🔍 Explore MCP Servers
     Back

   ↑/↓ to navigate, Enter to select, Esc to go back
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


 cn "Use the GitHub MCP server to show me my open pull requests"
Cursor
Open Cursor. If you configured the MCP Toolkit for a specific project, open the relevant project directory. Then navigate to Cursor Settings > Tools & MCP. You should see MCP_DOCKER under Installed MCP Servers:

Cursor
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


Use the GitHub MCP server to show me my open pull requests
Gemini
Run gemini mcp list to view active MCP servers and their statuses. The MCP_DOCKER should appear in the list with a "connected" status.


 gemini mcp list
Configured MCP servers:

✓ MCP_DOCKER: docker mcp gateway run (stdio) - Connected
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


 gemini "Use the GitHub MCP server to show me my open pull requests"
Goose
Desktop app CLI
Open the Goose desktop application and select Extensions in the sidebar. Under Enabled Extensions, you should see an extension named Mcpdocker:

Goose desktop app
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


Use the GitHub MCP server to show me my open pull requests
Gordon
Open the Ask Gordon view in Docker Desktop and select the toolbox icon in the chat input area. The MCP Toolkit tab shows whether MCP Toolkit is enabled and displays all the provided tools:

MCP Toolkit in the Ask Gordon UI
Test the connection by submitting a prompt that invokes one of your installed MCP servers, either directly in Docker Desktop or using the CLI:


 docker ai "Use the GitHub MCP server to show me my open pull requests"
LM Studio
Restart LM Studio and start a new chat. Open the integrations menu and look for an entry named mcp/mcp-docker. Use the toggle to enable the server:

LM Studio
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


Use the GitHub MCP server to show me my open pull requests
OpenCode
The OpenCode configuration file (at ~/.config/opencode/opencode.json by default) contains the setup for MCP Toolkit:


{
  "mcp": {
    "MCP_DOCKER": {
      "type": "local",
      "command": ["docker", "mcp", "gateway", "run"],
      "enabled": true
    }
  },
  "$schema": "https://opencode.ai/config.json"
}
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


 opencode "Use the GitHub MCP server to show me my open pull requests"
Sema4.ai Studio
In Sema4.ai Studio, select Actions in the sidebar, then select the MCP Servers tab. You should see Docker MCP Toolkit in the list:

Docker MCP Toolkit in Sema4.ai Studio
To use MCP Toolkit with Sema4.ai, add it as an agent action. Find the agent you want to connect to the MCP Toolkit and open the agent editor. Select Add Action, enable Docker MCP Toolkit in the list, then save your agent:

Editing an agent in Sema4.ai Studio
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


Use the GitHub MCP server to show me my open pull requests
Visual Studio Code
Open Visual Studio Code. If you configured the MCP Toolkit for a specific project, open the relevant project directory. Then open the Extensions pane. You should see the MCP_DOCKER server listed under installed MCP servers.

MCP_DOCKER installed in Visual Studio Code
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


Use the GitHub MCP server to show me my open pull requests
Zed
Launch Zed and open agent settings:

Opening Zed agent settings from command palette
Ensure that MCP_DOCKER is listed and enabled in the MCP Servers section:

MCP_DOCKER in Zed's agent settings
Test the connection by submitting a prompt that invokes one of your installed MCP servers:


Use the GitHub MCP server to show me my open pull requests
Docker MCP Catalog
Page options
Availability:
Beta 
The Docker MCP Catalog is a centralized, trusted registry for discovering, sharing, and running MCP-compatible tools. Integrated with Docker Hub, it offers verified, versioned, and curated MCP servers packaged as Docker images. The catalog is also available in Docker Desktop.

The catalog solves common MCP server challenges:

Environment conflicts. Tools often need specific runtimes that might clash with existing setups.
Lack of isolation. Traditional setups risk exposing the host system.
Setup complexity. Manual installation and configuration slow adoption.
Inconsistency across platforms. Tools might behave unpredictably on different operating systems.
With Docker, each MCP server runs as a self-contained container. This makes it portable, isolated, and consistent. You can launch tools instantly using the Docker CLI or Docker Desktop, without worrying about dependencies or compatibility.

Key features
Extensive collection of verified MCP servers in one place.
Publisher verification and versioned releases.
Pull-based distribution using Docker infrastructure.
Tools provided by partners such as New Relic, Stripe, Grafana, and more.
Note
E2B sandboxes now include direct access to the Docker MCP Catalog, giving developers access to over 200 tools and services to seamlessly build and run AI agents. For more information, see E2B Sandboxes.

How it works
Each tool in the MCP Catalog is packaged as a Docker image with metadata.

Discover tools on Docker Hub under the mcp/ namespace.
Connect tools to your preferred agents with simple configuration through the MCP Toolkit.
Pull and run tools using Docker Desktop or the CLI.
Each catalog entry displays:

Tool description and metadata.
Version history.
List of tools provided by the MCP server.
Example configuration for agent integration.
Server deployment types
The Docker MCP Catalog supports both local and remote server deployments, each optimized for different use cases and requirements.

Local MCP servers
Local MCP servers are containerized applications that run directly on your machine. All local servers are built and digitally signed by Docker, providing enhanced security through verified provenance and integrity. These servers run as containers on your local environment and function without internet connectivity once downloaded. Local servers display a Docker icon docker whale icon to indicate they are built by Docker.

Local servers offer predictable performance, complete data privacy, and independence from external service availability. They work well for development workflows, sensitive data processing, and scenarios requiring offline functionality.

Remote MCP servers
Remote MCP servers are hosted services that run on the provider's infrastructure and connect to external services like GitHub, Notion, and Linear. Many remote servers use OAuth authentication. When a remote server requires OAuth, the MCP Toolkit handles authentication automatically - you authorize access through your browser, and the Toolkit manages credentials securely. You don't need to manually create API tokens or configure authentication.

Remote servers display a cloud icon in the catalog. For setup instructions, see MCP Toolkit.

Use an MCP server from the catalog
To use an MCP server from the catalog, see MCP Toolkit.

Contribute an MCP server to the catalog
The MCP server registry is available at https://github.com/docker/mcp-registry. To submit an MCP server, follow the contributing guidelines.

When your pull request is reviewed and approved, your MCP server is available within 24 hours on:

Docker Desktop's MCP Toolkit feature.
The Docker MCP Catalog.
The Docker Hub mcp namespace (for MCP servers built by Docker).
Docker MCP Toolkit
Page options
Availability:
Beta 
The Docker MCP Toolkit is a management interface integrated into Docker Desktop that lets you set up, manage, and run containerized MCP servers and connect them to AI agents. It removes friction from tool usage by offering secure defaults, easy setup, and support for a growing ecosystem of LLM-based clients. It is the fastest way from MCP tool discovery to local execution.

Key features
Cross-LLM compatibility: Works with Claude, Cursor, and other MCP clients.
Integrated tool discovery: Browse and launch MCP servers from the Docker MCP Catalog directly in Docker Desktop.
Zero manual setup: No dependency management, runtime configuration, or setup required.
Functions as both an MCP server aggregator and a gateway for clients to access installed MCP servers.
Tip
The MCP Toolkit includes Dynamic MCP, which enables AI agents to discover, add, and compose MCP servers on-demand during conversations, without manual configuration. Your agent can search the catalog and add tools as needed when you connect to the gateway.

How the MCP Toolkit works
MCP introduces two core concepts: MCP clients and MCP servers.

MCP clients are typically embedded in LLM-based applications, such as the Claude Desktop app. They request resources or actions.
MCP servers are launched by the client to perform the requested tasks, using any necessary tools, languages, or processes.
Docker standardizes the development, packaging, and distribution of applications, including MCP servers. By packaging MCP servers as containers, Docker eliminates issues related to isolation and environment differences. You can run a container directly, without managing dependencies or configuring runtimes.

Depending on the MCP server, the tools it provides might run within the same container as the server or in dedicated containers for better isolation.

Security
The Docker MCP Toolkit combines passive and active measures to reduce attack surfaces and ensure safe runtime behavior.

Passive security
Passive security refers to measures implemented at build-time, when the MCP server code is packaged into a Docker image.

Image signing and attestation: All MCP server images under mcp/ in the MCP Catalog are built by Docker and digitally signed to verify their source and integrity. Each image includes a Software Bill of Materials (SBOM) for full transparency.
Active security
Active security refers to security measures at runtime, before and after tools are invoked, enforced through resource and access limitations.

CPU allocation: MCP tools are run in their own container. They are restricted to 1 CPU, limiting the impact of potential misuse of computing resources.

Memory allocation: Containers for MCP tools are limited to 2 GB.

Filesystem access: By default, MCP Servers have no access to the host filesystem. The user explicitly selects the servers that will be granted file mounts.

Interception of tool requests: Requests to and from tools that contain sensitive information such as secrets are blocked.

OAuth authentication
Some MCP servers require authentication to access external services like GitHub, Notion, and Linear. The MCP Toolkit handles OAuth authentication automatically. You authorize access through your browser, and the Toolkit manages credentials securely. You don't need to manually create API tokens or configure authentication for each service.

Authorize a server with OAuth
Docker Desktop CLI
In Docker Desktop, go to MCP Toolkit and select the Catalog tab.
Find and add an MCP server that requires OAuth.
In the server's Configuration tab, select the OAuth authentication method. Follow the link to begin the OAuth authorization.
Your browser opens the authorization page for the service. Follow the on-screen instructions to complete authentication.
Return to Docker Desktop when authentication is complete.
View all authorized services in the OAuth tab. To revoke access, select Revoke next to the service you want to disconnect.

Usage examples
Example: Use the GitHub Official MCP server with Ask Gordon
To illustrate how the MCP Toolkit works, here's how to enable the GitHub Official MCP server and use Ask Gordon to interact with your GitHub account:

From the MCP Toolkit menu in Docker Desktop, select the Catalog tab and find the GitHub Official server and add it.

In the server's Configuration tab, authenticate via OAuth.

In the Clients tab, ensure Gordon is connected.

From the Ask Gordon menu, you can now send requests related to your GitHub account, in accordance to the tools provided by the GitHub Official server. To test it, ask Gordon:


What's my GitHub handle?
Make sure to allow Gordon to interact with GitHub by selecting Always allow in Gordon's answer.

Tip
The Gordon client is enabled by default, which means Gordon can automatically interact with your MCP servers.

Example: Use Claude Desktop as a client
Imagine you have Claude Desktop installed, and you want to use the GitHub MCP server, and the Puppeteer MCP server, you do not have to install the servers in Claude Desktop. You can simply install these 2 MCP servers in the MCP Toolkit, and add Claude Desktop as a client:

From the MCP Toolkit menu, select the Catalog tab and find the Puppeteer server and add it.

Repeat for the GitHub Official server.

From the Clients tab, select Connect next to Claude Desktop. Restart Claude Desktop if it's running, and it can now access all the servers in the MCP Toolkit.

Within Claude Desktop, run a test by submitting the following prompt using the Sonnet 3.5 model:


Take a screenshot of docs.docker.com and then invert the colors
Example: Use Visual Studio Code as a client
You can interact with all your installed MCP servers in Visual Studio Code:

To enable the MCP Toolkit:

Enable globally Enable for a given project
Insert the following in your Visual Studio Code's User mcp.json:


"mcp": {
 "servers": {
   "MCP_DOCKER": {
     "command": "docker",
     "args": [
       "mcp",
       "gateway",
       "run"
     ],
     "type": "stdio"
   }
 }
}
In Visual Studio Code, open a new Chat and select the Agent mode:

Copilot mode switching
You can also check the available MCP tools:

Displaying tools in VSCode

Dynamic MCP
Page options
Dynamic MCP enables AI agents to discover and add MCP servers on-demand during a conversation, without manual configuration. Instead of pre-configuring every MCP server before starting your agent session, clients can search the MCP Catalog and add servers as needed.

This capability is enabled automatically when you connect an MCP client to the MCP Toolkit. The gateway provides a set of primordial tools that agents use to discover and manage servers during runtime.

Experimental

Dynamic MCP is an experimental feature in early development. While you're welcome to try it out and explore its capabilities, you may encounter unexpected behavior or limitations. Feedback is welcome via at GitHub issues for bug reports and GitHub discussions for general questions and feature requests.

How it works
When you connect a client to the MCP Gateway, the gateway exposes a small set of management tools alongside any MCP servers you've already enabled. These management tools let agents interact with the gateway's configuration:

Tool	Description
mcp-find	Search for MCP servers in the catalog by name or description
mcp-add	Add a new MCP server to the current session
mcp-config-set	Configure settings for an MCP server
mcp-remove	Remove an MCP server from the session
mcp-exec	Execute a tool by name that exists in the current session
code-mode	Create a JavaScript-enabled tool that combines multiple MCP server tools
With these tools available, an agent can search the catalog, add servers, handle authentication, and use newly added tools directly without requiring a restart or manual configuration.

Dynamically added servers and tools are associated with your current session only. When you start a new session, previously added servers are not automatically included.

Prerequisites
To use Dynamic MCP, you need:

Docker Desktop version 4.50 or later, with MCP Toolkit enabled
An LLM application that supports MCP (such as Claude Desktop, Visual Studio Code, or Claude Code)
Your client configured to connect to the MCP Gateway
See Get started with Docker MCP Toolkit for setup instructions.

Usage
Dynamic MCP is enabled automatically when you use the MCP Toolkit. Your connected clients can now use mcp-find, mcp-add, and other management tools during conversations.

To see Dynamic MCP in action, connect your AI client to the Docker MCP Toolkit and try this prompt:


What MCP servers can I use for working with SQL databases?
Given this prompt, your agent will use the mcp-find tool provided by MCP Toolkit to search for SQL-related servers in the MCP Catalog.

And to add a server to a session, simply write a prompt and the MCP Toolkit takes care of installing and running the server:


Add the postgres mcp server
Tool composition with code mode
The code-mode tool is available as an experimental capability for creating custom JavaScript functions that combine multiple MCP server tools. The intended use case is to enable workflows that coordinate multiple services in a single operation.

Note

Code mode is in early development and is not yet reliable for general use. The documentation intentionally omits usage examples at this time.

The core Dynamic MCP capabilities (mcp-find, mcp-add, mcp-config-set, mcp-remove) work as documented and are the recommended focus for current use.

The architecture works as follows:

The agent calls code-mode with a list of server names and a tool name
The gateway creates a sandbox with access to those servers' tools
A new tool is registered in the current session with the specified name
The agent calls the newly created tool
The code executes in the sandbox with access to the specified tools
Results are returned to the agent
The sandbox can only interact with the outside world through MCP tools, which are already running in isolated containers with restricted privileges.

Security considerations
Dynamic MCP maintains the same security model as static MCP server configuration in MCP Toolkit:

All servers in the MCP Catalog are built, signed, and maintained by Docker
Servers run in isolated containers with restricted resources
Code mode runs agent-written JavaScript in an isolated sandbox that can only interact through MCP tools
Credentials are managed by the gateway and injected securely into containers
The key difference with dynamic capabilities is that agents can add new tools during runtime.

Disabling Dynamic MCP
Dynamic MCP is enabled by default in the MCP Toolkit. If you prefer to use only statically configured MCP servers, you can disable the dynamic tools feature:


 docker mcp feature disable dynamic-tools
To re-enable the feature later:


 docker mcp feature enable dynamic-tools
After changing this setting, you may need to restart any connected MCP clients.
MCP Gateway
Page options
The MCP Gateway is Docker's open source solution for orchestrating Model Context Protocol (MCP) servers. It acts as a centralized proxy between clients and servers, managing configuration, credentials, and access control.

When using MCP servers without the MCP Gateway, you need to configure applications individually for each AI application. With the MCP Gateway, you configure applications to connect to the Gateway. The Gateway then handles server lifecycle, routing, and authentication across all your servers.

Note
If you use Docker Desktop with MCP Toolkit enabled, the Gateway runs automatically in the background. You don't need to start or configure it manually. This documentation is for users who want to understand how the Gateway works or run it directly for advanced use cases.

Tip
E2B sandboxes now include direct access to the Docker MCP Catalog, giving developers access to over 200 tools and services to seamlessly build and run AI agents. For more information, see E2B Sandboxes.

How it works
MCP Gateway runs MCP servers in isolated Docker containers with restricted privileges, network access, and resource usage. It includes built-in logging and call-tracing capabilities to ensure full visibility and governance of AI tool activity.

The MCP Gateway manages the server's entire lifecycle. When an AI application needs to use a tool, it sends a request to the Gateway. The Gateway identifies which server handles that tool and, if the server isn't already running, starts it as a Docker container. The Gateway then injects any required credentials, applies security restrictions, and forwards the request to the server. The server processes the request and returns the result through the Gateway back to the AI application.

The MCP Gateway solves a fundamental problem: MCP servers are just programs that need to run somewhere. Running them directly on your machine means dealing with installation, dependencies, updates, and security risks. By running them as containers managed by the Gateway, you get isolation, consistent environments, and centralized control.

Usage
To use the MCP Gateway, you'll need Docker Desktop with MCP Toolkit enabled. Follow the MCP Toolkit guide to enable and configure servers through the graphical interface.

Manage the MCP Gateway from the CLI
With MCP Toolkit enabled, you can also interact with the MCP Gateway using the CLI. The docker mcp suite of commands lets you manage servers and tools directly from your terminal. You can also manually run Gateways with custom configurations, including security restrictions, server catalogs, and more.

To run an MCP Gateway manually, with customized parameters, use the docker mcp suite of commands.

Browse the MCP Catalog for a server that you want to use, and copy the install command from the Manual installation section.

For example, run this command in your terminal to install the duckduckgo MCP server:


docker mcp server enable duckduckgo
Connect a client, like Claude Code:


docker mcp client connect claude-code
Run the gateway:


docker mcp gateway run
Now your MCP gateway is running and you can leverage all the servers set up behind it from Claude Code.

Install the MCP Gateway manually
For Docker Engine without Docker Desktop, you'll need to download and install the MCP Gateway separately before you can run it.

Download the latest binary from the GitHub releases page.

Move or symlink the binary to the destination matching your OS:

OS	Binary destination
Linux	~/.docker/cli-plugins/docker-mcp
macOS	~/.docker/cli-plugins/docker-mcp
Windows	%USERPROFILE%\.docker\cli-plugins
Make the binaries executable:


$ chmod +x ~/.docker/cli-plugins/docker-mcp
You can now use the docker mcp command:


docker mcp --help
Additional information
For more details on how the MCP Gateway works and available customization options, see the complete documentation on GitHub.
Docker Hub MCP server
Page options
The Docker Hub MCP Server is a Model Context Protocol (MCP) server that interfaces with Docker Hub APIs to make rich image metadata accessible to LLMs, enabling intelligent content discovery and repository management.

For more information about MCP concepts and how MCP servers work, see the Docker MCP Catalog and Toolkit overview page.

Key features
Advanced LLM context: Docker's MCP Server provides LLMs with detailed, structured context for Docker Hub images, enabling smarter, more relevant recommendations for developers, whether they're choosing a base image or automating CI/CD workflows.
Natural language image discovery: Developers can find the right container image using natural language, no need to remember tags or repository names. Just describe what you need, and Docker Hub will return images that match your intent.
Simplified repository management: Hub MCP Server enables agents to manage repositories through natural language fetching image details, viewing stats, searching content, and performing key operations quickly and easily.
Install Docker Hub MCP server
From the MCP Toolkit menu, select the Catalog tab and search for Docker Hub and select the plus icon to add the Docker Hub MCP server.

In the server's Configuration tab, insert your Docker Hub username and personal access token (PAT).

In the Clients tab in MCP Toolkit, ensure Gordon is connected.

From the Ask Gordon menu, you can now send requests related to your Docker Hub account, in accordance to the tools provided by the Docker Hub MCP server. To test it, ask Gordon:


What repositories are in my namespace?
Tip
By default, the Gordon client is enabled, which means Gordon can automatically interact with your MCP servers.

Use Claude Desktop as a client
Add the Docker Hub MCP Server configuration to your claude_desktop_config.json:

For public repositories only For authenticated access

{
  "mcpServers": {
    "docker-hub": {
      "command": "node",
      "args": ["/FULL/PATH/TO/YOUR/docker-hub-mcp-server/dist/index.js", "--transport=stdio"]
    }
  }
}
Where :

/FULL/PATH/TO/YOUR/docker-hub-mcp-server is the complete path to where you cloned the repository
Save the configuration file and completely restart Claude Desktop for the changes to take effect.

Usage with Visual Studio Code
Add the Docker Hub MCP Server configuration to your User Settings (JSON) file in Visual Studio Code. You can do this by opening the Command Palette and typing Preferences: Open User Settings (JSON).

For public repositories only For authenticated access

{
  "mcpServers": {
    "docker-hub": {
      "command": "node",
      "args": ["/FULL/PATH/TO/YOUR/docker-hub-mcp-server/dist/index.js", "--transport=stdio"]
    }
  }
}
Where :

/FULL/PATH/TO/YOUR/docker-hub-mcp-server is the complete path to where you cloned the repository
Open the Command Palette and type MCP: List Servers.

Select docker-hub and select Start Server.

Using other clients
To integrate the Docker Hub MCP Server into your own development environment, see the source code and installation instructions on the hub-mcp GitHub repository.

Usage examples
This section provides task-oriented examples for common operations with Docker Hub tools.

Finding images

 Search for official images
 docker ai "Search for official nginx images on Docker Hub"

 Search for lightweight images to reduce deployment size and improve performance
 docker ai "Search for minimal Node.js images with small footprint"

 Get the most recent tag of a base image
 docker ai "Show me the latest tag details for go"

 Find a production-ready database with enterprise features and reliability
 docker ai "Search for production ready database images"

 Compare Ubuntu versions to choose the right one for my project
 docker ai "Help me find the right Ubuntu version for my project"
Repository management

 Create a repository
 docker ai "Create a repository in my namespace"

 List all repositories in my namespace
 docker ai "List all repositories in my namespace"

 Find the largest repository in my namespace
 docker ai "Which of my repositories takes up the most space?"

 Find repositories that haven't been updated recently
 docker ai "Which of my repositories haven't had any pushes in the last 60 days?"

 Find which repositories are currently active and being used
 docker ai "Show me my most recently updated repositories"

 Get details about a repository
 docker ai "Show me information about my '<repository-name>' repository"
Pull/push images

 Pull latest PostgreSQL version
 docker ai "Pull the latest postgres image"

 Push image to your Docker Hub repository
 docker ai "Push my <image-name> to my <repository-name> repository"
Tag management

 List all tags for a repository
 $ docker ai "Show me all tags for my '<repository-name>' repository"

 Find the most recently pushed tag
 docker ai "What's the most recent tag pushed to my '<repository-name>' repository?"

 List tags with architecture filtering
 docker ai "List tags for in the '<repository-name>' repository that support amd64 architecture"

 Get detailed information about a specific tag
 docker ai "Show me details about the '<tag-name>' tag in the '<repository-name>' repository"

 Check if a specific tag exists
 docker ai "Check if version 'v1.2.0' exists for my 'my-web-app' repository"
Docker Hardened Images

 List available hardened images
 docker ai "What is the most secure image I can use to run a node.js application?"

 Convert Dockerfile to use a hardened image
 docker ai "Can you help me update my Dockerfile to use a docker hardened image instead of the current one"
Note
To access Docker Hardened Images, a subscription is required. If you're interested in using Docker Hardened Images, visit Docker Hardened Images.

Reference
This section provides a comprehensive listing of the tools you can find in the Docker Hub MCP Server.

Docker Hub MCP server tools
Tools to interact with your Docker repositories and discover content on Docker Hub.

Name	Description
check-repository	Check repository
check-repository-tag	Check repository tag
check-repository-tags	Check repository tags
create-repository	Creates a new repository
docker-hardened-images	Lists available Docker Hardened Images in specified namespace
get-namespaces	Get organizations/namespaces for a user
get-repository-dockerfile	Gets Dockerfile for repository
get-repository-info	Gets repository info
list-repositories-by-namespace	Lists repositories under namespace
list-repository-tags	List repository tags
read-repository-tag	Read repository tag
search	Search content on Docker Hub
set-repository-dockerfile	Sets Dockerfile for repository
update-repository-info	Updates repository info