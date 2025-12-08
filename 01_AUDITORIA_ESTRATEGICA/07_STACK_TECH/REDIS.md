Redis 8.0
What's new in Redis 8.0

Redis 8.0 introduces powerful new capabilities, including the beta release of the Vector Set data structure, designed for AI use cases such as semantic search and recommendation systems.

This release also delivers over 30 performance improvements, including:

Up to 87% faster command execution
Up to 18% faster replication
Additionally, the Redis Community Edition has been renamed to Redis Open Source, marking a shift toward a unified, modern distribution. This version offers the full power of Redis — no modules, no fragmentation — just Redis.

Below is a detailed breakdown of these updates.

New features 
Vector set [beta] 
The new Vector set data structure supports high-dimensional vector similarity search, which is ideal for AI use cases such as semantic search and recommendation systems. Vector set complements Redis’s existing vector search capabilities via the Query Engine and is currently available in beta. APIs and behaviors may change in future releases.

New hash commands 
Redis 8 builds on Redis 7.4’s introduction of field-level expiration in hashes and adds three new commands for working with hashes:

HGETEX: Fetch a hash field and optionally set an expiration
HSETEX: Set a hash field and optionally set an expiration
HGETDEL: Fetch and delete a hash field
These commands simplify common caching and session management usage patterns.

Improvements 
Redis Query Engine Improvements 
The Redis Query Engine allows users to use Redis as a document database, a vector database, a secondary index, and a search engine. With Redis Query Engine, users can define indexes for hash and JSON documents, and use a rich query language for vector search, full-text search, geospatial queries, and aggregations.

Use cases include:

Vector Search: Search based on semantic similarity using vector embeddings stored in JSON or hashes
Exact Matching: Lookups using filters, tags, and ranges
Full-Text Search: Supports stemming, synonyms, and fuzzy matching
The Redis Query Engine powers a wide range of applications, from AI retrieval-augmented generation (RAG) systems to full-featured search engines.

Access Control Improvements 
Access Control Lists (ACLs) have been updated to support the new data structures introduced in Redis 8. Existing ACL categories such as @read and @write now include commands for JSON, time series, VECTOR, and probabilistic data structures.

These updates allow for more precise control over which operations users can perform on each data structure.

Performance improvements 
Redis 8 delivers the largest performance leap in Redis history with over 30 optimizations, including:

Up to 87% lower command latency
35% memory savings for replica nodes
16x more query processing capacity with horizontal and vertical scaling
These improvements benefit both single-node and clustered deployments. More details are available in the Redis 8 GA blog post.

Changes 
Breaking changes 
ACL behavior 
Commands from included modules are now covered under standard categories (e.g., +@read, +@write). For example, a user with +@all -@write will no longer be able to execute JSON.SET as they could before. Explicit inclusion of new command categories is required to maintain access.

Redis Query Engine 
The following changes affect behavior and validation in the Redis Query Engine:

Enforces validation for LIMIT arguments (offset must be 0 if limit is 0).
Enforces parsing rules for FT.CURSOR READ and FT.ALIASADD.
Parentheses are now required for exponentiation precedence in APPLY expressions.
Invalid input now returns errors instead of empty results.
Default values revisited for reducers like AVG, COUNT, SUM, STDDEV, QUANTILE, and others.
Updates to scoring (BM25 is now the default instead of TF-IDF).
Improved handling of expired records, memory constraints, and malformed fields.
For a full list of the Redis Query Engine-related changes, see the release notes.

Other changes 
One Redis 
Over time, Redis introduced several modules to address new use cases such as search, vector similarity, time series analysis, and probabilistic modeling. While these modules extended Redis’s functionality, managing version compatibility and module installation introduced friction.

Redis Stack partially solved this by bundling modules together, but it also created fragmentation across the ecosystem.

Redis 8 merges Redis Stack and Redis Community Edition into a single unified distribution: Redis Open Source. All previously modular functionality is now built into the Redis Open Source package, eliminating the need to manage separate modules. You now get a single, consistent feature set across all deployments.
Redis 8.2
What's new in Redis 8.2

Redis 8.2 builds on the foundation of Redis 8.0 with significant performance and memory optimizations, enhanced streaming capabilities, and improved cluster management tools.

This release delivers major improvements across multiple areas:

Enhanced Redis Streams with new commands for better consumer group management
New bitmap operations for advanced bit manipulation
Advanced cluster monitoring with per-slot usage metrics
Optimized vector search with new compression algorithms
Enhanced keyspace notifications with new event types
More than 15 performance and resource utilization improvements
Below is a detailed breakdown of these updates.

Security improvements 
Redis 8.2 includes important security fixes:

CVE-2025-27151: Fixed potential stack overflow and RCE vulnerability in redis-check-aof.
CVE-2025-32023: Fixed out-of-bounds write vulnerability in HyperLogLog commands.
CVE-2025-48367: Improved connection handling to retry accepting connections even when errors occur.
New features 
Enhanced Redis Streams 
Redis 8.2 introduces powerful new commands that simplify consumer group management and stream lifecycle operations:

XDELEX: Delete entries from streams with advanced consumer group handling options.
XACKDEL: Acknowledge and delete stream entries in a single atomic operation.
These commands include KEEPREF, DELREF, and ACKED options that give you precise control over how consumer group references are handled during entry deletion. This simplifies common patterns where you need to clean up acknowledged entries while working with multiple consumer groups.

The XADD and XTRIM commands have also been extended with these same options, providing consistent behavior across all commands that remove stream entries.

Cluster monitoring improvements 
The new CLUSTER SLOT-STATS command provides detailed per-slot usage metrics including:

Key count per slot
CPU time consumption
Network ingress and egress
This enhanced visibility helps you optimize cluster performance and identify hotspots in your data distribution.

Vector search enhancements 
The VSIM command now supports the IN operator for filtering expressions, giving you more flexibility when performing vector similarity searches with complex filtering criteria.

Enhanced bitmap operations 
Redis 8.2 extends the BITOP command with new operators that provide more sophisticated bit manipulation capabilities:

DIFF: Perform bitwise difference operations between bitmaps.
DIFF1: Calculate the difference with optimized single-bit operations.
ANDOR: Combine AND and OR operations in a single command.
ONE: Specialized operation for single-bit scenarios.
These new operators enable more complex bitmap workflows and can simplify operations that previously required multiple commands.

Improved keyspace notifications 
Redis 8.2 introduces new keyspace notification event types that provide better visibility into data changes:

OVERWRITTEN: Triggered when a key's value is completely overwritten.
TYPE_CHANGED: Fired when a key's data type changes.
These events help you build more responsive applications by providing granular notifications about specific types of data modifications.

Improvements 
Redis 8.2 delivers substantial performance improvements across core operations.

Performance optimizations 
BITCOUNT: Enhanced with prefetching optimizations for faster bit counting operations.
SCAN: Optimized to perform expiration checks only on databases with volatile keys, reducing unnecessary overhead.
List operations: LREM, LPOS, and LINSERT benefit from cached string2ll results in quicklistCompare.
Sorted set operations: ZRANK and related commands use the same caching optimizations.
Key operations: COPY, RENAME, and RESTORE are optimized when TTL is used.
Client management: Reduced overhead in client cron operations to avoid blocking the main thread.
Vector operations: Improved RDB loading and RESTORE speed for vector sets by storing worst link information.
Memory efficiency improvements 
JSON data types: Memory footprint improvements through number inlining.
Memory tracking: Reduced overhead associated with tracking malloc's usable memory.
Expiry handling: Optimized expiry checks in scan callbacks.
Vector compression: Additional compression variants for the SVS-VAMANA vector index reduce memory usage.
Vector search performance 
Redis 8.2 introduces the SHARD_K_RATIO parameter for KNN vector queries in Redis clusters. This unstable feature allows you to favor network latency over accuracy, providing faster responses when exact precision isn't critical.

Enhanced metrics 
Redis 8.2 provides new metrics to help you monitor and troubleshoot your Redis instances.

Memory metrics 
used_memory_peak_time: Timestamp when used_memory_peak was reached
Replication metrics 
master_current_sync_attempts: Number of sync attempts since last disconnection
master_total_sync_attempts: Total number of sync attempts to master
master_link_up_since_seconds: Duration since the replication link was established
total_disconnect_time_sec: Cumulative time the replica has been disconnected
These metrics provide better visibility into replication health and help you identify patterns in connection stability.

Component versions 
Redis 8.2 continues the unified distribution approach introduced in Redis 8.0, delivering all functionality in a single Redis Open Source package without separate modules.

Redis 8.4
What's new in Redis 8.4 RC1

Redis 8.4 builds on the foundation of Redis 8.2 with significant enhancements to cluster operations, string manipulation, and stream processing capabilities.

This release delivers major improvements across multiple areas:

Atomic cluster slot migration for zero-downtime operations
Enhanced string operations with atomic compare-and-set functionality
Advanced stream processing with idle entry claiming
Hybrid search capabilities combining multiple ranking algorithms
High-performance SIMD optimizations for bit operations and vector processing
Improved JSON handling with better memory efficiency
Below is a detailed breakdown of these updates.

New features 
Atomic cluster operations 
Redis 8.4 introduces the CLUSTER MIGRATION command, which enables atomic slot migration between cluster nodes. This command ensures zero-downtime cluster operations by moving slots and their associated data in a single atomic operation, eliminating the brief unavailability window that previously occurred during slot migrations.

Enhanced string operations 
Redis 8.4 extends string manipulation capabilities with powerful new commands that enable atomic compare-and-set operations:

DELEX: Delete a key only if its value matches a specified condition.
DIGEST: Generate cryptographic digests of key values for integrity verification.
The SET command now supports atomic compare-and-set and compare-and-delete operations through new extensions, enabling you to implement lock-free data structures and optimistic concurrency control patterns.

Multi-key expiration management 
The new MSETEX command allows you to set multiple keys and update their expiration times in a single atomic operation. This simplifies batch operations where you need to maintain consistent TTL values across related keys.

Advanced stream processing 
Redis 8.4 enhances stream processing with the CLAIM min-idle-time option for XREADGROUP. This feature enables consumer groups to automatically claim and process both idle pending entries and new incoming entries in a single operation, simplifying consumer group management and improving processing efficiency.

Hybrid search capabilities 
The new FT.HYBRID command introduces hybrid queries that combine multiple ranking algorithms using Reciprocal Rank Fusion (RRF) and linear combination methods. This enables you to create sophisticated search experiences that leverage both semantic similarity and traditional text matching.

Enhanced AOF reliability 
Redis 8.4 introduces auto-repair options for corrupted AOF (Append Only File) tails during startup. The new aof-load-corrupt-tail-max-size configuration parameter allows Redis to automatically repair minor AOF corruption, improving system resilience and reducing manual intervention requirements.

Improvements 
Redis 8.4 delivers substantial performance improvements through advanced SIMD optimizations and enhanced algorithms.

Performance optimizations 
BITCOUNT: Enhanced with AVX2 and AVX512 popcount implementations for x86 architectures, plus Arm Neon SIMD vectorization for ARM processors.
HyperLogLog: Optimized with branchless comparisons and Arm Neon SIMD vectorization for improved cardinality estimation performance.
Vector operations: VADD and VSIM commands benefit from AVX2 and AVX512 dot product implementations for faster vector processing.
Command processing: New lookahead prefetching parses multiple commands in advance through a lookahead pipeline, reducing processing latency.
Memory efficiency improvements 
JSON data types: Improved memory footprint through homogeneous array optimization and short string inlining.
Lua integration: Enhanced JSON array handling with the new decode_array_with_array_mt configuration parameter for better memory utilization.
Search and indexing enhancements 
Redis 8.4 introduces several improvements to search functionality:

Default scoring: The new search-default-scorer parameter sets BM25STD as the default text and tag scorer, providing better relevance ranking out of the box.
OOM handling: The search-on-oom parameter controls query behavior during out-of-memory conditions, with options to ignore, fail, or return partial results.
Multi-threading: The search-io-threads parameter allows you to configure communication threads for cluster manager coordination, improving search performance in clustered environments.
Index updates: Search indexes now support updates during atomic slot migrations, maintaining search functionality during cluster operations.
Enhanced configuration 
Redis 8.4 introduces new configuration parameters that give you greater control over system behavior:

lookahead: Runtime-configurable lookahead depth for command prefetching (default: 16)
aof-load-corrupt-tail-max-size: Maximum corrupted tail size for automatic AOF repair
decode_array_with_array_mt: Controls how Lua handles empty JSON arrays
Component versions 
Redis 8.4 continues the unified distribution approach, delivering all functionality in a single Redis Open Source package without separate modules. This includes:

RedisTimeSeries: Enhanced with HELP and COMMAND DOCS support for time series commands
RedisBloom: Improved with HELP and COMMAND DOCS support for probabilistic commands
RediSearch: Advanced hybrid search capabilities and improved cluster coordination
Known limitations 
When using Redis 8.4, be aware of these current limitations:

Search commands (FT.SEARCH, FT.AGGREGATE, FT.CURSOR, FT.HYBRID) and time series commands (TS.MGET, TS.MRANGE, TS.MREVRANGE, TS.QUERYINDEX) may return partial results or duplicates during atomic slot migration.
FT.PROFILE, FT.EXPLAIN, and FT.EXPLAINCLI don't include FT.HYBRID options.
FT.HYBRID metrics aren't displayed in FT.INFO and INFO commands.
Several FT.HYBRID options (EXPLAINSCORE, SHARD_K_RATIO, YIELD_DISTANCE_AS, WITHCURSOR) are not yet available.
Post-filtering after the COMBINE step using FILTER is not currently supported.

Key new features
Vector Set data structure (beta): Designed for AI, this enables fast vector similarity search for applications like semantic search and recommendation systems.
Integrated data structures: Redis 8 integrates modules into the core, including TimeSeries, JSON, and several probabilistic data structures (Bloom, Cuckoo, T-Digest, etc.), simplifying their use.
New hash commands: Includes HGETEX, HSETEX, and HGETDEL for simpler caching and session management patterns.
Enhanced ACLs: Access control lists now include commands for new data structures like JSON, TimeSeries, and Vectors, with new categories like @search, @json, and @timeseries.
Improved Redis Query Engine: Offers significantly more query processing power, with support for both horizontal and vertical scaling.
New licensing: Redis 8 is available under the AGPLv3 license. 
Performance improvements
Latency reduction: Up to 87% lower command latency.
Replication: Up to 18% faster replication.
Memory savings: Up to 35% memory savings on replica nodes.
Throughput: Up to 16x more query processing capacity.
I/O threading: Increases throughput on multi-core systems. 

Redis 8 is now GA, loaded with new features and more than 30 performance improvements
May 01, 2025
11 minute read
Pieter Cailliau
Pieter Cailliau
Lior Kogan
Lior Kogan
Redis
Charlie Wang
We’re excited to announce the general availability release of Redis 8.

Redis 8 is the most performant and scalable version of Redis yet. It has over 30 performance improvements, including up to 87% faster commands, up to 2x more operations per second throughput, up to 18% faster replication, and delivery of up to 16x more query processing power with Redis Query Engine.

This release adds 8 more data structures, including vector set (beta), JSON, time series, and five probabilistic structures, including Bloom filter, cuckoo filter, count-min sketch, top-k, and t-digest (some previously available as separate Redis modules). These new data structures help you solve your current use cases better and build for the next generation of fast and real-time apps.

Additionally, we’ve changed the name of our free product from Redis Community Edition to Redis Open Source to reflect the addition of AGPLv3 as a licensing option.


One Redis
Over the years, we have created new Redis modules that help you build real-time apps for web, mobile, and GenAI faster. However, we’ve heard from many of you how it often becomes confusing figuring out how to get started with modules, especially with matching the right module version to the Redis version. The introduction of Redis Stack helped and saw significant adoption but also introduced fragmentation in the community.

Today, we’re combining our Redis Stack and community offerings into a single Redis Open Source distribution. All the modules are already included in this package. Going forward, Redis Open Source delivers the same feature set to you everywhere. When you use Redis Open Source, you know you’re always getting the latest and best of Redis with the full suite of capabilities that are available to the community.

These are some of the features and capabilities that come packaged in Redis 8 in Redis Open Source.

Vector set data structure [beta]
We are excited to announce vector set, a new data type for vector similarity search. Developed by Salvatore Sanfilippo, the original creator of Redis, vector set takes inspiration from sorted set, another one of Redis’s fundamental data types known for its efficiency in handling ordered collections. Vector set extends the concept of sorted set to allow the storage and querying of high-dimensional vector embeddings, enhancing Redis for AI use cases that involve semantic search and recommendation systems. Vector set complements the existing vector search capability in the Redis Query Engine.

The vector set data type is available in beta. We may change, or even break, the features and the API in future versions. We are open to your feedback as you try out this new data type whilst we work towards general availability.

JSON data structure
The JSON data structure improves how you solve for traditional Redis use cases. It also lets you manage sessions more easily, like by using arrays and objects to model hierarchical session data. In Redis 8, the JSON data structure lets you store JSON documents as keys in Redis. Redis provides commands to retrieve and manipulate documents using the JSONPath language for more granular and efficient access to specific elements. Redis also supports atomic updates so you can make modifications to parts of a JSON document without having to retrieve the entire document first.

Time series data structure
The time series data structure simplifies how you tackle use cases with fast changing timestamped data such as those from IoT sensors, system telemetry, stock prices, commodity prices, foreign exchange rates, and crypto prices. In Redis 8, it’s very fast to get and use time series data. This is because Redis uses very efficient compression algorithms to keep the data memory footprint low. In addition, compaction (downsampling) rules can be defined for efficient long-term storage.

Probabilistic data structures
Probabilistic data structures let you answer common questions about your data streams and large datasets much faster. The significant advantages given in terms of efficiency in memory usage and processing speed is a trade-off with absolute accuracy. In Redis 8, in addition to HyperLogLog, which allows estimating the cardinality of a set, there are now 5 more probabilistic data structures:

Bloom filter and Cuckoo filter—for checking if a given value has already appeared in a data stream
Count-min sketch—for estimating how many times a given value appeared in a data stream
Top-k—for finding the most frequent values in the data stream
t-digest—for querying which fraction of the values in the data stream are smaller/larger than a given value.
Redis Query Engine
The Redis Query Engine unlocks fast data access beyond a key lookup. With Redis 8 you can create a secondary index of data that resides in hashes and JSON data structures. Some of the most common ways to use the Redis Query Engine include for vector search, data queries that return exact matches by a criteria or tag, and search queries that return the best matches by keywords or semantic meaning. The query engine also supports features like stemming, synonym expansion, and fuzzy matching for more comprehensive search results. Vector embeddings that represent data points within hashes or JSON documents can also be stored so the query engine in Redis 8 can be leveraged for vector similarity search.

Access Control Lists (ACLs)
While Redis 8 is secure by default, Access Control Lists (ACLs) allow more fine-grained security control. With ACLs, you can define which users can connect, what commands they can perform, and which keys they can access. This helps you restrict unauthorized access and maintain data integrity in your Redis environment. In Redis 8, we introduce new ACL categories for the new data structures. Existing ACL categories such as @read and @write now include commands that support the newly included data structures.

New commands building on Redis 7.4
When you build on Redis 8, you also get all the new features and capabilities that came in Redis 7.4, including our introduction of hash field expiration. One of the most frequently requested feature (e.g., #13345, #13459, #13577), you can find 3 new hash commands in Redis 8:

HGETDEL – Get hash fields and delete them
HGETEX – Get hash fields and optionally set their expiration time
HSETEX – Set hash fields and optionally set their expiration time
AGPL is now a licensing option
Redis 8 is available in Redis Open Source under the open source AGPLv3 license in addition to the dual RSALv2 and SSPLv1 licenses we moved to last year. We heard from some customers that it is easier for them to operate under an OSI-approved license, so we’ve added that option. Read more here, or visit redis.io/legal/licenses/.

Significant performance improvements
Redis 8 introduces over 30 performance improvements for both single-core and multi-core environments, delivering the greatest leap in performance in a single new Redis version.

Based on anonymized statistics from our tens of thousands of existing customers and users, we’ve invested in what we’ve seen you use the most. That means for many of you, you will see improvements in performance that provide the greatest uplift and value in how you use Redis when upgrading to Redis 8.

Up to 87% reduction in command latency
We have reduced the latency per command in Redis 8 for a large set of commands compared to Redis 7.2.5. In our benchmark of 149 tests, 90 commands run faster with less latency. The p50 latency reduction ranges from 5.4% to 87.4%. The vast majority of apps built with Redis 8 will see significant performance improvements.

Redis 8.0 Blog Post Graph
More details are available on the 8.0-M02 blog post.

2x more ops per second throughput by enabling multithreading
Since Redis 6, we have supported I/O threads to handle client requests, including socket reads/writes and command parsing. However, the previous implementation does not fully capture the performance potential.

In Redis 8, we introduce our new I/O threading implementation. You can enable it by setting the io-threads configuration parameter. The default value is 1. When the parameter is set to 8 on a multi-core Intel CPU, we’ve measured up to 112% improvement in throughput. Exact throughput improvements will vary, contingent on the commands being executed.

Up to 35% less memory used for replication
In Redis 8, we are introducing a new replication mechanism. During replication, we initiate two replication streams simultaneously: one stream for transferring the primary node and the other for the stream of changes that happen in the interim. The second phase is no longer blocked waiting for the first phase to complete.

Redis 8.0 Blog Image
In our tests, we conducted a full synchronization of a 10 GB dataset with an additional stream of 26.84 million write operations that yields 25 GB of changes during the replication. With the new replication mechanism, the primary can handle write operations at a 7.5% higher average rate during replication. Replication also takes 18% less time and the peak replication buffer size on the primary node is 35% lower.

More details are available on the 8.0-M03 blog post.

Up to 16x more query processing power with horizontal & vertical scaling
Redis 8 comes with a Redis Query Engine that can scale in two new ways that were previously exclusive to Redis Cloud and Redis Software. The first way enables querying in clustered databases, allowing you to manage very large data sets with indices and support for higher throughput of reads and writes by scaling out to more Redis processes. The second way allows you to add more processing power to scale your query throughput vertically, unlocking up to 16 times more throughput than before.

When both ways to scale are enabled, Redis 8 is the fastest vector database on the market, and you have access to it for free through Redis Open Source. We demonstrate this scale and how you can perform vector search queries at real time on 1 billion 768-dimensional vector embeddings at high precision.

Redis 8.0 Chart
At a billion-vector scale, with real-time indexing, Redis 8 can sustain 66,000 vector insertions per second for an indexing configuration that allows precision of at least 95%. For indexing configurations that result in lower precisions, Redis 8 can sustain higher ingestion rates of 160,000 vector insertions per second. Throughput can be increased further by using more servers. For high precision queries, we can see that larger HNSW indices improves the search quality at the expense of latency. We reach 90% precision with a median latency including RTT of 200ms, and 95% precision with a median latency including RTT of 1.3 seconds for the top 100 nearest neighbors, while executing 50 search queries concurrently.

Building on Redis 8
Open source client libraries
Redis 8 is easy to start building your app on and is fully supported by the most performant and reliable open source client libraries that you are using today. To learn more, please reference our documentation for quick start guides for your favorite programming languages:

Jedis, for Java synchronous programming
Lettuce, for Java asynchronous programming
go-redis, for Golang users
node-redis, the reference library for Node.js
NRedisStack, the C# library that offers the stability of StackExchange.Redis and supports for new data structures in Redis 8
redis-py, for the Python programming language
Object mapping libraries
If you want to map your data with object mapping techniques, the Redis OM client libraries are available to help you. They will help you model your objects, add schema validation, and store them in Redis 8.

GenAI use cases
For the GenAI apps and use cases you’re building, we make it easier by offering Redis vector library (RedisVL) together with Redis 8 as a simple yet powerful solution to work with vectors. With easy integrations to LLMs for your AI apps or to perform semantic search, RedisVL includes many capabilities that make new GenAI features fast and possible, such as semantic caching, vectorizers, and semantic routing.

Developer environment
Redis Insight and Redis for VS Code are visual tools that let you explore data, design, develop, and optimize your applications while also serving as a platform for Redis education and onboarding. Redis Insight specifically integrates Redis Copilot, a natural language AI assistant that improves the experience when working with data and commands. Redis 8 is fully compatible with Redis Insight and Redis for VS Code.

Upgrading to Redis 8
If you are running on an older version such as Redis 6 and Redis 7, we encourage you to upgrade to Redis 8 to take advantage of new performance improvements and capabilities. We’re committed to keeping Redis 8 in Redis Open Source free so you can uplevel how you solve for use cases including caching, session management, leaderboards, and matchmaking.

More information on how to upgrade to Redis 8 is available here.

If you are a current user of Redis Stack, currently supported features and capabilities that were exclusive to Redis Stack can be found on Redis Open Source. We also encourage you to upgrade to Redis Open Source as we will stop releasing patches for Redis Stack 6.2, 7.2, and 7.4 on September 15, 2025.

New features found in Redis Open Source will be fully coming to our other offerings later this year.

Getting started with Redis 8 today
Redis 8 is generally available on Redis Open Source and can be installed through the following channels as they become available in the coming days:
Blog

Redis 8 brings vector sets and is now in preview on Redis Cloud Essentials
July 22, 2025
3 minute read
Bosmat Tuvel
Bosmat Tuvel
Noam Stern
Noam Stern
Redis 8 is now available for preview on Redis Cloud Essentials. Starting today, you can create a Redis 8 database and experience the power of our most performant Redis version yet.

Whether you're building AI agents, managing sessions, caching, or streaming events, Redis 8 delivers everything you need in one powerful release. The new vector sets data structure (beta) joins those previously part of Redis Stack—including JSON, time series, and five probabilistic data structures: bloom filter, cuckoo filter, count-min sketch, top-k, and t-digest. Plus, you get over 30 performance improvements and a Redis Query Engine with up to 16x more processing power to make your apps faster than ever.

What’s new in Redis 8
Redis 8 is our biggest leap forward yet and is faster, more capable, and built for AI agents & apps with native vector support. This release focuses on what matters most: performance, flexibility, and making your life as a developer easier.

Key Highlights
Vector sets (beta): A new data structure for AI workloads, created by Salvatore Sanfilippo, Redis's original creator. Vector sets enable native, fast vector similarity search using the HNSW (Hierarchical Navigable Small World) algorithm. By extending the sorted set data structure to store high-dimensional vector embeddings, you get simple commands to add and retrieve vectors that are most similar to another vector.

Think of it this way: You're building a music recommendation system where each song is a vector encoding its characteristics—tempo, key, genre, language, and listener preferences. With vector sets, you store these embeddings and instantly retrieve the most similar songs to a user's current favorite. The result? Highly personalized, vibe-based discovery that goes beyond basic genre matching.

Vector sets complement the Redis Query Engine, which continues to be the go-to for real-time full-text, numerical, vector, and hybrid queries over massive, scalable datasets.

Learn more about vector sets in our documentation and in a YouTube video by Salvatore Sanfilippo, the creator of Redis.

Massive performance gains: Redis 8 includes 30+ performance enhancements across core operations, memory management, and internal optimizations. Many Redis Cloud customers will see meaningful performance gains by simply choosing Redis 8.

Check out some of these improvements from our benchmarking comparing Redis 8 to Redis 7.4 on Redis Cloud.

Redis 8 brings Vector Sets
You see a latency reduction of up to 78% for bitmap, up to 66% for set, and up to 58% for sorted set command groups.

This is the largest performance boost in any Redis release—ever.

Smarter resource management: Redis 8 introduces int8 vector encoding in the Redis Query Engine so you can store and access high-dimensional vectors using 8-bit integer representation. Translation: lower infrastructure costs and better scalability.

Granular data lifecycle control: Redis 8 introduces new commands for hash field expiration so you can apply time-to-live (TTL) to individual fields within a hash.

The new commands introduced are:

HGETEX – retrieve the value of one or more fields of a given hash key and set their expiration time or time-to-live (TTL).
HSETEX – set the value of one or more fields of a given hash key, and optionally set their expiration time or time-to-live (TTL).
HGETDEL – Get and delete the value of one or more fields of a given hash key.
Ready to get started?
Redis Cloud delivers Redis 8 as a service with no provisioning headaches, no configuration puzzles, and no additional performance tuning required.

Redis 8.4, the fastest, simplest, and most powerful Redis yet–now GA in Redis Open Source
November 25, 2025
10 minute read
Lior Kogan
Lior Kogan
Adriano Amaral
Adriano Amaral
Redis 8.4 continues our mission to make Redis faster, simpler, and more powerful, with major upgrades to performance and the dev experience, as well as new hybrid search capabilities that make building AI apps faster and easier.

Redis 8.4 introduces hybrid search—combining full-text and vector search—for more flexible and intelligent querying, while bringing substantial performance and memory utilization improvements. It also makes Redis easier and more reliable to operate at scale through updates to Redis streams logic and a series of new atomic operations that simplify building with Redis.

Introducing hybrid search
Every intelligent agent, from retrieval-augmented generation (RAG) systems to autonomous assistants, depends on the quality of its context. The real challenge isn’t finding data, but understanding it by distinguishing between what’s relevant now, what’s stored in its memory, and what provides the reasoning backbone for a decision. Agents need to search their “memories” semantically, not just recall them literally, and combine symbolic reasoning with semantic similarity. Redis has always been at the center of real-time decisioning and contextual retrieval, with devs already using its hybrid policy to pre-filter candidates and narrow the search space for vectors at blazing speed.

However, previous methods for merging full-text and vector similarity were complex, required multiple steps, and traded precision for performance. This ultimately led to increased latency and a fragmented retrieval experience.

Redis 8.4 addresses these challenges with the new FT.HYBRID command, a unified in-engine hybrid retrieval API. This command merges full-text and vector similarity results through score fusion (using Reciprocal Rank Fusion or Linear Combination) to deliver a single ranked list that captures both meaning and match, all within one query execution. This means no trade-off between precision and performance, and no external score merging. FT.HYBRID allows you to express contextual intent directly in the query, easily prioritizing recent memories, regionalizing context with GEO and GEOSHAPE, and mixing semantic, fuzzy, and exact matches, providing a consistent, fast, and semantically aware retrieval pipeline ready for the next generation of intelligent agents.

The fastest, most resource-efficient Redis yet
With Redis 8.4, we continue to deliver on our commitment to continuous performance improvement. The chart below shows the steady increase in Redis throughput (operations per second) for a typical caching workload across successive releases of Redis.

Redis in Redis Open Source - throughput on 4 cores over versions
10% writes and 90% reads with 1 KB string values.

8.4 continues on this trend, offering an over 30% throughput increase for caching use cases (90% `GET`, 10% `SET`) compared to Redis 8.2.

With the introduction of multi-threaded I/O handling for distributed queries, the Redis Query Engine achieves significant performance gains under high-load. In scenarios where large result sets are retrieved from multiple shards, concurrent I/O threads now process shard responses in parallel rather than sequentially. This eliminates the previous single-thread bottleneck that could saturate CPU usage and limit throughput, creating a long-waiting queue in large clusters. As a result, the system can fully utilize available compute resources across shards, reducing contention and enabling smoother query fan-out and result aggregation.

Benchmarking shows that these changes deliver substantial end-to-end improvements for both FT.SEARCH and FT.AGGREGATE operations, and of course the newly FT.HYBRID benefits from this as well. For large-scale search workloads, parallel I/O processing yields up to a 4.7x increase in throughput and lowers query latency at the same rate. Aggregate operations, which involve additional post-processing, also benefit, achieving around a 1.4× throughput improvement while reducing response times under concurrent load. In both cases, multi-threaded I/O unlocks more headroom for worker threads to perform the actual search or aggregation logic, ensuring a more balanced utilization of cluster resources and faster responses across search and vector workloads

Impact of parallel I/O on RediSearch Query Performance (5 parallel I/O threads)
We've also enhanced memory allocation management for query execution, making the Redis Query Engine more robust. Devs can now choose the expected behavior in out-of-memory (OOM) events. A new configuration search-on-oom can now be defined, allowing full manageability for the memory consumed and how the engine should behave.

We also continue to invest in reducing the memory consumption of the JSON data type. In Redis 8.2, we introduced a substantial reduction by inlining numeric values. In Redis 8.4, we also inline short strings (up to 7 bytes). For example, a JSON array with 500 key-value elements, where all keys and values are short strings, would now require 37% less memory:

Map key and values	Redis 8.2 memory	Redis 8.4 memory	Benefit
Short string (up to 7 bytes)	64,512 bytes	40,624 bytes	37% less memory
But more importantly, we now store homogeneous JSON numeric arrays much more efficiently. Previous to 8.4, for each element in a JSON array, we stored the element’s type and the element’s value. Now, when the array is homogeneous (or in other words—when all the array elements are of the same data type), we store the elements data type just once for the whole array. For an array of numeric values, Redis now automatically determines the most efficient element type (I8, U8, I16, U16, I32, U32, I64, I64, BF16, FP16, FP32, or FP64) that ensures that all the values are within range and can be stored with no loss of accuracy. For example, a JSON array with 1 million numeric values would now require between 50% to 92% less memory:

Array elements	Redis 8.2 memory	Redis 8.4 memory	Benefit
signed integers [-2^7 .. 2^7) or unsigned integers [0 .. 2^8)	8.42 MB	1.14 MB	87% less memory
signed integers [-2^15 .. 2^15) or unsigned integers [0 .. 2^16)	8.43 MB	2.19 MB	74% less memory
signed integers [-2^31 .. 2^31) or unsigned integers [0 .. 2^32)	8.46 MB	4.26 MB	50% less memory
signed integers [-2^63 .. 2^63) or unsigned integers [0 .. 2^64)	24.46 MB	8.43 MB	66% less memory
BF16-representable FP values	24.43 MB	2.16 MB	92% less memory
FP16-representable FP values	24.43 MB	2.19 MB	92% less memory
FP32-representable FP values	24.46 MB	4.26 MB	83% less memory
FP64-representable FP values	24.46 MB	8.43 MB	66% less memory
Simplified streams processing consumes both idle pending and incoming messages in one command
In Redis streams, pending messages refer to messages that have been delivered to a consumer in a consumer group but not yet acknowledged. Pending messages are kept until they are acknowledged or deleted. When a message is pending for a long time, it usually means something went wrong. Either the client that consumed this message crashed (while handling the message or before acknowledging it) or because this message is “problematic” - e.g., causing a deadlock or taking a very long time to handle. It can also be because of communications problems between the consuming client and Redis.

Under a normal flow, apps expect each message to be acknowledged within a given time since it was consumed. If not acknowledged, we call it an idle pending message, and can try to deliver it again.

Since stream message processing can go wrong, a simple and robust recovery logic is required. That’s why consumers need to both (1) monitor the pending messages list and claim idle pending messages and handle them, and (2) handle new incoming entries.

Before Redis 8.4, clients had to implement a complex logic to consume both idle pending and incoming messages.

With Redis 8.4 we introduce a simple yet powerful extension to the XREADGROUP command, that allows clients to consume both idle pending and incoming messages in a single command.

New atomic compare-and-set and compare-and-delete commands for string keys
Compare-and-set (AKA check-and-set, compare-and-swap) and compare-and-delete are atomic methods which are often used for implementing single-key optimistic concurrency control. With compare-and-set, a client can:

Fetch a value from the server, and keep it as “old value” on the app side.
Manipulate the local copy of the value.
Compare-and-set: Apply the local changes to the server, but only if the server’s value hasn’t changed by another client (i.e., the value on the server is still equal to the old value).
Suppose you have a Product:Description string key, and you want to allow users to edit the description (e.g., via a web form). Because each product description is rarely edited, you may want to use optimistic concurrency control. In simpler terms, you want to set the new value only if it hasn’t changed by another client since it was fetched.

In previous Redis versions, to execute step 3 atomically, you’d have to implement a custom Lua script.

Starting with Redis 8.4, clients can use a single command (SET with the new IFEQ/IFNE/IFDEQ/IFDNE options) to update a string key only if its value hasn’t changed by another client since it was fetched. This is much simpler and faster. Similarly, we introduced a single command, XDELEX, for compare-and-delete: Atomically deleting a string key if its value hasn't changed since it was fetched.

New command to atomically set multiple string keys and update their expiration
Setting multiple keys, and optionally setting a common expiration, is a common use case. Often, it is also required to set the values and expiration only if all the specified keys already exist, or alternatively, only if none of the specified keys exist.

Before Redis 8.4, a custom Lua script was required to support this common use case.

Redis 8.4 introduces a simpler and faster approach. A new single command, MSETEX, can now be used to conditionally set or update the values and the expiration of multiple string keys.

Simpler clustering with Atomic Slot Migration
A Redis Cluster is a distributed setup of Redis designed to achieve high-availability, scalability, and fault tolerance. Instead of running a single Redis instance, Redis Cluster connects multiple Redis nodes together so that data and traffic can be spread across them. Redis Cluster uses 16,384 hash slots to automatically split and distribute data across different nodes. Each node in the cluster holds a subset of the hash slots. This allows Redis to handle much larger datasets than a single machine could.

There are two main scenarios where the mapping between slots and nodes needs to change, and that’s when keys must be migrated between nodes:

Rebalancing the cluster: After you add a new node, the cluster needs to move some hash slots (and the keys inside them) to the new node so the data is spread more evenly. Similarly, before you remove a node, its slots need to be reassigned to other nodes.
Handling overloaded nodes: Sometimes, due to key content and access patterns, a specific slot or node can require more resources than others. It could be more memory, more processing power, more operations per second, or more network throughput. When a node is overloaded, you may rebalance its slots across nodes for better performance and resource utilization. This requires migrating slots from overloaded nodes to less loaded ones.
Previously, slots were migrated in a non-atomic way. During a slot migration, keys were moved one by one to the destination node and then deleted from the source node. This led to several potential problems during the migration process:

Redirects and client complexity: While a slot is being migrated, some of the keys may have already been moved, while others haven’t. If a client is trying to access a key that was already moved, it will get an -ASK reply and it will have to retry fetching the key from the destination node. This increased the complexity and the network latency. It also breaks naive pipelines.
Multi-key operations become unreliable during resharding: In a multi-key command (e.g., MGET key1, key2), if some of the keys were already moved, the client will get a TRYAGAIN reply. The client can’t complete this command until the whole slot is migrated.
Failures during slot migration may lead to problematic states: When some of the keys are moved, but Redis fails to remove the additional keys (e.g., due to limited available memory on the destination node), Redis is left in a problematic state that needs to be resolved manually, and often leads to data loss.
Replication issues: Replicas don’t always know a slot was migrating, so they could reply as if a key was simply deleted instead of issuing an -ASK redirect.
Performance: Key-by-key migration is slow. In the legacy approach, keys are moved effectively one by one, which is inherently slow because of the extra lookups and network round-trips.
Redis 8.4 introduces Atomic Slot Migration (ASM) to solve all these operation problems. ASM is similar to full sync replication at the slot level. With ASM, the complete slot’s content is replicated to the destination node, plus a live delta (like the replication backlog). Only upon completion of the replication, Redis performs a single atomic handoff of ownership. Clients keep talking to the source during the copy and don’t experience any of the problems described above mid-migration. Thus, drastically increasing the manageability of operating Redis Open Source at scale.
Redis announces general availability of Google Cloud Spanner support in Redis Data Integration
October 22, 2025
2 minute read
mike moss
Mike Moss
Redis, the real-time data platform, has announced the general availability of Google Cloud Spanner support for Redis Data Integration (RDI) as a self-managed deployment, in addition to Redis Cloud on GCP deployments. This new capability strengthens the Redis and Google Cloud partnership by helping joint customers improve performance, reduce infrastructure costs, and accelerate innovation.

Google Cloud Spanner is a fully managed, distributed relational database that delivers strong consistency across regions with horizontal scalability. It's become a cornerstone of global cloud architectures for retailers, financial institutions, and other enterprises requiring high reliability and availability.

Redis Data Integration allows Redis to stay continuously synchronized with enterprise data sources, enabling Redis to serve as a real-time, in-memory cache that's always current. By connecting Redis with Spanner, customers can offload reads to Redis, making sure sub-millisecond response times while reducing the cost of reads from Spanner.

“Enterprises building modern apps on Google Cloud need the best of both worlds: The reliability of Spanner and the performance of Redis,” said Spencer Tuttle, Chief Revenue Officer at Redis. “With Redis Data Integration for Spanner, customers can achieve speed at scale, reduce their total cost of ownership, and accelerate time to market. This milestone underscores our commitment to partnering with Google Cloud to make our customers successful.”

The announcement follows strong demand from enterprise customers who sought a production-ready solution to pair Redis with Spanner.

“Google Cloud Spanner continues to be a preferred choice for enterprises building mission-critical apps,” said Rayn Veerubhotla, Managing Director, Partner Engineering at Google Cloud. “By integrating Redis Data Integration with Spanner, customers can unlock new levels of performance and cost efficiency, while benefiting from the joint innovation of Redis and Google Cloud.”

With Spanner support now generally available in Redis Data Integration, enterprises can modernize their cloud architectures with a solution that's cost-efficient, globally scalable, and designed for low latency, even under the most demanding workloads.
Accelerating secure open banking with Infosys and Redis Cloud
November 25, 2025
4 minute read
mike moss
Mike Moss
Redis
Divyanshu Tiwari
Tokenization: The engine of secure financial innovation
In the modern financial landscape, data security and real-time responsiveness aren’t optional, they’re fundamental. Tokenization has emerged as the foundation for secure digital transformation, replacing sensitive data with unique tokens that preserve functionality while eliminating exposure risk. It’s the trust layer that powers Open Banking, enabling banks, fintechs, and third parties to exchange data securely and instantly.

“Tokenization is no longer just a compliance measure, it’s the trust layer of modern finance,” said Divyanshu Tiwari, Head Cloud Sales Financial Services. Americas, Infosys. “By combining Infosys’s deep financial domain expertise with Redis’s real-time data platform, we’re enabling banks to deliver the sub-ms performance that Open Banking demands while maintaining enterprise-grade security.

Why tokenization powers open banking

Open Banking depends on secure, regulated data sharing between financial institutions and trusted third parties. Tokenization makes this possible by ensuring that sensitive details, like account numbers or payment credentials, are protected. In Open Banking, tokenization covers both data tokenization (protecting financial data) and access tokenization (securing API access)

Protects privacy – Tokens replace raw financial data in every exchange.
Secures payments – Supports Account-to-Account (A2A) and Variable Recurring Payments (VRPs).
Prevents fraud – Dynamic, time-limited tokens eliminate the risk of reuse.
Ensures compliance – Aligns with PSD2, GDPR, PCI DSS, and global Open Banking mandates.
“Redis enables financial institutions to meet regulatory and performance demands simultaneously,” said Mike Moss, SVP Global Partner Sales. “Our cloud platform delivers sub-millisecond response times for token validation and session management, ensuring customer experience and regulatory adherence work hand in hand.

Redis Cloud: The performance layer for enterprise tokenization

While specialized tokenization vaults handle secure token generation and storage, Redis Cloud provides the real-time performance layer that makes enterprise-scale Open Banking possible. In partnership with certified tokenization providers, Redis accelerates every aspect of the token lifecycle, from validation to session management to fraud detection.

1. High-speed token validation cachingRedis's in-memory architecture caches token validation results, reducing latency to sub-millisecond response times. In high-volume payment scenarios, this caching layer handles most validation requests, dramatically reducing load on primary tokenization services while maintaining security.

2. Real-time session & authentication managementRedis manages OAuth tokens, user sessions, and consent permissions at scale, supporting PSD2 Strong Customer Authentication (SCA) requirements. With automatic TTL-based expiration and secure in-memory storage, Redis ensures authentication flows remain both fast and compliant.

3. API performance optimizationRedis accelerates Open Banking API responses by caching frequently accessed data, reducing database queries, and managing connection pooling. This architectural approach enables banks to handle peak transaction volumes while maintaining consistent sub-ms API response times.

4. Multi-cloud integration & scalabilityRedis Cloud integrates seamlessly with tokenization services across AWS, GCP, and Azure, providing a consistent performance layer regardless of underlying infrastructure. Active-Active geo-distribution ensures global availability for international banking operations.

5. Real-time monitoring & observabilityRedis provides instant visibility into token validation latency, cache hit rates, and system health. Combined with Redis Pub/Sub, security teams receive instant alerts on anomalous activity, enabling proactive fraud prevention across the Open Banking ecosystem. 

Real impact across financial lines of business
Payments – Accelerating Pay-by-Bank, VRP, and real-time settlements with sub-ms response times. .
Wealth management – Enabling instant aggregation of multi-bank data for personalized insights while maintaining security.
Lending – Reducing loan approval times using verified, tokenized financial data.
Treasury and cash Management – Delivering real-time liquidity views and secure API-based payment initiation.
Digital Banking – Enabling faster innovation through secure API ecosystems and fintech integrations.
Risk & Compliance – Enabling real-time fraud monitoring and compliance reporting.
A partnership built for the future
Together, Infosys and Redis are redefining how financial institutions secure data, comply with regulation, and deliver exceptional real-time customer experiences.

“As banks modernize, the pressure to move fast without sacrificing trust is enormous,” said Divyanshu Tiwari. “Our joint solution gives them both the agility to innovate and the confidence to scale securely.”

Mike Moss reinforced the joint vision: “Redis and Infosys are helping global banks unlock Open Banking at enterprise scale. By combining Infosys’s financial services expertise with Redis’s proven real-time performance, we’re enabling institutions to deliver the experiences customers demand, while maintaining the trust regulators require.”

The secure path to open banking
Open Banking is transforming financial services, but its success depends on trust, speed, and security. The right architecture makes this transformation both safe and scalable.

The partnership between Infosys and Redis delivers a pre-validated, high-performance solution designed for today’s regulatory and operational realities. By uniting Infosys’s financial services and compliance expertise with Redis Cloud’s real-time speed, scalability, and resilience, banks can:

Achieve regulatory compliance seamlessly.
Accelerate innovation through secure, API-driven ecosystems.
Protect customer trust by combining certified tokenization security with Redis’s performance optimization.
Deliver sub-millisecond experiences across every digital touchpoint.
Ready to accelerate your Open Banking journey with a secure, real-time tokenization solution? Join Redis and AWS Wednesday, December 3rd (10AM PST) for an exclusive Financial Services Roundtable at AWS re:Invent to learn how leading institutions are moving from legacy to real-time, cloud-native architectures, without sacrificing consistency or control. Reserve your seat now. Space is limited.

About Infosys Infosys is a global leader in next-generation digital services and consulting, helping financial institutions across 50+ countries navigate their digital transformation journey.

About Redis Redis is the world’s most loved in-memory database and real-time data platform, trusted by global enterprises for performance, scalability, and security in mission-critical workloads.
Revamping context-oriented retrieval with hybrid search in Redis 8.4
November 17, 2025
4 minute read
Adriano Amaral
Adriano Amaral
Rini Vasan
Rini Vasan
Feeding the agent: Building context-aware intelligence
Intelligent agents live or die by the quality of their context. The challenge isn’t just finding data, but understanding it: distinguishing what’s relevant now, what forms long-term memory, and what underpins reasoning. Agents must combine symbolic precision (“what was said”) with semantic understanding (“what it meant”) — and do so in real time, without latency or complex post-processing.

Redis has long powered real-time decisioning and contextual retrieval. Its hybrid search already lets developers combine text, tag, and numeric filters to focus vector similarity on what truly matters.

Now, the Redis Query Engine introduces `FT.HYBRID`, a unified in-engine API that fuses full-text and vector results through score fusion, returning one ranked list that balances meaning and match instantly and at scale.

No trade-offs. No post-processing. Just fast, context-aware intelligence, built in Redis.

Why hybrid retrieval matters
Recent research reinforces why hybrid retrieval matters for RAG pipelines and intelligent agents. Studies from Anthropic (2025) and Apple ML Research (2024) show that context retrieval quality alone can shift accuracy by more than 10 percentage points, while hybrid retrieval (text + vector) reduces context failure rates by up to 49% compared to single-mode retrieval.

In hybrid RAG systems such as Blended RAG (2024) and HyPA-RAG (2024), integrating keyword and vector searches improved retrieval recall by 3–3.5× and raised end-to-end answer accuracy by 11–15% on complex reasoning tasks.

These results confirm what developers already observe in production: when retrieval joins lexical precision with semantic understanding, large language models deliver more faithful, grounded, and explainable responses — all without slowing down the query path.

Hybrid search: In action
Redis Query Engine has long supported hybrid-style retrieval via a hybrid policy that constrains the candidate set for vector search using the text/metadata selectors from the same query. In practice, the policy determines how candidates are gathered (e.g., intersecting posting lists with vector neighborhoods or batching strategies) before the fusion step. This keeps latency low while improving precision on large corpora.

The new FT.HYBRID API takes this concept a step further.

Instead of relying solely on pre-filters or post-processing with aggregation pipelines, Redis 8.4 introduces native score fusion combining full-text relevance and vector similarity within a single command execution plan. As simple as:

FT.HYBRID idx:products
  SEARCH "comfortable running shoes @brand:{brandA|brandB}"
  VSIM @product_embedding $vector
  PARAMS 2 vector "AQID...BCDE"
Copied!
This means you can now retrieve, filter, and rank results across modalities in one cohesive operation, with consistent normalization and configurable scoring strategies like Reciprocal Rank Fusion (RRF) and Linear Combination.

The foundation for hybrid retrieval was already in place. This release unifies it, simplifies it, and supercharges it.

Context-oriented retrieval with the new FT.HYBRID
When building AI agents, not all memories are created equal. Some facts age quickly, others depend on geography, and many live in the gray space between exact keywords and semantic meaning. Redis Query Engine’s new FT.HYBRID command was designed to handle this full spectrum, allowing you to express contextual intent directly in the query, use and re-use the same structure in your agent framework.

Prioritizing recent memories
When an agent retrieves prior interactions or documents, recency often outweighs raw similarity. With FT.HYBRID, you can easily emphasize freshness by combining time filters with vector relevance surfacing semantically similar but recent events first.

FT.HYBRID idx:memory
  SEARCH "activities in Lisbon @type:{conversation} @timestamp:[2025-10-01 +inf]"
  VSIM @embedding $query_embedding KNN 4 K 50 EF_RUNTIME 100
  COMBINE LINEAR 4 ALPHA 0.5 BETA 0.5
  SORTBY 2 @timestamp DESC
  LOAD 3 title summary timestamp
  PARAMS 2 $query_embedding "AQID...XYZ"
Copied!
This query fuses BM25 text relevance with vector similarity, then sorts by timestamp giving the agent recent and semantically relevant memories first.

Regionalizing context with GEO and GEOSHAPE
Decision-making agents often operate within a spatial context. Think of a logistics optimizer, travel assistant, or local recommender. FT.HYBRID allows you to filter or rank by geographic proximity while still considering semantic meaning and metadata.

FT.HYBRID idx:places
  SEARCH "@category:{coffee|coworking} wifi outdoor"
  VSIM @embedding $vector
  COMBINE RRF
  APPLY "@distance / 1000" AS distance_km
  FILTER "@geoshape:[-122.33 47.60 5km]"   # Seattle region
  SORTBY 2 distance_km ASC
  LOAD 4 name address rating distance_km
  PARAMS 2 $vector "AQID...BCDE"
Copied!
The agent now retrieves “nearby” contexts ranking Seattle cafés by both semantic similarity (“wifi outdoor”) and proximity, using reciprocal rank fusion for precision.

Mixing semantic, fuzzy, and exact matches
Sometimes, you want an agent to understand that “AI workshop” and “machine learning session” are similar, but also to prioritize exact keyword hits when available. FT.HYBRID makes this natural with optional (~) and fuzzy (%) operators combined with vector matching.

FT.HYBRID idx:events
  SEARCH "(~@topic:(AI|LLM|vector) @description:(%machine% %learning%))"
  VSIM @session_embedding $vector KNN 4 K 20 EF_RUNTIME 80
  COMBINE RRF 4 WINDOW 30 CONSTANT 2.0
  GROUPBY 1 @organizer REDUCE COUNT 0
  SORTBY 2 @__score DESC
  LOAD 3 title date organizer
  PARAMS 2 $vector "AQID...MNO"
Copied!
Here, Redis fuses fuzzy keyword logic with semantic closeness producing rich, nuanced retrieval for dynamic or user-generated text.

Why this matters for agents
These examples show how FT.HYBRID evolves Redis from a fast search engine into a context engine that can reason over time, place, and meaning simultaneously.

By bringing full-text, vector, and metadata search under a single API with tunable scoring fusion, Redis gives developers the language to express how agents should think, not just what to match.

Context is no longer assembled; it is retrieved. The quality of your agent’s reasoning now starts with the quality of its hybrid search.

Try it yourself
The new Hybrid search API is available starting in Redis 8.4. Locally with Redis.

docker run -p 6379:6379 redis:8.4
Copied!
Once you have Redis running, create an index and start building your own hybrid retrieval workflows.
Redis partners with Fierce Software to power federal & defense innovation
November 17, 2025
2 minute read
mike moss
Mike Moss
Redis is proud to announce a new partnership with Fierce Software, officially joining their ecosystem of industry-leading technology partners. This collaboration expands Redis’ reach into the Federal, Defense, and System Integrator markets – empowering organizations across the public sector to harness real-time data for faster innovation, enhanced operational efficiency, and mission success.

Empowering the public sector with real-time data
Redis is a powerful in-memory data and AI platform delivering unmatched speed, scalability, and reliability for modern applications. With Redis, organizations can rapidly implement solutions that span vector databases, caching, NoSQL data stores, and custom configurations—in any environment. Redis enables teams to seamlessly scale from experimentation to production-ready AI and data-intensive applications, whether in the cloud or on-prem.

Fierce Software’s deep expertise in public sector IT and strong relationships across government and defense communities make them an ideal partner in bringing Redis technology to mission-critical environments. Together, we will:

Expand the availability of Redis Enterprise and Redis Cloud to a broader network of federal and defense clients.
Accelerate digital transformation initiatives across public sector environments.
Empower system integrators to build modern, high-performance, AI-enabled applications.
Partnership built on innovation and trust
“We’re always seeking technologies that help our customers innovate faster and operate smarter,” said Eric Updegrove, General Manager of Fierce Software. “Redis delivers unmatched performance and flexibility for data-driven applications, expanding the tools our customers can rely on to power mission success through real-time insights and AI-driven solutions.”

“We’re excited to partner with Fierce to deliver a powerful combination of real-time data and mission-critical public sector expertise,” said Mike Moss, SVP Worldwide Partner Sales at Redis. “By integrating Redis’ high-performance database capabilities with Fierce’s deep understanding of government technology needs, we can empower public sector clients to build faster, more responsive AI-driven applications and deliver essential services to citizens more effectively.”

Driving Mission-Critical Innovation
This partnership underscores Redis and Fierce Software’s shared mission: to empower organizations with technologies that deliver speed, reliability, and agility. From real-time analytics to AI-driven workloads, Redis continues to help agencies and enterprises meet the most demanding data challenges.

Together, Redis and Fierce Software are ready to help public sector organizations optimize infrastructure, accelerate development, and deliver next-generation digital experiences that redefine what’s possible in government technology.

About Fierce Software
Fierce Software is a trusted technology solutions provider serving the Federal Government, Defense, and System Integrator communities. Their mission is to deliver innovative IT solutions through strong partnerships with leading technology companies — now including Redis.

Sections
Empowering the public sector with real-time data
Partnership built on innovation and trust
Share

Redis MCP Server extension in Gemini CLI now available
November 17, 2025
4 minute read
Mirko Ortensi
Mirko Ortensi
Redis Senior Software Engineer • R&D
Vasko Chomakov
Following Gemini CLI’s recent support for extensions, the Redis MCP Server is now available in the Gemini CLI extensions gallery.

The Redis Model Context Protocol (MCP) Server is a natural language interface designed for code assistants and agentic apps to manage and search data in Redis efficiently. Redis is a popular real-time data store across several use cases, leveraging data structures like hashes, sets, lists, and sorted sets. Starting with Redis 8, JSON data modeling, real-time indexing and search, probabilistic data structures, and time series are available in Redis Open Source, Redis Software, and Redis Cloud.

Redis fulfills a range of use cases in modern GenAI and app development, serving as both short-term and long-term memory as well as powering semantic search, semantic caching, and fast, scalable data access. Through the standard MCP specifications, the Redis MCP Server bridges these capabilities with GenAI tools, allowing code assistants and agentic apps to query, update, and reason over Redis data using natural language. Installing the Redis MCP Server extension in Gemini CLI is quick and straightforward.

Installing the Redis MCP Server extension
If you haven’t already, install Gemini CLI on your machine using the following command:

npm install -g @google/gemini-cli
Copied!
You can also follow the Gemini CLI installation guide for environment-specific instructions.

Next, browse the Gemini CLI extensions gallery, find Redis, and click the “Copy” icon to get the installation command for the redis extension. Alternatively, you can run the following in your terminal:

gemini extensions install https://github.com/redis/mcp-redis
Copied!
This will install and instruct the MCP Server to connect to a local Redis instance on the default port 6379. To connect to another server, you can also specify a URL connection string by setting the REDIS_URL environment variable.

After installation, start Gemini CLI and verify that the Redis MCP Server extension is available:

/extensions list
Copied!
Under the /mcp slash command, you get more control over the installed MCP extensions. So, as an example, you can inspect the server’s JSON schema for the tools and their parameters:

/mcp schema
Copied!
You can also view all installed MCP servers and their tools in a compact format:

/mcp list
Copied!
Working with Redis using the Redis MCP Server extension
You can use the Gemini CLI to get started with new projects or edit existing ones. Several powerful tools enable control over the overall coding experience, allowing users to create custom commands, manage memories, revert to previous versions, and more.

Redis is a natural fit for modern apps, providing building blocks for session management, caching, queuing, and leaderboards. With the Redis MCP Server extension, devs can access Redis directly from Gemini CLI: the same place they build, debug, and refine their code. This integration simplifies development by unifying the data and code layers in one environment.

Let’s say you are working on an app and want to implement session management using Redis. Redis is a common solution for scalable, highly available, and real-time apps. You can instruct Gemini CLI to develop an integration with Redis and provide context in the GEMINI.md file to instruct the model with your preferences. This refers specifically to the GEMINI.md file in your project directory (e.g., ~/projects/my-app/GEMINI.md), which defines the context for that particular integration. Other GEMINI.md files may exist, such as a global one at ~/.gemini/GEMINI.md and an extension-specific one at ~/.gemini/extensions/mcp-redis/GEMINI.md.

## Session Management

The app uses Redis to store user session data in JSON format. Each session is stored under a key prefixed with `session:<uuid>`, where `<uuid>` is a unique identifier for the session. The JSON document for each session has the following structure:

*   **`visited`**: A JSON array of unique song IDs that the user has viewed during the session. Song IDs are deduplicated to ensure each song is listed only once.
*   **`created`**: A Unix timestamp (integer) indicating when the session was first created.
*   **`updated`**: A Unix timestamp (integer) indicating the last time the session was updated.
  
A session is created for each user, and the number of songs viewed is tracked in the "visited" array.
Copied!
If you would like to customize your experience further, you can modify the prompt with additional instructions, such as avoiding anti-patterns or providing specific recommendations.

## Custom Prompts and Guidelines

1. Never flush a Redis database, neither in code nor running redis-cli
2. Never use the KEYS command in a project
3. Use the node-redis client library to connect to Redis
Copied!
When working with data, you may want to verify the execution of a functionality and review the state of the database. You can use Redis Insight, the official Redis dev tool with an intuitive UI, to quickly browse your data, profile the flow of commands to Redis, inspect JSON files, and more. This is an invaluable source of truth during development.

Alternatively, the Redis MCP Server’s natural language interface helps you issue the right commands and inspect results directly from Gemini CLI while your app runs:

> count the existing sessions

✓  scan_all_keys (redis MCP Server) {"pattern":"session:*"}                                         session:31f2032da547230149ad4d57766a3152                                                         session:cYl7jUxkfGNAFOeVTRthWctMj69vgDf62cJsQmhwk64                                              session:4w5a8jOQO8Ro9zyyyA2LNYh-VDHfZynbPCKQUrULzD8                                              

✦ I found 3 sessions.
Copied!
The Gemini CLI knows from the contextual preferences that the app should store sessions in Redis as JSON documents, prefixed with "session:". The Redis MCP Server exposes tools for working with JSON documents, enabling users to ask direct questions about the data:

> check if there are duplicate songs in the sessions

 ✓  json_get (redis MCP Server) {"name":"session:31f2032da547230149ad4d57766a3152","path":".visited"}  

[
    "0",
    "1",
    "3",
    "2",
    "4"
]

[...]

✦ I checked the JSON session and found no duplicate songs in the visited lists. The app has a mechanism to prevent adding duplicate songs to the session, so this is the expected behavior.
Copied!
Peeking into the database isn’t the only way to speed up your coding experience. If you’d like to add some random test data, you can do so without code additions to your project:

> Create three sessions with fake data, visited song IDs should exist in the database

[...]

✦ I have successfully created three sessions with fake data: session:fake_user_001, session:fake_user_002, and session:fake_user_003

> read session session:fake_user_002
✓  json_get (redis MCP Server) {"path":"$","name":"session:fake_user_002"}

✦ The content of session session:fake_user_002 is:

1 [
2   {
3     "visited": [
4       "2",
5       "4",
6       "1",
7       "0"
8     ],
9     "created": 1697037000,
10     "updated": 1697296200
11   }
12 ]
Copied!
You can formulate complex questions that are easily solved using Gemini CLI and the Redis MCP Server extension, as well as write and verify complex data structures. Additionally, you can create, merge, update, or delete data in Redis.

Where to learn more
You can learn more about the Redis MCP Server’s capabilities in our docs. To discover the Gemini CLI’s integration with MCP servers and customize your experience, read the following Gemini CLI docs.



Sections
Installing the Redis MCP Server extension
Working with Redis using the Redis MCP Server extension
Where to learn more
Share
RedisVL momentum & what’s next
November 14, 2025
4 minute read
Tyler Hutcherson
Tyler Hutcherson
Brian Sam-Bodden
Brian Sam-Bodden
Justin Cechmanek
Justin Cechmanek
Redis, a longtime favorite of developers, is seeing unprecedented velocity around AI use cases. RedisVL, initially a simple convenience layer for vector search, has quickly evolved into the AI-native developer interface for using Redis as a real-time context engine for LLM applications, including agents.

RedisVL is taking off
We’ve seen steady package downloads growth over the course of the calendar year with a surge to ~500k downloads in October alone. In Q3 of this year we saw a ~67% increase in cumulative downloads compared to Q2.

Fig 1. RedisVL downloads by day, month, and quarter during 2025.
Fig 1. RedisVL downloads by day, month, and quarter during 2025.

The RedisVL growth is being heavily driven by the adoption of our LangGraph Checkpointer integration that helps developers scale and manage agent state.

Fig 2. LangChain and LangGraph partner package contributions to overall RedisVL downloads.
Fig 2. LangChain and LangGraph partner package contributions to overall RedisVL downloads.

Redis is also showing up in more customer POCs, production deployments, and open source projects as the go-to agent storage layer because it can satisfy both the speed and flexibility requirements.

This momentum is the reason we’re investing. It’s why the next phase of RedisVL is about improved developer ergonomics, more functionality, and multi-language support.

What’s new in the latest Python RedisVL release?
RedisVL 0.11.0 introduces powerful new capabilities that make it easier than ever to build context-aware, multimodal, and low-latency AI applications.

1. Multi-vector queries
RedisVL takes vector search to the next level with multi-vector queries — enabling you to search across multiple embeddings at once to capture deeper context.

For example:

Find documents similar to both a short text description and an image embedding
Search for a song that matches both the lyrics and the audio track
Recommend clothing that aligns with both a photo and a written style description
Each document can contain multiple vector fields. RedisVL combines their similarity scores into a single, weighted result — letting you control how much each vector input contributes.

This expands RedisVL’s reach into multimodal search while keeping the developer experience simple and familiar.

2. Enhanced full-text query & index customization
RedisVL now gives developers finer control over text relevance and performance.

Text field weighting: Perform similarity searches across multiple text fields and tune how much each word or field influences the result.
Example: A query for “new Nike Air Jordans” can prioritize Nike and Jordans over new — improving ranking quality without reindexing your data.

Field-level control: Support for Redis field attributes like UNF (un-normalized form) and NOINDEX gives you more precision in how fields are indexed and sorted — ideal for high-volume or latency-sensitive workloads.
Together, these enhancements make it easier to create relevant, context-aware text search experiences using familiar RedisVL tools and patterns.

3. New vector index: SVS-Vamana
RedisVL 0.11.0 adds support for SVS-Vamana, a new vector indexing algorithm optimized for both memory and performance.

Built with advanced compression techniques, SVS-Vamana offers:

Lower memory usage
High query throughput
Optimizations for Intel hardware
This gives teams more flexibility to balance speed, scalability, and resource efficiency for large-scale AI workloads.

4. LangCache integration
Redis LangCache, the semantic caching service for LLM applications, is now natively integrated into RedisVL.

This allows developers to combine RedisVL’s AI-native tooling with a production-grade caching layer that:

Stores and reuses LLM responses
Reduces API costs and latency
Maintains consistent context across sessions
With LangCache built in, developers can now build faster, cheaper, and more consistent GenAI applications — all within a single Redis-powered platform for caching, vector storage, and semantic retrieval.

RedisVL now speaks Java — and it's just the beginning
A brand new Java RedisVL client library is also now available!

Why Java?
As enterprises adopt generative AI, Java developers face a familiar infrastructure dilemma. Python developers have been building AI applications with RedisVL since 2022, using a single library for vector search, semantic caching, embeddings storage, and session management.

Java teams, meanwhile, have been evaluating options—standalone vector databases like Pinecone or Weaviate, PostgreSQL with pgvector, or attempting to build their own vector search capabilities. Each approach adds complexity: another database to manage, another API to learn, data synchronization challenges, and operational overhead.

For many organizations, Redis is already running in production—handling caching, session storage, pub/sub messaging, and real-time data. RedisVL Java now unlocks a huge class of AI use cases living in enterprise and JVM-heavy infrastructure: Spring ecosystems, multi-service backends, large internal platforms, financial pipelines, streaming apps, etc.

Getting started
RedisVL Java provides a complete Redis-based AI infrastructure:

Vector search with schema management and flexible querying.
Semantic caching for LLM API cost reduction.
Embeddings cache to prevent redundant computation of vector embeddings.
Message history for conversational AI state management.
Document storage for binary content (images, PDFs).
It also includes LangChain4J integration via standard interfaces like EmbeddingStore and ContentRetriever.

The library is built on Jedis, the established Redis client for Java, providing a familiar connection model for teams already using Redis.

Add the RedisVL dependency to your project:

<dependency>
  <groupId>com.redis</groupId>
  <artifactId>redisvl</artifactId>
  <version>0.1.0</version>
</dependency>
Copied!
Follow our RedisVL Java user guide to get started!

More languages are planned in the coming year. The goal is simple: RedisVL should meet you in your language, not the other way around.

Closing
RedisVL started as a thin layer to help reduce boilerplate. It’s turning into a cross-language developer framework for building context-rich, low-latency AI systems — vector indexes, semantic caches, agent memory layers, LLM routers, and beyond.

The growth we’re seeing is a signal that more developers are standardizing on Redis as the real-time context engine for AI. RedisVL is the front door to that developer experience.

Sections
RedisVL is taking off
Closing
Share

Blog

Redis hits 10 billion Docker pulls—but we’re just getting started
November 07, 2025
2 minute read
Jon Fritz
Jon Fritz
Seven years ago, in September of 2018, we announced that Redis passed 1 billion pulls on Docker Hub. At the time, we were one of the first technologies to hit that number. A little more than five years later in 2023, we hit 5 billion Docker pulls. Over the last year, our Docker pulls have grown by 20% quarter over quarter, and we’ve been averaging more than 2.25 million pulls per day over the last two months.

This week—less than three years after our 5 billion mark—we hit 10 billion.

Ten billion pulls is a huge milestone for us. Redis is one of only a handful of technologies to ever reach this number of pulls. It not only speaks to how foundational a technology Redis is, but also to its versatility. Over the years, Redis has become known as a “Swiss Army Knife” for developers because of the variety of use cases it supports, from streaming to NoSQL database workloads. We started as, and will always be, a great way to cache data—but we hit this milestone because we’re much more than that.

The Redis community has innovated and grown the platform over the last decade-plus, and we’ve always looked to our users to steer us in the right direction as we do. Developers turn to Redis when they need fast data for any application, and building performant agentic platforms is no exception. In fact, in the latest Stack Overflow Developer Survey, 43% of developers said they use Redis to store data for AI applications. We hear this loud and clear, and we’re continuing to work on features that make Redis an even better building block for supplying agentic apps with fast data.

That’s the magic of our community in action. From the bottom of our hearts, thank you. We’re excited to see what you build over the next 10 billion pulls.

Redis by the billions

2009: Redis is created by Salvatore Sanfilippo (aka antirez); Google Docs and Kickstarter both launched, and Bitcoin began being used.
2018: Redis passes 1 billion Docker pulls; 51.2 percent of humanity or 3.9 billion people are online, marking the first time half the world has internet access.
2020: Redis passes 2 billion Docker pulls. The pandemic keeps us all at home. Zoom took off, and working from home became the norm as offices were abandoned.
2021: Redis passes 4 billion Docker pulls. Facebook rebrands as Meta and goes all in on VR, Waymo launches autonomous vehicle taxis in San Francisco.
2023: Redis passes 6 billion Docker pulls. GenAI and chatbots explode after the introduction of Chat-GPT in late 2022. Google releases Gemini, Anthropic releases Claude.
2024: Redis passes 8 billion Docker pulls. The AI model race is on with OpenAI, Google, Anthropic and Meta all racing to build the smartest model. Vector databases become the hot new piece of infrastructure as the AI tooling ecosystem starts to take shape (we know someone you should talk to about that).
2025: Redis passes 10 billion docker pulls. We can’t wait to be a part of what’s next.
Deploy Azure Managed Redis with AzAPI using Terraform
November 05, 2025
2 minute read
Thomas Findelkind
Thomas Findelkind
Azure Managed Redis is now generally available – bringing the power of Redis Enterprise directly into the Azure ecosystem.

However, as of Terraform azure provider v4.5, some features like Persistence (RDB, AOF) and Non-Clustered mode are not yet supported.

The solution? Use the AzAPI provider to deploy Azure Managed Redis today with full feature coverage — and switch seamlessly to the native provider once support arrives.

👉 Get started now: tfindelkind-redis/azure-managed-redis-terraform

Why Azure Managed Redis?
Azure Managed Redis combines Redis Enterprise’s performance and modules with Azure’s native managed experience.

You get:

Enterprise-grade performance and high availability with up to 99.999% SLA*
Native Azure billing, security, and identity integration
Full module support: RedisJSON, RediSearch, RedisBloom, and RedisTimeSeries
This service is the evolution of Azure’s Redis offering — and the strategic path forward for Redis workloads in Azure.

* With recommended configuration of active georeplication.

Azure Cache for Redis Retirement!
Microsoft has announced a clear transition timeline for Azure Cache for Redis:

Date	Change
October 1, 2026	No new Azure Cache for Redis instances can be created
Existing Instances	Supported until further notice
Recommended Path	Migrate to Azure Managed Redis for new deployments
In short: New Redis deployments on Azure should use Azure Managed Redis, which brings Redis Enterprise features under Azure’s managed control plane.

Why Use AzAPI with Terraform?
The azurerm provider doesn’t yet expose all capabilities of Azure Managed Redis.Until it does, the AzAPI provider lets you interact directly with Azure’s REST APIs through Terraform.

This approach gives you:

Benefit	Description
Full feature access	Deploy Redis with features unavailable in azurerm 4.5 (e.g., persistence, non-clustered mode)
Future-proof design	Module interface remains stable — just flip one variable to migrate later
Direct API access	Use the latest Azure REST API versions without waiting for provider updates
Immediate usability	Ready-to-deploy module and tested examples available on GitHub

AzAPI vs. azurerm: Feature Comparison (as of v4.5)
Feature	AzAPI Provider	azurerm v4.5
Clustered Deployments	✅ Supported	✅ Supported
Non-Clustered Mode	✅ Supported	❌ Not yet supported
Persistence (RDB, AOF)	✅ Supported	❌ Not yet supported
Access Policy Assignments (Entra ID)	✅ Supported	❌ Not yet supported
Defer Upgrade	✅ Supported	❌ Not yet supported
Redis Modules (JSON, Search, Bloom, TimeSeries)	✅ Supported	✅ Supported
TLS / Encryption	✅ Supported	✅ Supported
High Availability	✅ Supported	✅ Supported
Geo-Replication	✅ Supported	✅ Supported
Managed Identity	✅ Supported	✅ Supported
Customer Managed Keys	✅ Supported	✅ Supported
Private Endpoint	✅ Supported	✅ Supported
Module Implementation: Deploy Azure Managed Redis Today!
To bridge the gap, this Terraform module uses AzAPI under the hood while maintaining the same interface that future azurerm resources will use.

Example: Cluster and Database Definition
locals {
  redis_enterprise_api_version = "2025-05-01-preview"
}

# Cluster definition
resource "azapi_resource" "cluster" {
  count     = var.use_azapi ? 1 : 0
  type      = "Microsoft.Cache/redisEnterprise@${local.redis_enterprise_api_version}"
  name      = var.name
  location  = var.location
  parent_id = var.resource_group_id

  body = jsonencode({
    sku = { name = var.sku }
    properties = {
      minimumTlsVersion = var.minimum_tls_version
    }
  })

  tags = var.tags
}
Copied!
Example: Database with Persistence and Non-Clustered Mode
resource "azapi_resource" "database" {
  count     = var.use_azapi ? 1 : 0
  type      = "Microsoft.Cache/redisEnterprise/databases@${local.redis_enterprise_api_version}"
  name      = var.database_name
  parent_id = azapi_resource.cluster[0].id

  body = jsonencode({
    properties = {
      clientProtocol   = var.client_protocol
      evictionPolicy   = var.eviction_policy
      clusteringPolicy = "NoCluster"  
      persistence = {
        aofEnabled = true
        rdbEnabled = true
      }
      modules = [for m in var.modules : { name = m }]
      accessKeysAuthentication = "Enabled"
    }
  })
}
Copied!
⚠️ Note:

Persistence and Non-Clustered only supported via AzAPI.

Non-Clustered: Limitations: ≤25 GB only

Reading Access Keys
AzAPI allows direct key retrieval through the List Keys API — no scripts needed:

data "azapi_resource_action" "database_keys" {
  type        = "Microsoft.Cache/redisEnterprise/databases@${local.redis_enterprise_api_version}"
  resource_id = azapi_resource.database.id
  action      = "listKeys"
  method      = "POST"
  response_export_values = ["primaryKey", "secondaryKey"]
}
Copied!
Future-Proof Design: The use_azapi Switch
When azurerm adds full Managed Redis support, migration is effortless.

variable "use_azapi" {
  type    = bool
  default = true
}
Copied!
To migrate later:

Update the module
Set use_azapi = false
Run terraform plan
Apply — same inputs, same outputs, native provider
No state migration required.

Example Scenarios
The module includes six deployment examples:

simple/ — Basic cluster setup
high-availability/ — HA configuration for production
with-modules/ — Redis modules showcase
geo-replication/ — Cross-region replication
enterprise-security/ — Customer Managed Keys, Managed Identity, Entra ID auth
clusterless-with-persistence/ — Non-clustered mode with RDB + AOF persistence
👉 Explore the module and examples: tfindelkind-redis/azure-managed-redis-terraform
hat’s new in two – October edition
October 31, 2025
4 minute read
Talon Miller
Talon Miller

Click here to view video
Welcome to “What’s new in two,” your quick hit of Redis releases you might have missed in the past month. We’re covering the latest developments from October and expanding on what I covered in our latest video. Press play above if you’d rather watch than read. Let’s get started.

New AI Integrations
Redis + Microsoft Agent Framework integration
In early October, Microsoft introduced its new Agent Framework, and at the same time, Redis announced its integration with this framework. This collaboration empowers developers on Azure to build scalable, resilient, and intelligent agentic applications. With the Agent Framework acting as the pluggable memory architecture, Redis serves as the high-performance, low-latency data store that powers those agents.

Redis MCP Server integration in Gemini CLI
Redis also released our Redis MCP Server in the Gemini CLI extensions. Our Redis MCP Server is a natural language interface designed for agentic applications to efficiently manage and search data in Redis. This enables direct access to the data stored in Redis, so you can verify the stored data, create test data samples, and more, all from the same place you are creating things, the Gemini CLI. You can check out the project here.

Redis vector node integration on n8n
We’ve contributed a new Redis Vector Store Node to the open-source n8n automation platform, now available since version 1.116 (for both cloud and self-hosted deployments). Built on the LangChain.js Redis implementation, this new node enables seamless vector storage and retrieval directly within n8n workflows. It includes advanced features such as index validation, client reuse, TTL and overwrite options, and metadata filtering for efficient vector management. This contribution strengthens Redis’ position as a high-performance vector database and expands developer access to native AI workflow integrations across the n8n ecosystem. Check out the docs here to learn more.

Redis Software 7.22.2
Redis released Redis Software version 7.22.2, featuring an important security enhancement. With this update, Redis Enterprise customers can now provide their own trusted certificates for internode encryption, replacing the default self-signed certificates. This improvement strengthens compliance with customer security policies, many of which restrict or prohibit the use of self-signed certificates. Get the latest download here.

New Redis Insight UI on Redis Cloud
Introducing the new Redis Insight Cloud UI - a sleeker, more intuitive way to explore and work with your Redis Cloud data. The refreshed interface offers a unified look and smoother navigation. With Browser and Workbench now front and center in the top menu, it’s easier than ever to visually interact with your data, run commands, and learn through built-in tutorials. Whether you’re just getting started with Redis or optimizing production workloads, Redis Insight helps you move faster and get more out of Redis Cloud. Available now on the Essentials and Free tiers.

Metrics Engine 2.0 and Observability tutorial
In October, Redis announced the general availability of the new Metrics Stream Engine for Redis Software version 8.0. Built on an exporter-based architecture, this next-generation monitoring system delivers more accurate, real-time data for improved observability and faster incident response. The Metrics Stream Engine introduces the new /v2 Prometheus scraping endpoint, enabling seamless integration with external monitoring tools like Grafana, DataDog, New Relic, and Dynatrace. By exporting raw rather than aggregated data, it provides greater accuracy and scalability for large deployments, along with full visibility during maintenance events such as shard failovers and scaling operations.

Alongside the new Metrics Stream Engine, Redis has released a comprehensive Observability Quick Start Tutorial to help users deploy a full monitoring stack for Redis Software in under an hour. The tutorial walks system administrators and DevOps professionals through setting up Prometheus and Grafana with preconfigured dashboards using the new v2 metrics engine, enabling real-time visibility, alerting, and deeper insights into cluster performance. It also covers transitioning from v1 to v2 metrics, interpreting key dashboards, and customizing monitoring for production environments, providing a fast path to enhanced observability and proactive system health management.

Redis acquires Featureform
On October 9th Redis announced the acquisition of FeatureForm, a robust framework for managing, defining, and orchestrating machine learning features. This acquisition strengthens Redis’ ability to address one of the most significant challenges in production AI: delivering structured data to models quickly, reliably, and with complete visibility.

That’s a wrap on October updates. And if you missed last month’s update, two minutes is all you need to catch up. Whether you prefer watching or reading, catch more valuable updates in my next two-minute episode. See you next time.

Introducing Haink: Redis’ applied AI agent
October 31, 2025
6 minute read
Rini Vasan
Rini Vasan
Meet Haink, Redis’ always-on AI teammate
Across industries, teams are turning to AI agents to move faster and work smarter. At Redis, we built one from scratch to show what is possible with using Redis as the foundation.

Meet Haink, a purpose-built AI teammate from the Redis Applied AI team. Haink is available around the clock to help Redis teammates understand customer architectures, navigate the AI market, and identify where Redis fits best for the win. What makes Haink truly unique is that it is not a demo or prototype. It is a production-grade agent that Redis engineers, solutions architects, and field teams use every day.

Why we built Haink
Our field and solutions engineering teams often face a challenge: keeping up with the rapidly changing AI landscape while helping customers see Redis’ unique value within it. The world of AI evolves faster than models can be retrained, which means static systems often fall behind as new techniques, architectures, and best practices emerge. Redis is a core component in many AI deployments, from real-time caching to vector similarity search, yet mapping that value to a customer’s specific environment takes time.

We built Haink as an “Nth team member” to solve that problem. Haink codifies Redis’ collective expertise, from technical blogs and code examples to real-world deployments, and makes that knowledge instantly accessible to everyone at Redis. It is also prompted to follow our teams’ preferred code style and technical standards, ensuring consistency in how Redis concepts and recommendations are shared across the company. In doing so, Haink helps scale our knowledge, allowing others to interact with and learn from it in real time.

What Haink can do
Haink acts like a Redis expert who is always available. You can ask it for code examples, architectural recommendations, or even technology comparisons.

For example, you might message Haink in Slack and say, “Show me a code example for semantic caching with RedisVL.” Within seconds, Haink searches Redis’ internal knowledge base, finds the relevant example, and returns working code that the Applied AI team has already tested.

Haink can also handle reasoning-based questions, such as “When is Redis better than Pinecone?” In those cases, it analyzes context from Redis materials and explains the architectural tradeoffs, including where Redis’ unified data model or low latency would deliver more value.

Haink is not limited to summarization or retrieval. It can perform complex computations on the fly. For example, you can pass Haink an example JSON and an estimated number of documents, and it will run a custom tool that calculates the number of shards a customer workload requires. This capability connects reasoning with real-time computation, showing how Redis can power logic-based operations in addition to AI reasoning.

Like any good teammate, Haink continues to learn. Every conversation is saved as a regression test that helps our engineering teams measure accuracy and reduce hallucinations over time. If Haink ever gets something wrong, that interaction becomes a test case for improving future versions.

How Haink works behind the scenes
Haink lives in Slack, but the system running it is complex and entirely homegrown. Built from scratch using Redis and AWS, it shows how a real-time data platform, a managed model service, and scalable infrastructure can work together to power enterprise-grade AI agents.

The architecture is built entirely within AWS, combining ECS Fargate for orchestration, Redis Cloud for real-time data and memory, and AWS Bedrock for large language model inference. ECS handles API routing, background processing, and scaling, while Bedrock provides secure, managed access to models like Claude. Together, they enable a fully event-driven agent workflow that can process Slack messages, retrieve context from Redis, and generate accurate, context-aware answers in real time.

The flow is asynchronous and optimized for performance:

A user mentions Haink in Slack. Slack sends an HTTPS POST request to an Application Load Balancer, which routes it to the API service.
The API service queues the request into Redis Streams.
A worker service polls Redis Streams, consumes the task, and retrieves the conversation state from Redis.
The worker searches Redis vector data for relevant documents and, if needed, performs a web search using the Tavily API.
The worker then calls Claude on AWS Bedrock, sending the retrieved context for reasoning and response generation.
Bedrock returns the LLM output, which the worker writes back to Redis to update the conversation state.
Finally, the worker posts the response to Slack, often including references and source links.
Haink AI Blog
Figure 1: Haink system architecture combining Redis for real-time data and AWS Bedrock for managed LLM inference.

Each component plays a distinct role:

Slack API handles user interactions and triggers the workflow.
ECS Fargate runs containerized services, including the API, agent worker, and memory server.
AWS Bedrock (Claude) provides scalable, managed access to foundation models for reasoning and text generation.
Redis Cloud, deployed in AWS, stores memory, manages event queues, and powers vector search for retrieval-augmented generation (RAG).
Stage Applied AI Agent Cluster
Figure 2: Haink deployment on AWS ECS cluster integrating API, worker, and memory services.

In addition to its runtime environment, Haink includes an internal content management panel that powers its knowledge ingestion pipeline. This interface tracks each piece of content as it moves through stages such as ingestion, vectorization, and completion, ensuring Redis knowledge sources remain current and ready for retrieval.

Content Management
Figure 3: Haink content management admin panel showing ingestion and vectorization pipelines for Redis knowledge sources.

This architecture makes Haink modular, scalable, and production-ready. Redis enables sub-millisecond access to memory and vector data, while Bedrock delivers managed and compliant large language model inference. Together, they form a real-time, intelligent agent system that is deployable at scale.

The role of memory
Memory is what makes Haink feel like a teammate rather than a tool. Using Redis’ Agent Memory Server, Haink stores both short-term and long-term context.

Short-term, or “working memory,” tracks recent exchanges so Haink can maintain a natural multi-turn conversation. Over time, important information is promoted to long-term memory, allowing Haink to recall previous sessions and recognize patterns in interactions.

This approach reflects how human memory works while demonstrating Redis’ strength as the memory layer for intelligent agents. With its speed, persistence, and low latency, Redis is ideal for building AI systems that need to think and recall information in real time.

Why Haink matters
Haink is more than an internal utility. It is a living reference architecture that shows what is possible when you build agents on Redis.

For Redis account executives and solutions architects, Haink acts as a 24/7 expert, helping them prepare for customer meetings with architecture examples and Redis-specific AI use cases. For the wider AI community, Haink is proof that it is possible to build a capable, production-grade AI agent using Redis, Python, and sound engineering practices.

The Applied AI team uses Haink every day, gathering feedback, refining its reasoning, and improving its capabilities. This process of using our own technology internally, often called dogfooding, ensures that Haink continues to evolve while advancing Redis’ own real-time AI platform.

What’s next for Haink
The team behind Haink is already experimenting with new capabilities. Work is underway to add multimodal inputs, allowing Haink to understand and respond to not just text but also code snippets and other data types. Integrations with enterprise tools such as Salesforce via Glean are also planned, which will expand Haink’s context and make its responses even more relevant.

Future updates will improve the evaluation and feedback systems so Haink can continue learning from every interaction. The more Redis teams use Haink, the smarter and more contextual it will become.

Building AI teammates with Redis
Haink represents what Redis does best: enabling real-time, intelligent systems that learn, adapt, and scale. It is not simply a helpful Slackbot. It is proof of what is possible when large language models, vector search, and real-time memory come together on Redis. You can explore how Haink is built by visiting the open-source repo on GitHub.

Try Haink yourself. Share a customer scenario, describe their architecture, and ask where Redis fits. In seconds, you will see a thoughtful, context-aware response backed by Redis data and logic.

Learning agents with Redis: Feedback-driven context engineering for robust stochastic grounding
October 31, 2025
18 minute read
Srijith Rajamohan
Srijith Rajamohan
Iliya Zhechev
Iliya Zhechev
Rado Ralev
Rado Ralev
Aditeya Baral
Aditeya Baral
Yash Mandilwar
Yash Mandilwar
Abstract
Introduction
Literature review
Our contribution
Methodology
Redis as the agentic memory layer
Agent components
Orchestrator Agent
Data Summarizer Agent
Guidance Agent
Filter Agent
Interpretation Agent
Putting it all together
Cache population stage
Cache retrieval stage
Learning from feedback
Results
Dataset 1
Dataset 2
A typical scenario
How did Learning Agents help here?
What type of improvements can you expect?
Similarity and intent: a few more examples
Discussion and conclusion
Abstract
Large Language Models (LLMs) have demonstrated remarkable capabilities in querying and interpreting unstructured text, but applying them to extract information from large-scale structured data remains expensive, error-prone, and often inefficient. This work introduces a system that combines LLMs with Redis-backed learning agents to enable accurate, scalable, and self-improving question answering (QA) over complex datasets. The architecture leverages a multi-agent system orchestrated through semantic caching and a multi-tiered caching strategy where results, executions and guidances are stored in a Redis-backed high-throughput low-latency store. The proposed system systematically learns from any user feedback or errors that occur during the course of query execution and through reflection learns nuanced understanding of business terminology and rules. These interactions, errors, and feedback through memory reflection offer stochastic grounding. We refer to such grounding as guidances for future queries. Additionally, successful executions are stored and later sampled to handle similar user questions. The executions and guidances become the basis of context engineering needed to enrich the context with critical information so that future queries incur fewer errors and retries. We validate our approach on financial and insurance datasets, highlighting use cases such as risk scoring and customer segmentation. Through iterative learning from both individual user sessions and collective behavior, the system demonstrates improved time-to-insight and query accuracy.

In short:

Learning Agents = stochastic grounding through feedback + context engineering + memory reflection

Introduction
The application of Large Language Models (LLMs) to structured data querying presents both opportunities and challenges. While LLMs have shown state-of-the-art performance in natural language processing tasks1, their deployment in structured query generation especially for tabular data remains hindered by high computational cost, failure rates in complex scenarios, and lack of long-term memory or reuse mechanisms. These limitations are particularly acute in domains such as finance and insurance, where analytical workflows involve repeated, nuanced queries over large-scale datasets.

We propose Learning Agents with Redis, a Redis-backed architecture for LLM-driven QA over tabular data, which mitigates these challenges through agent-based orchestration, multi-tiered caching for carefully engineered contexts, stochastic grounding from feedback and memory reflection. By leveraging execution traces, user feedback, and guidance from failed attempts, the system avoids redundant computation, lowers latency, and improves future performance through learned priors. Redis2, a low-latency key-value store, is utilized as the backbone for both execution and guidance caches, enabling efficient storage and retrieval of intermediate results and agent interactions.

The system comprises specialized agents including a Data Summary Agent to introspect and understand the data schema, a Filter Agent for query generation and execution, a Guidance Agent for synthesizing correction patterns, best practices, preferences and, an Interpretation Agent for result summarization all coordinated by an orchestrator. These agents collectively implement a feedback-driven loop that transforms failed executions into instructive guidance and successful executions into reusable templates. Over time, the system adapts to user preferences and query distributions, allowing for personalized and crowd-informed improvements a characteristic aligned with meta-learning paradigms3.

We demonstrate the effectiveness of our approach using real-world datasets, such as the Portuguese bank marketing dataset4 and the Insurance claim dataset5, showcasing diverse analytical queries and their progressive refinement through cached knowledge. The results highlight the potential of Redis-augmented agentic systems to make LLM based retrieval systems continually smarter and thereby more efficient.

Literature review
Semantic caching is a growing optimization strategy in Retrieval-Augmented Generation (RAG) and LLM-powered systems. It enables retrieval of responses based on semantic similarity, rather than exact textual match by leveraging embeddings and vector similarity search. This approach reduces costly LLM API calls and accelerates response time in QA workflows6. A recent paper, Semantic Caching of Contextual Summaries for Efficient Question-Answering with Language Models7 introduces a method to cache intermediate contextual summaries via embeddings. Their approach yields about 50–60% reduction in inference cost while preserving answer quality across QA datasets8 further improves cache effectiveness using fine‑tuned domain-specific embedding models, alongside synthetic training data to boost precision and recall in similarity searches9. In Building LLM Agents by Incorporating Insights from Computer Systems (Zhang et al., Apr 2025), the authors advocate for cache-style memory mechanisms within LLM agents, drawing inspiration from memory‑hierarchy design in computer systems (e.g., registers, cache, main memory). They argue that caching key agentic information and exploiting locality principles can significantly optimize performance10.

The Vicinagearth survey ‘A survey on LLM-based multi-agent systems: workflow, infrastructure, and challenges’11 on LLM‑based multi-agent systems reviews memory storage, reflection, and modular memory practices including summarization, hierarchical compression, and embedding‑based retrieval as foundational techniques for efficient agent-driven reasoning. They emphasize how structured memory enables agents to maintain context and adapt to evolving situations. The study "RecallM" explores methods of achieving the effect of long-term memory, highlighting the importance of continual learning, complex reasoning, and learning sequential and temporal dependencies for LLM-based chatbots12. Empirical investigations into memory management strategies, particularly concerning the addition and deletion of experiences, have revealed their impact on the long-term behavior and performance of LLM agents13. Augmenting LLMs with external memory has been shown to improve performance on tasks requiring long-context recall, suggesting that such architectures can effectively handle contexts much longer than those seen during training14.

With respect to extracting information from tabular data, seminal work such as TaBERT (Wang et al., 2020) introduces a pre‑training approach that jointly models tabular and natural text, significantly improving performance on tasks like WikiTableQuestions and text-to-SQL datasets (e.g., Spider). TaBERT powers semantic parsers capable of understanding questions about structured data in natural language15. Additionally, the awesome‑tabular‑LLMs collection16 highlights modern techniques such as StructGPT, TableQAKit, and DTT that integrate prompting, neural semantic parsing, and decomposed reasoning methods to enhance LLM performance on table-based QA and transformations . The recent paper ‘Cost‑Efficient Serving of LLM Agents via Test‑Time Plan Caching’17 introduces “plan caching” which stores structured plan templates derived from agent execution traces and adapting them to new tasks via lightweight matching and templating. This method reports ≈46% cost savings while maintaining performance in agentic applications. In RecMind18, an LLM-powered agent, leverages planning to break down complex recommendation tasks into manageable steps, utilizing memory and tools to enhance functionality.

Our contribution
The Learning Agents with Redis framework synthesizes these threads into a unified, practical architecture for tabular QA:

While prior work on memory and plan caching emphasizes general agent architecture and computational reuse, this system is specialized for structured data domains
The system introduces multi-agent orchestration with components specialized for summarization, filtering, guidance generation, and interpretation, creating a feedback-driven loop for stochastic grounding
The system leverages meta-learning principles to incorporate business logic and semantic correctness through crowd-learning resulting in improved time-to-insight
Unlike traditional semantic caching, the proposed system combines both execution-level caching (storing runnable query code and results) and guidance-level caching (capturing failure modes and user feedback), mediated by Redis, to support dynamic query generation and adaptation over time.
Queries stored in the Execution Cache from past successful executions can be evolved based on parameters
Methodology
In order to reliably query large volumes of data using Large Language Models (LLMs), we propose a Redis-backed multi-agent architecture. The system is designed to incrementally learn from both successful and failed attempts through semantic caching, structured feedback, and agent coordination. Our approach is rooted in three core design principles:

Cache results with TTL
caching entire executions in Redis to eliminate expensive LLM calls
cache method level calls
Cache successful execution queries in Execution Cache for each question
create queries to answer user question
get user feedback to improve queries or execute if it looks OK
successful executions get stored in the Execution Cache
execution might fail, collect the failures into an ErrorHistory to improve query creation on the next attempt
Execution Cache creates a new entry for each successful execution so that we can use various sampling strategies to find suitable candidates for future questions
Cache guidances in Guidance Cache for each question
once execution is successful, create guidances in Guidance Cache
the guidance agent summarizes ErrorHistory as guidances for future executions
the guidance agent also takes into account any user feedback that was provided to clarify business logic and incorporates this into the Guidance Cache entry
unlike the Execution Cache, the Guidance Cache only stores one entry per user question where new guidances update the existing entry by reconciling and updating the Guidance Cache entry
Redis Learning Agent
Learning Agent

Such a system learns from your feedback but also collectively learns from the crowd so that future users can leverage the wisdom of those before them. Such a system of caches stores learned population-specific guidances that is rich in business know-how and logic that can potentially even eliminate the need for LLM fine-tuning. Ideally, we want to see the following behavior as shown in the chart below.

Performance Trends
Token reduction over subsequent runs

Redis as the agentic memory layer
The architecture is composed of several Redis-backed agents, orchestrated through a planner agent. Redis serves as the memory layer for short-term memory and persistent memory:

Redis: Short-term memory for storingstep results during the agent execution
RedisVL: Serves as a persistent memory of past executions
Execution Cache: Successful execution queries and their results.
Guidance Cache: Summarized learnings from errors.
This enables both exact reuse and adaptive prompting, effectively reducing inference tokens and improving latency over time.

Agent components
Each agent is briefly described below:

Orchestrator Agent
Serves as a lightweight planner and coordinates all agent interactions and manages the control flow of the QA task.

Data Summarizer Agent
This agent inspects the dataset and provides statistical summaries of columns (e.g., value ranges, distributions) and also textual descriptions of the columns based on the name and the values contained in those columns. The user should ideally aid this summarization by describing and disambiguating the columns. If the data schema and/or the data does not change often, consider setting an appropriate TTL so that the results of this step are cached and not frequently re-executed.

Stats
Data Summarizer Agent

Guidance Agent
The Guidance Agent observes failed executions and any user feedback if provided and summarizes them into meaningful strings. These strings represent the observations of the failures, its causes, and instructions to avoid them in the future. The guidance strings are written to the Guidance Cache at the end of successful execution of a query. If guidance already exists for a question, the entry is updated by reconciling the new guidances with the existing guidances. They are retrieved for similar questions in future executions from the Guidance Cache. A predefined threshold (hyperparameter) is used here for retrieval which is lower than the threshold used for the Execution Cache. It is possible that irrelevant guidances may be retrieved, as limitation of embedding-based retrieval systems, however the LLMs are instructed to use guidances if they are appropriate and relevant. Some experimentation is needed to balance true helpful guidances matches against false positives that may pollute the context.

Example of a retrieved guidance 
Example of a retrieved guidance

Filter Agent
The Filter Agent is responsible for generating and executing queries. It takes as input:

A user question
Column and data summaries
Possible retrieved guidance strings from the Guidance Cache
Possible reuse or adaptation of past executions from the Execution Cache
Error history and retry count since this agent is called in a loop until successful completion or until a condition ‘max_retries’ is met.
It is helpful to prune large error histories to avoid endless loops
Using this context, prompts are created for the LLM to generate executable queries. If the execution fails, the agent updates the error history, and the orchestrator retries with improved context.

Example of a generated query
Example of a generated query

Example of a retrieved execution from the execution cache - this one has only a single execution corresponding to a user question
Example of a retrieved execution from the execution cache - this one has only a single execution corresponding to a user question

When there is not an exact match these executions may have to be modified by the LLM for the current question
When there is not an exact match these executions may have to be modified by the LLM for the current question

Interpretation Agent
After a successful query execution, the results may be scalar or a dataframe which in itself may not be particularly useful to the end user since users of decision making tools are looking for insight as opposed to data. The Interpretation Agent interprets and translates the result within the context of the original question into a human-readable summary. It returns this to the user and updates the system state with a final confirmation of success.

Results
Interpreted result

Putting it all together
The execution flow, which can be split into 2 stages, is summarized below.

Cache population stage
When a new user question comes in and no match is found (irrespective of TTL), a query is created for the user question
Data Summarizer Agent provides a summary of the columns
Filter Agent generates a query which may or may not succeed.
Error handling and retry: If the query fails (e.g., due to syntax or semantic mismatch), the system logs the error and retries with improved prompts.
Query success: Once the query succeeds, the result is stored in the Execution Cache, and the related error history is converted into a guidance entry in Guidance Cache.
Execution Cache: caching of successful queries that can be adapted for similar queries
for any given query, all previously successful executions are stored in the Execution Cache because they represent variations in user preferences
this provides a distribution of successful executions to sample from for future user requests
Guidance Cache: guide query creation for all future queries that are similar
error history is converted into a guidance entry in Guidance Cache
this uses reflection to learn from failures that are either
in the form of user feedback for preferences
in the forms of user feedback for semantic errors or errors in business logic, e.g. feature A instead of feature B to compute the metric
syntax errors in the code such as applying string operations to numerical data
These help with progressive query refinement
The Interpretation Agent interprets the data returned back from the query and returns the result to the user.
Cache retrieval stage
Given a user question with an exact match cache hit and t < TTL: retrieve result directly from Redis.
this can be cached results of individual steps
or the cached end-to-end result
Given a user question with t > TTL
the Orchestrator checks to see if there is an exact match (exact_threshold) in the Execution Cache, if yes execute it with user permission
if the Orchestrator determines that it is not an exact match but it is similar (based on a similarity threshold) - use prior query and guidance as a template for adaptation
find entries in theExecution Cache and possibly also in the Guidance Cache
if available, use the Guidance Cache entry to guide query creation
use this retrieved successful execution for the match as a template to guide query generation for the current user question
This builds upon the hypothesis that for complex queries, it is easier to modify an existing query than to create an entirely new query
Learning from feedback
Learning forms an important aspect of this system, and it does so using feedback from the user and its own experiences. A few things to note:

user acceptances validate an execution and makes it available for reuse. Executions that receive more acceptances are more likely to be sampled again in the future.
rejections update error history and guide refinement of query generation.
frequent failure patterns are abstracted into guidance templates via the guidance agent.
This approach aligns with the principles of meta-learning, allowing the system to generalize improvements across users and questions.

Results
The system was evaluated on two datasets described below, selected to cover distinct domains and for the non-trivial complexity inherent in their features.

Dataset 1
This dataset, derived from a Portuguese bank’s direct marketing campaign (UCI Machine Learning Repository ) contains approximately 45,000 data points. It includes information on telephone interactions and client demographics, such as age, job, marital status, education, and account details. It is widely used19 for predictive analytics and machine learning applications, including logistic regression, decision trees, and ensemble methods.

Dataset 2
This dataset contains approximately 58,000 historical insurance claim records (Insurance Claims Dataset ) spanning a wide range of claim types, such as auto and health. It offers a feature set of around 40 attributes, making it highly suitable for predictive modeling tasks including fraud detection, claim frequency forecasting, and risk assessment.

A typical scenario
The experiments below illustrate a typical scenario where a database is queried by multiple users. It is reasonable to expect variation in the wording of questions that express the same intent across different users. We show examples below of such variations of the ‘original' question.

Assume the following question is posed by user 'A'. Admittedly, this is an open-ended and challenging question but a very plausible scenario in decision support.

Question: What profile should I avoid if am running a personal loan campaign?

It goes through the following chain of events before it successfully answers the question:

No hits (first run)
Filter Agent generates code that simply filters, misunderstands user intent
User requests modification 'Do not use filters, I want to determine the ideal profile'
Filter Agent generates code based on feedback
User requests modification providing explicit feedback now 'create an algorithm to predict the ideal profile, use colums job, marital status and education as features'
Filter Agent now generates a prediction code based on feedback history but creates a dataframe instead of running it on provided data
User requests modification 'dataframe exists so do not create one'
Filter Agent generate code based on feedback but encounters a JSON parser error
Filter Agent uses error history and feedback history to generate code based on feedback
User approves
Code is executed and results returned
Interpretation Agent interprets results and returns to user
Executions and Guidances are both cached
Actual code execution is shown below.

Original run
Original run

Now once the above has completed, user 'B' might have the following question which is similar but directionally different from the question above.

User question: What profile should I target if am running a personal loan campaign?

In this scenario, the prior experiences are useful for answering this question, resulting in a significantly reduced time to result and token count. The following steps are taken here:

(Non-exact) Success cache hit
Guidance Cache hit
Filter Agent uses info and generates code
User accepts
Results generated
Interpreted and returned to user
Note the retrieved entries in both execution and guidance caches in the trace shown below.

Subsequent run with a warmed cache
Subsequent run with a warmed cache

How did Learning Agents help here?
Notice that both similar matches and guidance were retrieved here. The system was able to use both pieces of information to understand the desired logic and preferences underlying the question “What profile should I avoid if I am running a personal loan campaign?“ and adapt that to the question “What profile should I target if am running a personal loan campaign?”. The result is a noticeable reduction in token consumption, the number of retries and subsequently the time-to-result.

User question	Original question: What profile should I avoid if am running a personal loan campaign?	Subsequent question: What profile should I target if am running a personal loan campaign?
Type	First run	Second run (cache warmed)
Total number of tokens consumed	6022	1143
Number of attempts	6	1
What type of improvements can you expect?
We illustrate, with some examples, the benefits over various lexical variations of the original user question. There are three scenarios here where learning can be advantageous:

a non-exact hit in the Execution Cache and no hit in the Guidance Cache (no guidance found), this is essentially semantic caching
hits in both the Execution Cache (non-exact) and the Guidance Cache - the LLM adapts both for the current question
a hit in the Guidance Cache but no hit in the Execution Cache - the LLM uses guidance alone to create a query for the current question
Below is one such ensemble of questions expressing the same ‘intent’. Every question following the original question that expresses the same intent is denoted a variation of that question.

Original	Give me the age group that has the highest loan balance but also have taken out home loans?
Subsequent variations	I want to find the age group that has a home loan with the highest loan balance?
Subsequent variations	I want to know what age group has the highest loan balance but also has a home loan?
Subsequent variations	Who has an outstanding home loan and has the highest loan balance, give me the age groups?
Below are two sets of runs:

In order to demonstrate the token usage without learning, 3 runs (red) for the original question were made. This was done with the cached cleared after each run, i.e. with learning turned off
1 run each (teal) for each of the variation listed in the table above. This was done after the cache was warmed and learning enabled
The total number of tokens consumed and the total number of attempts are shown below for both cases. With learning disabled, the original question ‘Give me the age group that has the highest loan balance but also have taken out home loans?’ takes 3 attempts to form the correct query and consumes 3x the total number of tokens.

Reminder: as noted before, user feedback isparticularly useful for semantic errors since the agent is designed to self-learn from syntactic errors.

Token Usage
Token usage comparison for question 1

Similarity and intent: a few more examples
Two sentences can be semantically similar yet convey different intents, because intent, as humans define it, depends on both similarity and relevance. Many systems, however, rely solely on similarity to retrieve matches. Here, we examine both scenarios to understand how Learning Agents handle them.

We revisit the question ‘Who is my ideal target for a loan campaign?’, but this time follow up with 3 variations of that question. As seen before, the benefits of imparting the domain knowledge and its subsequent reuse is clear in the reduction in the number of attempts from 2 to 1.

Original	Who is my ideal target for a loan campaign?
Subsequent variations	If I wanted to run a loan campaign, who should I target?
Subsequent variations	Who should I target if I want to run a loan campaign?
Subsequent variations	How do I optimize my loan campaign? Who do I target?
Once feedback is provided by the user, subsequent runs (in teal) can use the guidance/grounding generated from the user feedback resulting in predictable and correct results as shown below.

Token Usage
Token usage comparison for question 2

The following demonstrates queries and execution over the insurance dataset. In the example below, similar behavior is observed with respect to the reduction in token count, run time and retry elimination resulting in more predictable and reliable responses.

Original	What age groups are likely to have automatic transmissions?
Subsequent variations	Which age groups are most likely to drive cars with automatic transmissions?”
Subsequent variations	Identify age groups that tend to use automatic transmissions
Subsequent variations	Determine which age ranges prefer automatic transmissions
Subsequent variations	Find out which age groups commonly have automatic transmission variables
Token Usage Comparison
Token usage comparison for question 3

What happens when the variations have intents that differ from the original question. Here, the original question is “What age groups are likely to have automatic transmissions?” but the questions that follow would like to know about age groups that prefer manual transmissions. Once again, similar savings are observed in the metrics of interest.

Original	What age groups are likely to have automatic transmissions?
Negated variation	What age groups are likely to have manual transmissions?
Negated variation	Determine which age ranges prefer manual transmissions
Negated variation	Find out which age groups commonly drive manual transmission vehicles
Token usage for variations where intent differs from the original
Token usage for variations where intent differs from the original

Discussion and conclusion
In summary, the Learning Agents with Redis framework presents a solution for enabling Large Language Models to effectively learn how to query and interpret structured data. The architecture captures business logic, user preferences, and error pattern and demonstrates advancements over traditional LLM-based QA systems, particularly in complex domains like finance and insurance. By utilizing a multi-tiered caching strategy that incorporates not only past successes but also failures and user feedback, the system follows a path of continuous improvement thereby reducing computational costs and latency and ultimately time-to-insight. By synthesizing principles from meta-learning, semantic caching, and memory reflection, this approach lays the groundwork for next-generation intelligent systems that are not only more efficient but also self-improving and contextually aware.

References
1 Brown, T. et al. (2020). Language Models are Few-Shot Learners. NeurIPS., OpenAI. (2023). GPT-4 Technical Report.

2 Redis Ltd. (2023). Redis Documentation.

3 Finn, C., Abbeel, P., & Levine, S. (2017). Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks. ICML.

4 https://archive.ics.uci.edu/dataset/222/bank+marketing

5 https://www.kaggle.com/datasets/litvinenko630/insurance-claims

6 https://artsen.h3x.xyz/blog/integrating-reasoning-and-agentic-frameworks-for-llms-a-comprehensive-review-and-unified-proposal/?utm_source=chatgpt.com https://arkapravasinha.medium.com/supercharging-llm-applications-with-semantic-caching-boost-speed-cut-costs-and-maintain-accuracy-11f302464dff?utm_source=chatgpt.com

7 Couturier et al., May 2025

8 https://arxiv.org/abs/2505.11271?utm_source=chatgpt.com. Advancing Semantic Caching for LLMs with Domain‑Specific Embeddings and Synthetic Data (Gill et al., Apr 2025)

9 https://arxiv.org/abs/2504.02268?utm_source=chatgpt.com

10 Building LLM Agents by Incorporating Insights from Computer Systems

11 https://link.springer.com/article/10.1007/s44336-024-00009-2

12 Kynoch & Latapie, 2023

13 Xiong et al., 2025

14 Chaudhury et al., 2024

15 https://arxiv.org/abs/2005.08314

16 GitHub - SpursGoZmy/Awesome-Tabular-LLMs: We collect papers about "large language models (LLM) for table-related tasks", e.g., using LLM for Table QA task. “表格+LLM”相关论文整理

17 Zhang et al., Jun 2025

18 https://arxiv.org/abs/2308.14296

19 https://www.kaggle.com/datasets/heptapod/uci-ml-datasets

Redis as the engine behind real-time, intelligent chatbots
October 24, 2025
5 minute read
John Noonan
John Noonan
Chatbots are the most popular AI technology in businesses today. Almost 70% of companies already use them for customer service and internal use. For good reason: They’re transforming how businesses interact with customers, employees, and data.

In customer service, chatbots are automating high-volume inquiries and reducing response times from minutes to seconds—freeing up human agents to handle complex issues. In sales, chatbots deliver real-time product recommendations, pricing guidance, and quote generation.

Internally, they’re helping employees find answers instantly—from answering HR policy questions to searching technical docs or summarizing meeting notes. Across industries like financial services, healthcare, retail, and technology, chatbots have become essential tools for improving efficiency and delivering better user experiences.

The results speak for themselves: Organizations using AI-powered chatbots are saving up to 2.5 billion hours of employee time annually and boosting both productivity and customer satisfaction.

Why so many chatbot projects stall
While adoption is high, success isn't guaranteed. Getting a chatbot to work reliably in production is harder than it seems. Most teams run into the same four challenges:

Performance latency: LLMs are powerful but often slow. And when users expect instant answers, every second of delay erodes trust.
Lack of memory: Many bots can’t recall past interactions, making it impossible to have natural, multi-turn conversations.
Escalating costs: Without caching or reuse, a high volume of LLM calls can lead to ballooning operational costs.
Fragmented infrastructure: Multiple chatbot stacks across departments lead to duplicated effort and no unified governance.
How Redis helps build faster, more intelligent chatbots
Redis helps devs and businesses solve these problems by powering modern chatbot architectures with a combination of real-time speed, long- and short-term memory, semantic caching, and AI control gateways.

These capabilities make it possible to build chatbots that are production-grade from day one. Here’s what Redis brings to the table:

The world’s fastest vector database for retrieval-augmented generation (RAG)
Persistent long-term memory for contextual, multi-turn conversations
Short-term memory to help background agents collaborate efficiently
Semantic caching to reduce redundant LLM calls and cut costs by up to 90%
AI gateways for observability, access control, and governance
And our customers are seeing measurable results. Asurion improved customer service response times by more than 50% using Redis-powered GenAI, while Relevance AI reduced query latency from two seconds to just ten milliseconds, dramatically improving UXchatbot—say.

Inside a Redis-powered chatbot architecture
To understand how Redis fits in, let’s trace what happens behind the scenes when a user interacts with a chatbot — say, asking ChatGPT for a 2-day San Diego itinerary.

Redis
User query ingestion: When a user submits a query, it first enters an event queue to ensure concurrency management and reliability at scale. The system then parses and embeds the query, breaking it into key concepts and converting them into vector embeddings. When a user asks for a 2-day San Diego itinerary, Redis springs into action behind the scenes.
Vector retrieval with Redis: Redis searches for semantically relevant information—such as restaurants, parks, and travel blogs—from preprocessed content stored as embeddings.
Semantic cache lookup: Before performing any new computation, Redis checks whether a similar query has already been answered. If a cached response exists, it serves the result instantly.
Session memory retrieval: Redis retrieves prior conversation context (e.g., “traveling with kids”) to enrich the current prompt and maintain continuity.
RAG pipeline: The query, retrieved documents, and session memory are combined into a single prompt for the LLM, ensuring grounded and context-aware responses.
Response generation & storage: The LLM generates the final answer, while Redis caches it for future reuse and stores it to preserve session continuity.
Why choose Redis when building chatbots?
Redis is the fastest vector database
A vector database allows chatbots to understand meaning, not just keywords. Independent benchmarks show Redis outperforming other vector databases by up to 21×.

With Redis, a query like “update payment settings” will also match “change billing info”—thanks to vector embeddings. Redis’ hybrid search then combines vector (semantic) and keyword (exact) matching for both precision and flexibility.

That means chatbots can handle both “How do I update my profile?” and “Show me document ID #48392”—all with sub-millisecond latency.

Redis
Semantic caching reduces costs and latency
Redis
Traditional caching only recognizes identical queries. Redis’ semantic caching identifies when two questions mean the same thing, even if phrased differently.

Example:

“How do I reset my password?”
“Can I change my login credentials?”
Redis recognizes they have identical intent and returns the cached answer immediately. This reduces response times by up to 15× and LLM costs by up to 90%.

LangCache offers fully managed semantic caching
For teams who want the benefits of semantic caching without managing infrastructure, Redis offers LangCache—a fully managed caching service.

LangCache automatically manages storage, similarity checks, and LLM fallbacks through a simple REST API. Ideal for teams that want semantic caching without managing servers or clusters.

Redis
Key benefits:
No infrastructure overhead – Fully managed, scalable, and reliable.
Observability and metrics – Monitor cache hit rates and query efficiency.
Next-gen features — “LLM-as-a-judge” scoring for automated response evaluation.
LangCache entered public preview in September 2025 as part of Redis’ Fall Release, making it the fastest way to accelerate chatbot performance and efficiency.

RedisVL is the developer gateway to Redis-powered AI
RedisVL—the Redis Vector Library—is an open-source Python client that simplifies integration with Redis. It works seamlessly with frameworks like LangChain, LlamaIndex, and LiteLLM, giving devs an easy path to implement RAG, vector search, and chat memory directly from Python.

RedisVL abstracts away schema creation and low-level Redis commands, letting devs focus on building, not configuring. It’s free, fast, and built for real-world AI apps.

Redis integrates into a robust GenAI ecosystem
Redis integrates seamlessly with the modern GenAI stack—including LangChain, LangGraph, LlamaIndex, Amazon Bedrock, and more. It doesn’t replace these tools—it powers them.

Whether you’re orchestrating multi-agent workflows, routing LLMs, or managing embeddings — Redis provides the high-speed infrastructure layer that makes it all work in real time.

How Redis helped a leading global financial institution
A leading U.S. financial institution with over $1T AUM built an internal GenAI assistant to help advisors access enterprise knowledge. Their old keyword-based system (Solr) forced users to sift through irrelevant documents—or skip search entirely.

By rebuilding on Redis:

They achieved hybrid RAG search (vector and keyword) with custom ranking.
RedisVL and LangChain accelerated development.
Azure OpenAI integration ensured compliance.
Results:

GenAI adoption doubled within weeks.
90% of responses were rated positively.
Redis scaled effortlessly as usage grew—no rearchitecture required.
In-memory databases: The foundation of real-time AI and analytics
October 23, 2025
14 minute read
James Tessier
James Tessier
Key takeaways
In-memory databases store data in RAM for speed. With durability mechanisms like snapshotting and append only persistence, they enable sub-millisecond responses for real-time apps, though high-volume writes with strict durability needs may still face some disk bottlenecks.
Modern in-memory databases solve data loss and cost issues. Modern in-memory databases, such as Redis, maintain durability through persistence mechanisms while optimizing costs with tiered storage that places hot data in RAM and warm data on cheaper SSDs.
In-memory databases can serve as multi-model platforms that simplify tech stacks. Some in-memory databases (like Redis) support various data models in one engine. This can minimize "database sprawl," reducing complexity of managing multiple specialized systems while enabling faster development with a smaller infrastructure footprint.
In-memory databases are essential for real-time AI systems. They drive high-performance AI workloads by providing ultra-fast vector search capabilities for RAG pipelines, real-time feature stores for ML inference, and semantic caches that minimize expensive LLM API calls.
Think of a restaurant kitchen: a chef needs ingredients immediately. The pantry nearby keeps cooking flowing smoothly, while a basement storeroom holds the bulk supply. If every trip for ingredients required a walk downstairs, service would grind to a halt.

Traditional databases work the same way—data is kept on disk (the “basement”), which is durable but slow. In-memory databases change this dynamic by keeping data in RAM (the “pantry”), right where the application needs it.

For engineers and product leaders, the difference is real: faster queries, smoother interfaces, and the ability to process data in real time. As user expectations shift toward instant response, disk-based architectures are hitting their limits. The answer is to bring the pantry to the chef—by moving the database into memory.

This article explains the concept of an in-memory database, a database that stores data primarily in a computer's main memory (RAM) instead of on slower disk drives. We'll cover what it is, why its performance is critical for modern applications, and how it solves some of the most pressing challenges in data infrastructure today.

What is an in-memory database?
An in-memory database is a database management system that uses main memory (RAM) for data storage, while complementing traditional disk-based databases rather than replacing them. By strategically placing frequently accessed data in RAM, an in-memory database significantly reduces latency for critical operations. The performance difference is substantial: RAM access times are measured in nanoseconds compared to milliseconds for SSDs and even longer for HDDs.

The concept of in-memory computing isn’t new. Early implementations such as SAP HANA and Oracle TimesTen focused on accelerating analytical or transactional workloads by holding entire tables in memory. These were powerful but monolithic, often requiring specialized hardware or enterprise integration.

The modern era of in-memory databases was defined by the release and uptake of Redis, which demonstrated that high performance, flexible data structures, and developer accessibility could coexist in a lightweight system. Redis’s simplicity and open protocol (RESP) became the de facto interface standard, inspiring a new generation of in-memory platforms and managed services.

This speed advantage comes with trade-offs, however. RAM is orders of magnitude more expensive than disk storage and has physical capacity limitations that make it impractical for storing entire petabyte-scale datasets.

The true value of in-memory databases lies in their ability to accelerate high-frequency operations and prevent backend systems from becoming overwhelmed, while working alongside traditional storage systems that handle the vast majority of data. This complementary architecture delivers both the performance benefits of memory and the cost-effective capacity of disk storage.

While the concept is simple, a modern in-memory database system is more than just a simple data store. Key aspects include:

Optimized data structures: In-memory databases use data structures (like hashes, lists, and sorted sets) that are designed for memory-first access, optimized to minimize CPU cache misses rather than disk I/O. This makes operations more efficient compared to the B-tree indexes common in disk-based relational databases, although both may use B-trees with different optimizations.
Data durability mechanisms: Since RAM is volatile (its contents are lost on power failure), in-memory databases employ strategies to ensure data durability. This is a critical trade-off that we will explore in detail.
Scalability and replication: Enterprise-grade systems are built to scale across multiple nodes and replicate data to ensure high availability and fault tolerance.
Beyond key-value: The rise of the multi-model in-memory database
Modern in-memory databases have evolved far beyond simple key-value stores into powerful, multi-model platforms that can simplify your entire tech stack.

Different vendors have taken distinct paths toward this goal:

Redis introduced support for multiple native data types (hashes, streams, JSON, time series, vectors), turning a key-value cache into a multi-model operational database.
Hazelcast evolved from an in-memory data grid to a distributed compute platform, emphasizing Java integration and event streaming.
Valkey, a fork of open-source Redis, seeks protocol compatibility but is still limited in the variety of support for native data types compared to Redis.
Managed services such as Amazon ElastiCache and Google Cloud Memorystore use Redis OSS or its forks, but typically lag advanced features like append-only persistence (AOF) or tiered storage for operational simplicity.
Think of it like a toolbox. For years, if you needed to do more than hammer a nail (store a key-value pair), you needed a separate tool: a search engine for full-text search, a document store for JSON, a message queue for pub/sub. This leads to "database sprawl," a common headache where engineering teams must manage and maintain a complex collection of disparate systems.

This architectural complexity creates significant challenges. Developers have to write glue code to move data between systems, which introduces latency and points of failure. Operations teams face increased overhead in managing, scaling, and securing multiple specialized databases. Each hop the data makes between the cache, the search index, and the legacy database adds precious milliseconds to response times.

A multi-model in-memory database solves this by integrating support for multiple data models and data structures into a single, unified database engine. The leading in-memory databases, such as Redis, can handle multiple data models, including key-value, JSON documents, time-series data, and vector embeddings for AI.

The durability question: What happens when the power goes out?
The most common and valid concern about in-memory databases is the risk of data loss. Since random access memory (RAM) is volatile, a server reboot or power failure would, by default, wipe the entire dataset clean. This directly relates to the "D" (Durability) in ACID compliance (Atomicity, Consistency, Isolation, Durability), a fundamental set of properties that guarantee database transactions are processed reliably.

Different in-memory databases offer varying levels of ACID compliance. Some, like Redis, provide atomicity for single operations or through scripting (Lua) and lightweight transactions (MULTI/EXEC), but don't offer full ACID guarantees across multiple keys in the same way traditional relational databases do. Without robust persistence mechanisms, in-memory databases would be limited primarily to caching and other use cases where data recreation is possible.

For example, Redis Cloud supports both snapshotting and append-only persistence, allowing users to fine-tune durability at the instance level. Redis-compatible services such as ElastiCache often make durability changes difficult or impossible. These differences underscore how implementation choices impact data safety, especially in mission-critical workloads.

Mature in-memory databases solve this problem with sophisticated persistent memory mechanisms that provide durability while maintaining high performance. The two primary techniques are:

Snapshotting: This method involves taking a point-in-time copy of the entire dataset in memory and writing it to a disk storage device. Snapshots can be configured to run periodically (e.g., every hour). While simple, this approach means that any data written since the last snapshot could be lost in a failure.
Append-only persistence: Also known as an append-only file (AOF), this technique records every single write operation to a log file on disk. When the database restarts after a crash, it replays this log to reconstruct the dataset to its exact state before the failure. This offers much stronger data durability than snapshotting, as only the last fraction of a second of data might be at risk, though it can impact performance depending on fsync frequency.
By combining these methods with replication, where data is simultaneously copied to one or more replica nodes, an in-memory database system can offer robust high availability and disaster recovery, making it suitable for mission-critical workloads.

Solving the cost-performance dilemma with hybrid memory architectures
Overcoming cost barriers with tiered storage
While in-memory databases deliver exceptional performance, the high cost of RAM has historically limited adoption, especially for large datasets. Building terabyte-scale systems entirely in RAM remains financially prohibitive, forcing a choice between performance and budget.

The hybrid memory solution
Modern in-memory database systems solve this challenge with hybrid memory architectures (data tiering). Think of it like a library:

Front shelf (RAM): Popular new releases kept for immediate access
Main stacks (SSDs): Less common books accessible with minimal delay
Basement storage (Object storage): Archival texts rarely needed
This tiered approach automatically manages data placement:

"Hot" data: Frequently accessed information stays in RAM for sub-millisecond latency
"Warm" data: Less frequently accessed information lives on SSDs with acceptable millisecond-level speeds
"Cold" data: Rarely accessed archival information moves to cost-effective object storage (like S3 or Google Cloud Storage)
This transparent architecture gives developers the best of both worlds: high-performance in-memory computing for active workloads plus cost-effective scalability for massive datasets—all through a single database endpoint.

Why in-memory is essential for modern applications
In-memory computing directly targets the inherent I/O bottlenecks of disk-based architectures. Even high-performance SSDs introduce data access latency that can hinder applications requiring real-time responsiveness. By keeping data primarily in RAM, in-memory systems eliminate this storage delay, satisfying the stringent performance requirements of modern, data-intensive workloads.

Unlocking real-time user experiences
Whether displaying a gaming leaderboard that updates in real time, running a bidding platform for online advertisements, or powering a personalized e-commerce recommendation engine, a good user experience hinges on speed. In-memory databases provide the sub-millisecond response times needed to power these features, ensuring that the user sees immediate feedback based on their actions.

Enabling microservices and distributed architectures
Modern applications are often built as a collection of distributed services that communicate via APIs. In this environment, a slow, monolithic relational database can become a central bottleneck, creating cascading delays across the entire system. An in-memory database can serve as a fast data layer for various functions, such as a message broker for inter-service communication, a session store for user information, or a distributed cache, to ensure that services remain fast and decoupled.

Powering the AI and machine learning revolution
Artificial intelligence and machine learning systems are incredibly data-hungry. From fraud detection algorithms that need to analyze transactions in real time to generative AI applications that rely on Retrieval-Augmented Generation (RAG), performance is critical.

An in-memory database is a foundational component for these workloads for several reasons:

Real-time inference: ML models need fast access to feature data to make predictions. Storing these features in an in-memory database allows models to retrieve the data they need with minimal latency.
Semantic caching: The results of expensive calls to large language models (LLMs) can be cached. An in-memory cache can store the semantic meaning of queries, allowing common questions to be answered instantly without calling the LLM again, which saves time and money.
Vector search: For AI applications like semantic search and RAG, data is converted into vector embeddings. An in-memory database with vector indexing capabilities can search through millions of these vectors in milliseconds to find the most relevant context for an AI model, enabling fluid, real-time conversational experiences.
State management: AI applications require quick access to user preferences and session data to provide personalized experiences. In-memory databases excel at maintaining this state information with the speed needed for real-time interactions.
Hybrid search capabilities: By combining vector search with traditional filtering methods, in-memory databases can apply constraints like specific time frames, categories, or locations, making vector queries more effective and relevant to user needs.
Agent memory: AI agents need to remember past interactions, actions, and facts to operate coherently over time. An in-memory database can serve as the agent’s short- and medium-term memory, storing and retrieving conversation history, task progress, and contextual knowledge at low latency which enables more natural, consistent, and context-aware experiences.
The architectural heart of real-time AI
An in-memory database offers significant advantages for advanced AI applications. Beyond raw speed, it provides the architectural backbone that lets AI systems function in real time. This is especially important for memory-intensive workloads, where fluid, natural conversations depend on instant access to context.

One of the clearest examples is the Retrieval-Augmented Generation (RAG) pattern described previously. When a user asks a question, the application must pull relevant context from vast datasets in milliseconds. An in-memory database serving as a vector database makes this feasible, ensuring that latency in retrieval doesn’t break the conversational flow.

Similarly, semantic caching elevates a cache from a key-value store into an intelligent memory layer. Storing the meaning of queries and responses in-memory allows agents to recall and reuse knowledge instantly, cutting both costs and response times.

Together, these capabilities show why the in-memory database isn’t just an optimization layer but the architectural heart of real-time AI systems that make AI agents fast, context-aware, and responsive enough to feel natural.

Common use cases for in-memory databases
Because of their focus on high-throughput and low-latency data processing, in-memory databases excel at workloads where speed is the primary concern.

Caching
The most common use case for an in-memory database is as a high-performance cache, a foundational component of any effective caching architecture. By placing an in-memory database in front of a slower, disk-based traditional database, applications can store frequently accessed data in RAM. This significantly reduces the read load on the primary database, improves response times for users, and can help optimize infrastructure costs.

Session data management
Every modern application depends on session data to deliver a seamless experience, covering all the temporary, fast-changing information that ties a user’s actions together across requests. An in-memory database provides the low-latency, high-throughput backbone for managing this data in real time, ensuring smooth performance even under heavy load.

Session data includes login status, authentication tokens, and shopping cart contents. But it also powers far more complex experiences: keeping track of participants and chat history in a Zoom call, synchronizing progress and interactions in online games, resuming playback and recommendations across devices in streaming apps, or maintaining account state and pending orders in financial platforms where speed is critical.

By storing session data in an in-memory database, applications can instantly retrieve and update information with each request, handle massive traffic spikes without degrading user experience, and provide continuity across devices and networks. Whether it’s a shopping cart, a video call, or a multiplayer game, in-memory databases make real-time session data management possible at scale.

Applications need a fast and reliable way to store data related to user sessions, such as login status, shopping cart contents, and user preferences. Storing this session data in an in-memory database ensures that it can be retrieved quickly with every page load, providing a smooth user experience even during traffic spikes.

Real-time analysis
Applications that require immediate insight from live data streams benefit greatly from in-memory speed. Examples include:

Leaderboards and real-time scoring: In gaming and e-sports, leaderboards must process and sort high volumes of concurrent score updates while reflecting player actions with minimal latency.
Fraud and anomaly detection: Financial services and cybersecurity platforms can analyze patterns in real-time data streams to detect and block fraudulent transactions or security threats as they happen. Anomaly detection can also apply when tracking real-time data from connected physical assets, such as an alerting system when the temperature of a machine in a factory spikes.
High-speed data ingestion
IoT and other sensor-based systems generate massive volumes of time-series data that must be ingested and processed quickly. An in-memory database can absorb these high-throughput streams of write operations without becoming a bottleneck, supporting real-time analysis before data is optionally persisted to longer-term storage.

In-memory databases also play a crucial role in inter-service communication, acting as a fast, shared data layer that enables microservices or distributed components to exchange information with minimal latency.

The future of databases leans towards memory
The core trade-off in database technology has always been between performance, consistency, and cost. For decades, the limitations of disk I/O and the high price of RAM forced developers to prioritize durability and cost over speed. But as the cost of memory has fallen and user expectations have risen, that calculation has changed.

The need for real-time data processing is no longer a niche requirement for specialized industries like finance or telecommunications; it is now a standard feature of mainstream applications, from e-commerce to social media to the rapidly expanding world of AI. In this context, the database can no longer be a slow, passive repository. It must be an active, high-performance engine that accelerates the application.

By moving critical data from disk storage to RAM, in-memory databases provide the foundational speed required to build the next generation of intelligent, responsive, and reliable software. They represent a fundamental shift in how we approach data architecture: one where real-time processing capabilities have become increasingly essential for competitive advantage.

Redis data types
Overview of data types supported by Redis

Redis is a data structure server. At its core, Redis provides a collection of native data types that help you solve a wide variety of problems, from caching to queuing to event processing. Below is a short description of each data type, with links to broader overviews and command references. Each overview includes a comprehensive tutorial with code samples.

Data types 
Redis Open Source implements the following data types:

String
Hash
List
Set
Sorted set
Vector set
Stream
Bitmap
Bitfield
Geospatial
JSON
Probabilistic data types
Time series
Strings 
Redis strings are the most basic Redis data type, representing a sequence of bytes. For more information, see:

Overview of Redis strings
Redis string command reference
Lists 
Redis lists are lists of strings sorted by insertion order. For more information, see:

Overview of Redis lists
Redis list command reference
Sets 
Redis sets are unordered collections of unique strings that act like the sets from your favorite programming language (for example, Java HashSets, Python sets, and so on). With a Redis set, you can add, remove, and test for existence in O(1) time (in other words, regardless of the number of set elements). For more information, see:

Overview of Redis sets
Redis set command reference
Hashes 
Redis hashes are record types modeled as collections of field-value pairs. As such, Redis hashes resemble Python dictionaries, Java HashMaps, and Ruby hashes. For more information, see:

Overview of Redis hashes
Redis hashes command reference
Sorted sets 
Redis sorted sets are collections of unique strings that maintain order by each string's associated score. For more information, see:

Overview of Redis sorted sets
Redis sorted set command reference
Vector sets 
Redis vector sets are a specialized data type designed for managing high-dimensional vector data, enabling fast and efficient vector similarity search within Redis. Vector sets are optimized for use cases involving machine learning, recommendation systems, and semantic search, where each vector represents a data point in multi-dimensional space. Vector sets supports the HNSW (hierarchical navigable small world) algorithm, allowing you to store, index, and query vectors based on the cosine similarity metric. With vector sets, Redis provides native support for hybrid search, combining vector similarity with structured filters. For more information, see:

Overview of Redis vector sets
Redis vector set command reference
Streams 
A Redis stream is a data structure that acts like an append-only log. Streams help record events in the order they occur and then syndicate them for processing. For more information, see:

Overview of Redis Streams
Redis Streams command reference
Geospatial indexes 
Redis geospatial indexes are useful for finding locations within a given geographic radius or bounding box. For more information, see:

Overview of Redis geospatial indexes
Redis geospatial indexes command reference
Bitmaps 
Redis bitmaps let you perform bitwise operations on strings. For more information, see:

Overview of Redis bitmaps
Redis bitmap command reference
Bitfields 
Redis bitfields efficiently encode multiple counters in a string value. Bitfields provide atomic get, set, and increment operations and support different overflow policies. For more information, see:

Overview of Redis bitfields
The BITFIELD command.
JSON 
Redis JSON provides structured, hierarchical arrays and key-value objects that match the popular JSON text file format. You can import JSON text into Redis objects and access, modify, and query individual data elements. For more information, see:

Overview of Redis JSON
JSON command reference
Probabilistic data types 
These data types let you gather and calculate statistics in a way that is approximate but highly efficient. The following types are available:

HyperLogLog
Bloom filter
Cuckoo filter
t-digest
Top-K
Count-min sketch
HyperLogLog 
The Redis HyperLogLog data structures provide probabilistic estimates of the cardinality (i.e., number of elements) of large sets. For more information, see:

Overview of Redis HyperLogLog
Redis HyperLogLog command reference
Bloom filter 
Redis Bloom filters let you check for the presence or absence of an element in a set. For more information, see:

Overview of Redis Bloom filters
Bloom filter command reference
Cuckoo filter 
Redis Cuckoo filters let you check for the presence or absence of an element in a set. They are similar to Bloom filters but with slightly different trade-offs between features and performance. For more information, see:

Overview of Redis Cuckoo filters
Cuckoo filter command reference
t-digest 
Redis t-digest structures estimate percentiles from a stream of data values. For more information, see:

Redis t-digest overview
t-digest command reference
Top-K 
Redis Top-K structures estimate the ranking of a data point within a stream of values. For more information, see:

Redis Top-K overview
Top-K command reference
Count-min sketch 
Redis Count-min sketch estimate the frequency of a data point within a stream of values. For more information, see:

Redis Count-min sketch overview
Count-min sketch command reference
Time series 
Redis time series structures let you store and query timestamped data points. For more information, see:

Redis time series overview
Count-min sketch command reference
Adding extensions 
To extend the features provided by the included data types, use one of these options:

Write your own custom server-side functions in Lua.
Write your own Redis module using the modules API or check out the community-supported modules.
