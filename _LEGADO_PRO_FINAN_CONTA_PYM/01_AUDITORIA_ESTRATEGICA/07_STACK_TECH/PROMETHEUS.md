Owner avatar
prometheus
Public
prometheus/prometheus
Go to file
t
Name
NickAnge
NickAnge
rules: replace error strings with sentinel errors for duplicate label…
b0649e0
·
13 hours ago
.github
Group more dependabot updates (#17563)
last week
cmd
fix(test): make TestRemoteWrite_ReshardingWithoutDeadlock more reliab…
3 days ago
config
tsdb: Deprecate retention flags; add tsdb.retention runtime configura…
last month
discovery
instrumentation: add native histograms to complement high-traffic sum…
yesterday
docs
Update Prometheus Agent doc (#17591)
last week
documentation
chore(deps): bump the go-opentelemetry-io group across 1 directory wi…
3 weeks ago
internal/tools
chore(deps): bump github.com/grpc-ecosystem/grpc-gateway/v2 (#17266)
last month
model
chore(labels): add more context to labels.MetricName deprecation. (#1…
5 days ago
notifier
feat: add histogram metric for notification_latency_seconds (#16637)
2 weeks ago
plugins
Replace gopkg.in/yaml.v2 with go.yaml.in/yaml/v2 (#17151)
2 months ago
prompb
prw2: Move Remote Write 2.0 CT to be per Sample; Rename to ST (start …
2 weeks ago
promql
instrumentation: add native histograms to complement high-traffic sum…
yesterday
rules
rules: replace error strings with sentinel errors for duplicate label…
13 hours ago
schema
chore(labels): add more context to labels.MetricName deprecation. (#1…
5 days ago
scrape
instrumentation: add native histograms to complement high-traffic sum…
yesterday
scripts
Improve repo sync script logging
2 weeks ago
storage
chore(storage): update docstring (#17609)
3 days ago
template
Add urlQueryEscape to template functions
last month
tracing
Update go modules (#17243)
2 months ago
tsdb
Add histogram validation in remote-read and during reducing resolution (
last week
util
util: add +Inf bucket in MetricFamiliesToWriteRequest when not present (
2 weeks ago
web
Refactor duration regex and remove RegExp.escape polyfill
yesterday
.dockerignore
Add image build for ppc64le architecture
5 years ago
.gitignore
ui build: create requires web/ui/static dir ad hoc
last year
.gitpod.Dockerfile
.gitpod.Dockerfile: Auto-fetch Go and goyacc vers
last year
.gitpod.yml
fix gitpod by using custome dockerfile and accurate npm ui path
4 years ago
.golangci.yml
Update golangci-lint (#17478)
3 weeks ago
.promu.yml
bump go version across all stages
3 months ago
.yamllint
Update linting (#15369)
last year
CHANGELOG.md
Register missing metric prometheus_tsdb_sample_ooo_delta (#17477)
3 weeks ago
CODEOWNERS
chore(github): add CODEOWNERS file
last month
CODE_OF_CONDUCT.md
Update link for referenced CNCF code of conduct (#10664)
3 years ago
CONTRIBUTING.md
Merge branch 'main' into mcarl/lint
last year
Dockerfile
feat: Add OpenContainers spec labels to Dockerfile (#16483)
last month
LICENSE
Clean up license issues.
11 years ago
MAINTAINERS.md
Remove azure maintainer from MAINTAINERS.md
last month
Makefile
Merge pull request #17090 from machine424/bump_go
3 months ago
Makefile.common
Makefile.common: Use git ls-files instead of find for license check a…
last week
NOTICE
UI: Speed up alerts/rules/... pages by not rendering collapsed content
3 weeks ago
README.md
drop GO111MODULE=on (#17520)
yesterday
RELEASE.md
Volunteer @jan--f as release shepherd for v3.8
last month
SECURITY-INSIGHTS.yml
chore: provide OSSF security insight
last year
SECURITY.md
fix markdown lint issues (#10591)
3 years ago
VERSION
prepare release 3.7.3 (#17428)
last month
go.mod
chore(deps): bump github.com/prometheus/sigv4 from 0.2.1 to 0.3.0
3 weeks ago
go.sum
chore(deps): bump github.com/prometheus/sigv4 from 0.2.1 to 0.3.0
3 weeks ago
plugins.yml
discovery: add STACKIT SD (#16401)
5 months ago
renovate.json
Add Renovate configuration (#16654)
last month
ui-commits
promql: rename holt_winters to double_exponential_smoothing
last year
Repository files navigation
README
Code of conduct
Contributing
Apache-2.0 license
Security
Prometheus
Prometheus
Visit prometheus.io for the full documentation, examples and guides.

CI Docker Repository on Quay Docker Pulls Go Report Card CII Best Practices OpenSSF Scorecard CLOMonitor Gitpod ready-to-code Fuzzing Status

Prometheus, a Cloud Native Computing Foundation project, is a systems and service monitoring system. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts when specified conditions are observed.

The features that distinguish Prometheus from other metrics and monitoring systems are:

A multi-dimensional data model (time series defined by metric name and set of key/value dimensions)
PromQL, a powerful and flexible query language to leverage this dimensionality
No dependency on distributed storage; single server nodes are autonomous
An HTTP pull model for time series collection
Pushing time series is supported via an intermediary gateway for batch jobs
Targets are discovered via service discovery or static configuration
Multiple modes of graphing and dashboarding support
Support for hierarchical and horizontal federation
Architecture overview
Architecture overview

Install
There are various ways of installing Prometheus.

Precompiled binaries
Precompiled binaries for released versions are available in the download section on prometheus.io. Using the latest production release binary is the recommended way of installing Prometheus. See the Installing chapter in the documentation for all the details.

Docker images
Docker images are available on Quay.io or Docker Hub.

You can launch a Prometheus container for trying it out with

docker run --name prometheus -d -p 127.0.0.1:9090:9090 prom/prometheus
Prometheus will now be reachable at http://localhost:9090/.

Building from source
To build Prometheus from source code, You need:

Go: Version specified in go.mod or greater.
NodeJS: Version specified in .nvmrc or greater.
npm: Version 8 or greater (check with npm --version and here).
Start by cloning the repository:

git clone https://github.com/prometheus/prometheus.git
cd prometheus
You can use the go tool to build and install the prometheus and promtool binaries into your GOPATH:

go install github.com/prometheus/prometheus/cmd/...
prometheus --config.file=your_config.yml
However, when using go install to build Prometheus, Prometheus will expect to be able to read its web assets from local filesystem directories under web/ui/static and web/ui/templates. In order for these assets to be found, you will have to run Prometheus from the root of the cloned repository. Note also that these directories do not include the React UI unless it has been built explicitly using make assets or make build.

An example of the above configuration file can be found here.

You can also build using make build, which will compile in the web assets so that Prometheus can be run from anywhere:

make build
./prometheus --config.file=your_config.yml
The Makefile provides several targets:

build: build the prometheus and promtool binaries (includes building and compiling in web assets)
test: run the tests
test-short: run the short tests
format: format the source code
vet: check the source code for common errors
assets: build the React UI
Service discovery plugins
Prometheus is bundled with many service discovery plugins. When building Prometheus from source, you can edit the plugins.yml file to disable some service discoveries. The file is a yaml-formatted list of go import path that will be built into the Prometheus binary.

After you have changed the file, you need to run make build again.

If you are using another method to compile Prometheus, make plugins will generate the plugins file accordingly.

If you add out-of-tree plugins, which we do not endorse at the moment, additional steps might be needed to adjust the go.mod and go.sum files. As always, be extra careful when loading third party code.

Building the Docker image
You can build a docker image locally with the following commands:

make promu
promu crossbuild -p linux/amd64
make npm_licenses
make common-docker-amd64
The make docker target is intended only for use in our CI system and will not produce a fully working image when run locally.

Using Prometheus as a Go Library
Remote Write
We are publishing our Remote Write protobuf independently at buf.build.

You can use that as a library:

go get buf.build/gen/go/prometheus/prometheus/protocolbuffers/go@latest
This is experimental.

Prometheus code base
In order to comply with go mod rules, Prometheus release number do not exactly match Go module releases.

For the Prometheus v3.y.z releases, we are publishing equivalent v0.3y.z tags. The y in v0.3y.z is always padded to two digits, with a leading zero if needed.

Therefore, a user that would want to use Prometheus v3.0.0 as a library could do:

go get github.com/prometheus/prometheus@v0.300.0
For the Prometheus v2.y.z releases, we published the equivalent v0.y.z tags.

Therefore, a user that would want to use Prometheus v2.35.0 as a library could do:

go get github.com/prometheus/prometheus@v0.35.0
This solution makes it clear that we might break our internal Go APIs between minor user-facing releases, as breaking changes are allowed in major version zero.

React UI Development
For more information on building, running, and developing on the React-based UI, see the React app's README.md.

More information
Godoc documentation is available via pkg.go.dev. Due to peculiarities of Go Modules, v3.y.z will be displayed as v0.3y.z (the y in v0.3y.z is always padded to two digits, with a leading zero if needed), while v2.y.z will be displayed as v0.y.z.
See the Community page for how to reach the Prometheus developers and users on various communication channels.
Contributing
Refer to CONTRIBUTING.md

License
Apache License 2.0, see LICENSE.

About
The Prometheus monitoring system and time series database.

prometheus.io/
Topics
monitoring time-series metrics alerting prometheus graphing hacktoberfest
Resources
Readme
License
Apache-2.0 license
Code of conduct
Code of conduct
Contributing
Contributing
Security policy
Security policy
Activity
Custom properties
Stars
61.5k stars
Watchers
1.1k watching
Forks
10k forks
Report repository
Releases 351
3.7.3 / 2025-10-29
Latest
last month

- 350 releases
  Packages
  No packages published
  Contributors
  1,067
  @fabxc
  @juliusv
  @beorn7
  @bboreham
  @dependabot[bot]
  @brian-brazil
  @codesome
  @krajorama
  @matttproud
  @bwplotka
  @gouthamve
  @simonpasquier
  @SuperQ
  @krasi-georgiev
- 1,053 contributors
  Languages
  Go
  86.1%

TypeScript
12.5%

Yacc
0.5%

Shell
0.2%

CSS
0.2%

SCSS
0.2%

Other
0.3%
Footer
Overview
What is Prometheus?
Prometheus is an open-source systems monitoring and alerting toolkit originally built at SoundCloud. Since its inception in 2012, many companies and organizations have adopted Prometheus, and the project has a very active developer and user community. It is now a standalone open source project and maintained independently of any company. To emphasize this, and to clarify the project's governance structure, Prometheus joined the Cloud Native Computing Foundation in 2016 as the second hosted project, after Kubernetes.

Prometheus collects and stores its metrics as time series data, i.e. metrics information is stored with the timestamp at which it was recorded, alongside optional key-value pairs called labels.

For more elaborate overviews of Prometheus, see the resources linked from the media section.

Features
Prometheus's main features are:

a multi-dimensional data model with time series data identified by metric name and key/value pairs
PromQL, a flexible query language to leverage this dimensionality
no reliance on distributed storage; single server nodes are autonomous
time series collection happens via a pull model over HTTP
pushing time series is supported via an intermediary gateway
targets are discovered via service discovery or static configuration
multiple modes of graphing and dashboarding support
What are metrics?
Metrics are numerical measurements in layperson terms. The term time series refers to the recording of changes over time. What users want to measure differs from application to application. For a web server, it could be request times; for a database, it could be the number of active connections or active queries, and so on.

Metrics play an important role in understanding why your application is working in a certain way. Let's assume you are running a web application and discover that it is slow. To learn what is happening with your application, you will need some information. For example, when the number of requests is high, the application may become slow. If you have the request count metric, you can determine the cause and increase the number of servers to handle the load.

Components
The Prometheus ecosystem consists of multiple components, many of which are optional:

the main Prometheus server which scrapes and stores time series data
client libraries for instrumenting application code
a push gateway for supporting short-lived jobs
special-purpose exporters for services like HAProxy, StatsD, Graphite, etc.
an alertmanager to handle alerts
various support tools
Most Prometheus components are written in Go, making them easy to build and deploy as static binaries.

Architecture
This diagram illustrates the architecture of Prometheus and some of its ecosystem components:

Prometheus architecture

Prometheus scrapes metrics from instrumented jobs, either directly or via an intermediary push gateway for short-lived jobs. It stores all scraped samples locally and runs rules over this data to either aggregate and record new time series from existing data or generate alerts. Grafana or other API consumers can be used to visualize the collected data.

When does it fit?
Prometheus works well for recording any purely numeric time series. It fits both machine-centric monitoring as well as monitoring of highly dynamic service-oriented architectures. In a world of microservices, its support for multi-dimensional data collection and querying is a particular strength.

Prometheus is designed for reliability, to be the system you go to during an outage to allow you to quickly diagnose problems. Each Prometheus server is standalone, not depending on network storage or other remote services. You can rely on it when other parts of your infrastructure are broken, and you do not need to setup extensive infrastructure to use it.

When does it not fit?
Prometheus values reliability. You can always view what statistics are available about your system, even under failure conditions. If you need 100% accuracy, such as for per-request billing, Prometheus is not a good choice as the collected data will likely not be detailed and complete enough. In such a case you would be best off using some other system to collect and analyze the data for billing, and Prometheus for the rest of your monitoring.
