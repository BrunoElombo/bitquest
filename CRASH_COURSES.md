# BitQuest — Crash courses

Every Land has a dojo at its entrance. Its master offers a five-module crash course: four difficulty tiers, then a boss lab. Dojo drills are untimed, cost no heart and no point, and a module can be left and resumed at any time. The syllabus below covers **every** challenge in the course, with its id, so you can revise outside the game too.

**How to follow a course:** read the summary and outcomes, then take the modules in order. For each module: read the goal, answer every drill, read every explanation, then add the concepts you missed to your Codex. Finish with the boss lab without hints, then face the real boss.

**The eight challenge types:** multiple choice, fill in the blanks, ordering, bug hunt, command, output prediction, riddle and code. Finishing a crash course means you have met every one of them.

**Combat timers:** 45 s for a monster, 35 s for a boss rune, +5 s with the Rogue. The dojo never has a timer.

| # | Course | Dojo | Master | Duration | Modules |
|---|---|---|---|---|---|
| 1 | JavaScript | Dojo of the Event Loop | Master Eventloop | 3–4 hours | 5 |
| 2 | TypeScript | Dojo of Strict Types | Master Typewright | 3–4 hours | 5 |
| 3 | Java | Dojo of the Heap | Master Javalon | 4–5 hours | 5 |
| 4 | Node.js | Dojo of the Server | Master Callback | 4–5 hours | 5 |
| 5 | Python | Dojo of the Serpent | Master Indent | 3–4 hours | 5 |
| 6 | Git | Dojo of the Three Trees | Master Branch | 2–3 hours | 5 |
| 7 | GitHub | Dojo of the Pull Request | Master Octo | 2–3 hours | 5 |
| 8 | Linux | Dojo of the Kernel | Master Shell | 3–4 hours | 5 |
| 9 | DevOps | Dojo of the Pipeline | Master Pipeline | 4–5 hours | 5 |
| 10 | AI | Dojo of the Neural Path | Master Gradient | 4–5 hours | 5 |

## JavaScript — The Callback Kraken

- **Dojo :** Dojo of the Event Loop
- **Master :** Master Eventloop
- **Duration :** 3–4 hours
- **Prerequisites :** None. This is the best first Land.
- **Boss :** The Callback Kraken — Lord of the Pyramid of Doom

**Summary :** The language of the web: values, functions, objects, asynchronous code and the browser runtime — taught through the eight challenge types the Land can throw at you.

**Outcomes :**
- Read and write short JavaScript programs without guessing what a value is.
- Use functions, objects and arrays fluently, and explain scope and closures.
- Handle promises, async/await and errors, and recognise the classic JS traps.

**Study methods :**
- Type every snippet yourself instead of only reading it. The keyboard remembers for you.
- When a prediction is wrong, explain the actual output aloud. That is where learning happens.
- Use the browser console for every “what does this print?” drill you miss twice.
- Keep a “gotcha” list: coercion, this, hoisting, the event loop. Re-read it before the boss.

### Module 1 — Foundations

**Goal :** Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.

**Concepts (6) :** let vs const · Primitive types · Strict equality · Type coercion · Template literals · Off-by-one loops

**Drills (6) :**
- `js-001` — let vs const (multiple choice)
- `js-002` — Primitive types (predict output)
- `js-003` — Strict equality (riddle)
- `js-004` — Type coercion (multiple choice)
- `js-005` — Template literals (fill in the blanks)
- `js-006` — Off-by-one loops (bug hunt)

**Method :** Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.

### Module 2 — Core reflexes

**Goal :** Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.

**Concepts (6) :** Destructuring & spread · filter and map · Objects by reference · Block scope · Arrow functions · Functions and loops

**Drills (6) :**
- `js-007` — Destructuring & spread (fill in the blanks)
- `js-008` — filter and map (write code)
- `js-009` — Objects by reference (predict output)
- `js-010` — Block scope (multiple choice)
- `js-011` — Arrow functions (riddle)
- `js-012` — Functions and loops (put in order)

**Method :** Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.

### Module 3 — Applied practice

**Goal :** Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.

**Concepts (5) :** Closures · Hoisting · Losing this · Prototype chain · Classes

**Drills (5) :**
- `js-013` — Closures (predict output)
- `js-014` — Hoisting (multiple choice)
- `js-015` — Losing this (bug hunt)
- `js-016` — Prototype chain (riddle)
- `js-017` — Classes (write code)

**Method :** For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.

### Module 4 — Expert pitfalls

**Goal :** Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.

**Concepts (5) :** Event loop · Promises · async/await errors · ES modules · Generators

**Drills (5) :**
- `js-018` — Event loop (predict output)
- `js-019` — Promises (fill in the blanks)
- `js-020` — async/await errors (put in order)
- `js-021` — ES modules (multiple choice)
- `js-022` — Generators (write code)

**Method :** Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.

### Module 5 — Boss lab

**Goal :** Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.

**Concepts (8) :** Event loop · Promises · async/await errors · ES modules · Generators · Losing this · Prototype chain · Closures

**Drills (8) :**
- `js-018` — Event loop (predict output)
- `js-019` — Promises (fill in the blanks)
- `js-020` — async/await errors (put in order)
- `js-021` — ES modules (multiple choice)
- `js-022` — Generators (write code)
- `js-015` — Losing this (bug hunt)
- `js-016` — Prototype chain (riddle)
- `js-013` — Closures (predict output)

**Method :** Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.

### Boss lab

The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.

---

## TypeScript — The Any Golem

- **Dojo :** Dojo of Strict Types
- **Master :** Master Typewright
- **Duration :** 3–4 hours
- **Prerequisites :** JavaScript basics (JS Land, or one month of practice).
- **Boss :** The Any Golem — Devourer of Types

**Summary :** JavaScript plus a type system: annotate, infer, narrow and model data so the compiler catches bugs before the runtime does.

**Outcomes :**
- Annotate functions and objects without turning everything into any.
- Narrow unknown values safely and design discriminated unions.
- Read compiler errors and use utility, mapped and conditional types.

**Study methods :**
- Read the type error bottom-up: the last line names the incompatibility.
- Prefer inference for locals and annotations for public boundaries.
- When tempted by any, write unknown and narrow it with a guard instead.
- Re-type the drill solution by hand; types are learned through the fingers.

### Module 1 — Foundations

**Goal :** Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.

**Concepts (6) :** Type annotations · Types are erased · Function signatures · The any type · Type inference · Typed arrow functions

**Drills (6) :**
- `ts-001` — Type annotations (multiple choice)
- `ts-002` — Types are erased (predict output)
- `ts-003` — Function signatures (fill in the blanks)
- `ts-004` — The any type (riddle)
- `ts-005` — Type inference (multiple choice)
- `ts-006` — Typed arrow functions (put in order)

**Method :** Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.

### Module 2 — Core reflexes

**Goal :** Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.

**Concepts (6) :** Generic functions · interface vs type · Literal union types · readonly & optional · Numeric enums · Strict mode

**Drills (6) :**
- `ts-007` — Generic functions (write code)
- `ts-008` — interface vs type (multiple choice)
- `ts-009` — Literal union types (bug hunt)
- `ts-010` — readonly & optional (fill in the blanks)
- `ts-011` — Numeric enums (predict output)
- `ts-012` — Strict mode (multiple choice)

**Method :** Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.

### Module 3 — Applied practice

**Goal :** Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.

**Concepts (5) :** Narrowing with typeof · The unknown type · Type guards · Utility types · Generics with Record

**Drills (5) :**
- `ts-013` — Narrowing with typeof (predict output)
- `ts-014` — The unknown type (riddle)
- `ts-015` — Type guards (write code)
- `ts-016` — Utility types (multiple choice)
- `ts-017` — Generics with Record (put in order)

**Method :** For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.

### Module 4 — Expert pitfalls

**Goal :** Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.

**Concepts (5) :** The satisfies operator · The never type · Discriminated unions · keyof typeof · Mapped & conditional types

**Drills (5) :**
- `ts-018` — The satisfies operator (multiple choice)
- `ts-019` — The never type (riddle)
- `ts-020` — Discriminated unions (write code)
- `ts-021` — keyof typeof (bug hunt)
- `ts-022` — Mapped & conditional types (fill in the blanks)

**Method :** Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.

### Module 5 — Boss lab

**Goal :** Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.

**Concepts (8) :** The satisfies operator · The never type · Discriminated unions · keyof typeof · Mapped & conditional types · Narrowing with typeof · Generics with Record · The unknown type

**Drills (8) :**
- `ts-018` — The satisfies operator (multiple choice)
- `ts-019` — The never type (riddle)
- `ts-020` — Discriminated unions (write code)
- `ts-021` — keyof typeof (bug hunt)
- `ts-022` — Mapped & conditional types (fill in the blanks)
- `ts-013` — Narrowing with typeof (predict output)
- `ts-017` — Generics with Record (put in order)
- `ts-014` — The unknown type (riddle)

**Method :** Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.

### Boss lab

The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.

---

## Java — The NullPointer Wraith

- **Dojo :** Dojo of the Heap
- **Master :** Master Javalon
- **Duration :** 4–5 hours
- **Prerequisites :** Any programming basics; variables and loops help.
- **Boss :** The NullPointer Wraith — Haunter of the Heap

**Summary :** A statically typed, object-oriented language on the JVM: classes, interfaces, collections, exceptions, streams and the build lifecycle.

**Outcomes :**
- Write classes with constructors, encapsulation and clear responsibilities.
- Choose between arrays, collections, interfaces and abstract classes.
- Handle checked and unchecked exceptions and use lambdas and streams.

**Study methods :**
- Write the class skeleton before the method body; Java rewards structure.
- Say “is-a” or “has-a” before choosing inheritance or composition.
- For every exception drill, ask: who can recover, and who must declare?
- Compile mentally: types first, then nullability, then side effects.

### Module 1 — Foundations

**Goal :** Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.

**Concepts (6) :** JDK, JRE & JVM · The main method · Integer division · The JVM · Primitives vs wrappers · Conditions

**Drills (6) :**
- `java-001` — JDK, JRE & JVM (multiple choice)
- `java-002` — The main method (fill in the blanks)
- `java-003` — Integer division (predict output)
- `java-004` — The JVM (riddle)
- `java-005` — Primitives vs wrappers (multiple choice)
- `java-006` — Conditions (bug hunt)

**Method :** Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.

### Module 2 — Core reflexes

**Goal :** Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.

**Concepts (6) :** String immutability · equals vs == · while loops · Encapsulation · Constructors & this · Arrays

**Drills (6) :**
- `java-007` — String immutability (predict output)
- `java-008` — equals vs == (multiple choice)
- `java-009` — while loops (put in order)
- `java-010` — Encapsulation (riddle)
- `java-011` — Constructors & this (fill in the blanks)
- `java-012` — Arrays (predict output)

**Method :** Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.

### Module 3 — Applied practice

**Goal :** Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.

**Concepts (5) :** Polymorphism · Checked vs unchecked · Interfaces · Abstract classes · Collections & generics

**Drills (5) :**
- `java-013` — Polymorphism (predict output)
- `java-014` — Checked vs unchecked (multiple choice)
- `java-015` — Interfaces (riddle)
- `java-016` — Abstract classes (bug hunt)
- `java-017` — Collections & generics (fill in the blanks)

**Method :** For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.

### Module 4 — Expert pitfalls

**Goal :** Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.

**Concepts (5) :** Lambdas & streams · Integer overflow · Records · Maven lifecycle · Optional & null safety

**Drills (5) :**
- `java-018` — Lambdas & streams (predict output)
- `java-019` — Integer overflow (predict output)
- `java-020` — Records (riddle)
- `java-021` — Maven lifecycle (put in order)
- `java-022` — Optional & null safety (multiple choice)

**Method :** Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.

### Module 5 — Boss lab

**Goal :** Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.

**Concepts (8) :** Lambdas & streams · Records · Maven lifecycle · Optional & null safety · Abstract classes · Collections & generics · Integer overflow · Polymorphism

**Drills (8) :**
- `java-018` — Lambdas & streams (predict output)
- `java-020` — Records (riddle)
- `java-021` — Maven lifecycle (put in order)
- `java-022` — Optional & null safety (multiple choice)
- `java-016` — Abstract classes (bug hunt)
- `java-017` — Collections & generics (fill in the blanks)
- `java-019` — Integer overflow (predict output)
- `java-013` — Polymorphism (predict output)

**Method :** Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.

### Boss lab

The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.

---

## Node.js — The Event Loop Hydra

- **Dojo :** Dojo of the Server
- **Master :** Master Callback
- **Duration :** 4–5 hours
- **Prerequisites :** JavaScript basics (JS Land) and a terminal.
- **Boss :** The Event Loop Hydra — Blocker of Threads

**Summary :** JavaScript on the server: modules, npm, files, HTTP, Express, streams, the event loop and production safety.

**Outcomes :**
- Structure a Node project with modules, scripts and dependencies.
- Serve HTTP with Express, middleware and proper error handling.
- Use fs, streams, Buffers and worker threads without blocking the loop.

**Study methods :**
- Draw the event loop before any async drill: timers, I/O, microtasks.
- Run every command drill in a scratch folder; npm rewards muscle memory.
- For HTTP, trace one request end-to-end: socket, parser, middleware, handler, response.
- Never trust input: validate, escape and parameterise before you ship.

### Module 1 — Foundations

**Goal :** Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.

**Concepts (6) :** What is Node.js · npm init · process.argv · package.json · CommonJS modules · Environment config

**Drills (6) :**
- `node-001` — What is Node.js (multiple choice)
- `node-002` — npm init (command)
- `node-003` — process.argv (predict output)
- `node-004` — package.json (riddle)
- `node-005` — CommonJS modules (fill in the blanks)
- `node-006` — Environment config (write code)

**Method :** Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.

### Module 2 — Core reflexes

**Goal :** Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.

**Concepts (6) :** Semantic versioning · Dev dependencies · The path module · fs/promises & ESM · EventEmitter · Express middleware

**Drills (6) :**
- `node-007` — Semantic versioning (multiple choice)
- `node-008` — Dev dependencies (command)
- `node-009` — The path module (predict output)
- `node-010` — fs/promises & ESM (fill in the blanks)
- `node-011` — EventEmitter (bug hunt)
- `node-012` — Express middleware (put in order)

**Method :** Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.

### Module 3 — Applied practice

**Goal :** Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.

**Concepts (5) :** Streams · Buffers and bytes · HTTP server · Middleware chain · Express error handlers

**Drills (5) :**
- `node-013` — Streams (riddle)
- `node-014` — Buffers and bytes (predict output)
- `node-015` — HTTP server (put in order)
- `node-016` — Middleware chain (write code)
- `node-017` — Express error handlers (bug hunt)

**Method :** For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.

### Module 4 — Expert pitfalls

**Goal :** Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.

**Concepts (5) :** Event loop phases · Worker threads · Escaping HTML (XSS) · Unhandled rejections · SQL injection

**Drills (5) :**
- `node-018` — Event loop phases (predict output)
- `node-019` — Worker threads (riddle)
- `node-020` — Escaping HTML (XSS) (write code)
- `node-021` — Unhandled rejections (fill in the blanks)
- `node-022` — SQL injection (multiple choice)

**Method :** Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.

### Module 5 — Boss lab

**Goal :** Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.

**Concepts (8) :** Event loop phases · Worker threads · Escaping HTML (XSS) · Unhandled rejections · SQL injection · HTTP server · Express error handlers · Dev dependencies

**Drills (8) :**
- `node-018` — Event loop phases (predict output)
- `node-019` — Worker threads (riddle)
- `node-020` — Escaping HTML (XSS) (write code)
- `node-021` — Unhandled rejections (fill in the blanks)
- `node-022` — SQL injection (multiple choice)
- `node-015` — HTTP server (put in order)
- `node-017` — Express error handlers (bug hunt)
- `node-008` — Dev dependencies (command)

**Method :** Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.

### Boss lab

The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.

---

## Python — The Indentation Serpent

- **Dojo :** Dojo of the Serpent
- **Master :** Master Indent
- **Duration :** 3–4 hours
- **Prerequisites :** None. Python is a gentle first language.
- **Boss :** The Indentation Serpent — Mixer of Tabs and Spaces

**Summary :** Readable, powerful, everywhere: types, containers, functions, classes, exceptions, generators and the standard library.

**Outcomes :**
- Use lists, dicts, sets and comprehensions to transform data.
- Write functions and classes with clear arguments, scope and dunder methods.
- Handle errors, files, generators, decorators and context managers.

**Study methods :**
- Indent deliberately: four spaces, one block at a time, before writing the body.
- In the REPL, test one expression per line; Python explains itself when you ask.
- For mutable defaults and scope drills, draw the boxes: name → object → value.
- Read the traceback from the bottom: exception type, message, then the line.

### Module 1 — Foundations

**Goal :** Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.

**Concepts (6) :** Dynamic typing · Numbers & conversions · f-strings · Booleans · Functions & return · input() returns text

**Drills (6) :**
- `py-001` — Dynamic typing (multiple choice)
- `py-002` — Numbers & conversions (predict output)
- `py-003` — f-strings (fill in the blanks)
- `py-004` — Booleans (riddle)
- `py-005` — Functions & return (write code)
- `py-006` — input() returns text (multiple choice)

**Method :** Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.

### Module 2 — Core reflexes

**Goal :** Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.

**Concepts (6) :** Indexing & slicing · Loops & conditions · Sets · List comprehensions · Looping over a dict · Default & keyword args

**Drills (6) :**
- `py-007` — Indexing & slicing (predict output)
- `py-008` — Loops & conditions (put in order)
- `py-009` — Sets (riddle)
- `py-010` — List comprehensions (write code)
- `py-011` — Looping over a dict (fill in the blanks)
- `py-012` — Default & keyword args (bug hunt)

**Method :** Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.

### Module 3 — Applied practice

**Goal :** Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.

**Concepts (5) :** Mutable default argument · Scope (LEGB) · Classes & dunder methods · Virtual environments · Exceptions

**Drills (5) :**
- `py-013` — Mutable default argument (predict output)
- `py-014` — Scope (LEGB) (bug hunt)
- `py-015` — Classes & dunder methods (write code)
- `py-016` — Virtual environments (riddle)
- `py-017` — Exceptions (fill in the blanks)

**Method :** For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.

### Module 4 — Expert pitfalls

**Goal :** Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.

**Concepts (5) :** Generators & iterators · Decorators & *args/**kwargs · Context managers · The GIL & asyncio · is vs ==

**Drills (5) :**
- `py-018` — Generators & iterators (predict output)
- `py-019` — Decorators & *args/**kwargs (write code)
- `py-020` — Context managers (put in order)
- `py-021` — The GIL & asyncio (riddle)
- `py-022` — is vs == (multiple choice)

**Method :** Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.

### Module 5 — Boss lab

**Goal :** Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.

**Concepts (8) :** Generators & iterators · Decorators & *args/**kwargs · Context managers · The GIL & asyncio · is vs == · Scope (LEGB) · Exceptions · Mutable default argument

**Drills (8) :**
- `py-018` — Generators & iterators (predict output)
- `py-019` — Decorators & *args/**kwargs (write code)
- `py-020` — Context managers (put in order)
- `py-021` — The GIL & asyncio (riddle)
- `py-022` — is vs == (multiple choice)
- `py-014` — Scope (LEGB) (bug hunt)
- `py-017` — Exceptions (fill in the blanks)
- `py-013` — Mutable default argument (predict output)

**Method :** Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.

### Boss lab

The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.

---

## Git — The Merge Conflict Chimera

- **Dojo :** Dojo of the Three Trees
- **Master :** Master Branch
- **Duration :** 2–3 hours
- **Prerequisites :** Basic command line (Linux Land helps).
- **Boss :** The Merge Conflict Chimera — <<<<<<< HEAD of Chaos

**Summary :** Time travel for your code: snapshots, branches, merges, conflicts, remotes and the recovery tools that save a bad afternoon.

**Outcomes :**
- Explain the working tree, the index and the repository, and move changes between them.
- Create branches, merge them and resolve conflicts without panic.
- Use stash, reflog, reset and remotes to recover and collaborate.

**Study methods :**
- Draw the three areas and the arrows between them before every command drill.
- Run every command in a throwaway repository; mistakes are free there.
- Read `git status` and `git log --oneline --graph` after each step.
- When a conflict appears, identify “ours”, “theirs” and the desired result before editing.

### Module 1 — Foundations

**Goal :** Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.

**Concepts (6) :** Version control · git init · The three areas · Untracked files · Commit · Add & commit

**Drills (6) :**
- `git-001` — Version control (multiple choice)
- `git-002` — git init (command)
- `git-003` — The three areas (multiple choice)
- `git-004` — Untracked files (predict output)
- `git-005` — Commit (riddle)
- `git-006` — Add & commit (fill in the blanks)

**Method :** Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.

### Module 2 — Core reflexes

**Goal :** Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.

**Concepts (6) :** .gitignore patterns · Create a branch · Contribution workflow · Three-way merge · Conflict markers · Stash

**Drills (6) :**
- `git-007` — .gitignore patterns (bug hunt)
- `git-008` — Create a branch (command)
- `git-009` — Contribution workflow (put in order)
- `git-010` — Three-way merge (predict output)
- `git-011` — Conflict markers (fill in the blanks)
- `git-012` — Stash (riddle)

**Method :** Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.

### Module 3 — Applied practice

**Goal :** Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.

**Concepts (5) :** Push & upstream · Interactive rebase · reset --soft · Rebase vs merge · Conventional Commits

**Drills (5) :**
- `git-013` — Push & upstream (command)
- `git-014` — Interactive rebase (fill in the blanks)
- `git-015` — reset --soft (predict output)
- `git-016` — Rebase vs merge (multiple choice)
- `git-017` — Conventional Commits (bug hunt)

**Method :** For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.

### Module 4 — Expert pitfalls

**Goal :** Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.

**Concepts (5) :** git revert · Cherry-pick · Tagging a release · git bisect · Reflog recovery

**Drills (5) :**
- `git-018` — git revert (command)
- `git-019` — Cherry-pick (command)
- `git-020` — Tagging a release (put in order)
- `git-021` — git bisect (riddle)
- `git-022` — Reflog recovery (multiple choice)

**Method :** Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.

### Module 5 — Boss lab

**Goal :** Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.

**Concepts (8) :** git revert · Tagging a release · git bisect · Reflog recovery · Interactive rebase · reset --soft · Conventional Commits · Cherry-pick

**Drills (8) :**
- `git-018` — git revert (command)
- `git-020` — Tagging a release (put in order)
- `git-021` — git bisect (riddle)
- `git-022` — Reflog recovery (multiple choice)
- `git-014` — Interactive rebase (fill in the blanks)
- `git-015` — reset --soft (predict output)
- `git-017` — Conventional Commits (bug hunt)
- `git-019` — Cherry-pick (command)

**Method :** Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.

### Boss lab

The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.

---

## GitHub — The Stale PR Phantom

- **Dojo :** Dojo of the Pull Request
- **Master :** Master Octo
- **Duration :** 2–3 hours
- **Prerequisites :** Git basics (Git Land).
- **Boss :** The Stale PR Phantom — Keeper of 400 Unread Notifications

**Summary :** Collaborate, review, ship: forks, branches, pull requests, reviews, issues, Actions and releases.

**Outcomes :**
- Contribute through a fork and a focused pull request.
- Review code constructively and use issues to plan work.
- Automate checks with Actions and publish a release.

**Study methods :**
- Keep one pull request = one idea; split anything you cannot describe in one sentence.
- Write the PR description before the code: problem, change, test plan.
- Review the diff, not the author. Ask questions, then suggest.
- Watch one Actions run from start to finish; logs are the skill.

### Module 1 — Foundations

**Goal :** Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.

**Concepts (6) :** Git vs GitHub · Fork · gh repo clone · Issues & labels · Community files · gh issue list

**Drills (6) :**
- `gh-001` — Git vs GitHub (multiple choice)
- `gh-002` — Fork (riddle)
- `gh-003` — gh repo clone (command)
- `gh-004` — Issues & labels (multiple choice)
- `gh-005` — Community files (fill in the blanks)
- `gh-006` — gh issue list (command)

**Method :** Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.

### Module 2 — Core reflexes

**Goal :** Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.

**Concepts (6) :** Closing keywords · Fork & PR flow · Branch protection · Workflow anatomy · gh pr create · GitHub Pages

**Drills (6) :**
- `gh-007` — Closing keywords (predict output)
- `gh-008` — Fork & PR flow (put in order)
- `gh-009` — Branch protection (multiple choice)
- `gh-010` — Workflow anatomy (fill in the blanks)
- `gh-011` — gh pr create (command)
- `gh-012` — GitHub Pages (riddle)

**Method :** Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.

### Module 3 — Applied practice

**Goal :** Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.

**Concepts (5) :** Using secrets · Build matrix · gh pr checkout · CODEOWNERS · CI steps & artifacts

**Drills (5) :**
- `gh-013` — Using secrets (bug hunt)
- `gh-014` — Build matrix (predict output)
- `gh-015` — gh pr checkout (command)
- `gh-016` — CODEOWNERS (predict output)
- `gh-017` — CI steps & artifacts (put in order)

**Method :** For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.

### Module 4 — Expert pitfalls

**Goal :** Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.

**Concepts (5) :** Dependabot · Conditional jobs · Caching & secrets · GitHub Releases · Leaked credentials

**Drills (5) :**
- `gh-018` — Dependabot (riddle)
- `gh-019` — Conditional jobs (bug hunt)
- `gh-020` — Caching & secrets (fill in the blanks)
- `gh-021` — GitHub Releases (command)
- `gh-022` — Leaked credentials (multiple choice)

**Method :** Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.

### Module 5 — Boss lab

**Goal :** Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.

**Concepts (8) :** Dependabot · Conditional jobs · Caching & secrets · GitHub Releases · Leaked credentials · Build matrix · CI steps & artifacts · Using secrets

**Drills (8) :**
- `gh-018` — Dependabot (riddle)
- `gh-019` — Conditional jobs (bug hunt)
- `gh-020` — Caching & secrets (fill in the blanks)
- `gh-021` — GitHub Releases (command)
- `gh-022` — Leaked credentials (multiple choice)
- `gh-014` — Build matrix (predict output)
- `gh-017` — CI steps & artifacts (put in order)
- `gh-013` — Using secrets (bug hunt)

**Method :** Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.

### Boss lab

The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.

---

## Linux — The Kernel Panic Golem

- **Dojo :** Dojo of the Kernel
- **Master :** Master Shell
- **Duration :** 3–4 hours
- **Prerequisites :** None; a terminal on any OS is enough to follow along.
- **Boss :** The Kernel Panic Golem — Wielder of rm -rf

**Summary :** Master the command line: the filesystem, permissions, pipes, processes, packages, networking and backups.

**Outcomes :**
- Navigate the filesystem and read, find and combine files with the shell.
- Reason about permissions, processes, signals and exit codes.
- Automate a small task with a script, cron, ssh and a backup.

**Study methods :**
- Use `man` and `--help` before guessing; the manual is part of the skill.
- Say what a pipe does to stdout and stderr before running it.
- For permissions, convert between symbolic and numeric until it is automatic.
- Test destructive commands on a scratch folder, never on your home directory.

### Module 1 — Foundations

**Goal :** Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.

**Concepts (6) :** Filesystem hierarchy · Reading files: tail · Listing files: ls · The root directory · Relative paths & cd · mkdir & cp options

**Drills (6) :**
- `linux-001` — Filesystem hierarchy (multiple choice)
- `linux-002` — Reading files: tail (command)
- `linux-003` — Listing files: ls (command)
- `linux-004` — The root directory (riddle)
- `linux-005` — Relative paths & cd (predict output)
- `linux-006` — mkdir & cp options (fill in the blanks)

**Method :** Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.

### Module 2 — Core reflexes

**Goal :** Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.

**Concepts (6) :** chmod: execute bit · Numeric permissions & chown · Pipes · Counting lines: wc · sort & uniq · Redirection > vs >>

**Drills (6) :**
- `linux-007` — chmod: execute bit (command)
- `linux-008` — Numeric permissions & chown (fill in the blanks)
- `linux-009` — Pipes (riddle)
- `linux-010` — Counting lines: wc (command)
- `linux-011` — sort & uniq (predict output)
- `linux-012` — Redirection > vs >> (bug hunt)

**Method :** Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.

### Module 3 — Applied practice

**Goal :** Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.

**Concepts (5) :** Shell scripts & exit codes · Processes & signals · Exit status $? · The PATH variable · apt & systemd

**Drills (5) :**
- `linux-013` — Shell scripts & exit codes (put in order)
- `linux-014` — Processes & signals (command)
- `linux-015` — Exit status $? (predict output)
- `linux-016` — The PATH variable (riddle)
- `linux-017` — apt & systemd (fill in the blanks)

**Method :** For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.

### Module 4 — Expert pitfalls

**Goal :** Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.

**Concepts (5) :** HTTP with curl · sed & awk · Scheduling with cron · ssh & scp · Backups with tar & du

**Drills (5) :**
- `linux-018` — HTTP with curl (command)
- `linux-019` — sed & awk (predict output)
- `linux-020` — Scheduling with cron (riddle)
- `linux-021` — ssh & scp (bug hunt)
- `linux-022` — Backups with tar & du (put in order)

**Method :** Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.

### Module 5 — Boss lab

**Goal :** Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.

**Concepts (8) :** HTTP with curl · sed & awk · Scheduling with cron · ssh & scp · Backups with tar & du · apt & systemd · Filesystem hierarchy · Shell scripts & exit codes

**Drills (8) :**
- `linux-018` — HTTP with curl (command)
- `linux-019` — sed & awk (predict output)
- `linux-020` — Scheduling with cron (riddle)
- `linux-021` — ssh & scp (bug hunt)
- `linux-022` — Backups with tar & du (put in order)
- `linux-017` — apt & systemd (fill in the blanks)
- `linux-001` — Filesystem hierarchy (multiple choice)
- `linux-013` — Shell scripts & exit codes (put in order)

**Method :** Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.

### Boss lab

The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.

---

## DevOps — The Pipeline Dragon

- **Dojo :** Dojo of the Pipeline
- **Master :** Master Pipeline
- **Duration :** 4–5 hours
- **Prerequisites :** Linux and Git basics; a little Node or Python helps.
- **Boss :** The Pipeline Dragon — Breaker of Production on Fridays

**Summary :** Build, ship, run, observe: containers, CI/CD, infrastructure as code, cloud, monitoring and incident response.

**Outcomes :**
- Containerise an app and explain image, container, volume and network.
- Design a CI/CD pipeline with tests, builds and safe deploys.
- Monitor a service and debug a failing deployment from logs and metrics.

**Study methods :**
- Trace one commit from push to production; name every stage aloud.
- For Docker, compare the image (recipe) with the container (running instance).
- Write the rollback plan before the deploy plan.
- Read one real incident post-mortem; note the detection, mitigation and prevention.

### Module 1 — Foundations

**Goal :** Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.

**Concepts (6) :** DevOps culture · Containers vs VMs · Image vs container · docker run · Dockerfile basics · Docker CLI essentials

**Drills (6) :**
- `devops-001` — DevOps culture (multiple choice)
- `devops-002` — Containers vs VMs (multiple choice)
- `devops-003` — Image vs container (riddle)
- `devops-004` — docker run (command)
- `devops-005` — Dockerfile basics (fill in the blanks)
- `devops-006` — Docker CLI essentials (fill in the blanks)

**Method :** Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.

### Module 2 — Core reflexes

**Goal :** Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.

**Concepts (6) :** CI/CD pipeline · docker logs · Running vs stopped · CI vs CD · WORKDIR vs RUN cd · Docker Compose

**Drills (6) :**
- `devops-007` — CI/CD pipeline (put in order)
- `devops-008` — docker logs (command)
- `devops-009` — Running vs stopped (predict output)
- `devops-010` — CI vs CD (multiple choice)
- `devops-011` — WORKDIR vs RUN cd (bug hunt)
- `devops-012` — Docker Compose (fill in the blanks)

**Method :** Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.

### Module 3 — Applied practice

**Goal :** Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.

**Concepts (5) :** kubectl apply · Self-healing replicas · Monitoring metrics · Multi-stage builds · terraform plan

**Drills (5) :**
- `devops-013` — kubectl apply (command)
- `devops-014` — Self-healing replicas (predict output)
- `devops-015` — Monitoring metrics (riddle)
- `devops-016` — Multi-stage builds (multiple choice)
- `devops-017` — terraform plan (command)

**Method :** For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.

### Module 4 — Expert pitfalls

**Goal :** Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.

**Concepts (5) :** Terraform workflow · Canary release · Service selectors · Rollback a rollout · Error budget

**Drills (5) :**
- `devops-018` — Terraform workflow (put in order)
- `devops-019` — Canary release (riddle)
- `devops-020` — Service selectors (bug hunt)
- `devops-021` — Rollback a rollout (command)
- `devops-022` — Error budget (predict output)

**Method :** Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.

### Module 5 — Boss lab

**Goal :** Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.

**Concepts (8) :** Terraform workflow · Canary release · Service selectors · Rollback a rollout · Error budget · Multi-stage builds · Docker Compose · kubectl apply

**Drills (8) :**
- `devops-018` — Terraform workflow (put in order)
- `devops-019` — Canary release (riddle)
- `devops-020` — Service selectors (bug hunt)
- `devops-021` — Rollback a rollout (command)
- `devops-022` — Error budget (predict output)
- `devops-016` — Multi-stage builds (multiple choice)
- `devops-012` — Docker Compose (fill in the blanks)
- `devops-013` — kubectl apply (command)

**Method :** Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.

### Boss lab

The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.

---

## AI — The Hallucinating Oracle

- **Dojo :** Dojo of the Neural Path
- **Master :** Master Gradient
- **Duration :** 4–5 hours
- **Prerequisites :** Python basics and a little algebra (functions, averages).
- **Boss :** The Hallucinating Oracle — Prophet of Things That Never Were

**Summary :** Teach machines to learn: data, loss, gradients, evaluation, neural networks, transformers, RAG and safety.

**Outcomes :**
- Frame a problem as supervised or unsupervised and split data honestly.
- Explain loss, gradient descent, overfitting and the right metric.
- Describe transformers, embeddings, RAG and the main failure modes.

**Study methods :**
- For every model, write inputs, outputs, loss and metric in one line.
- Always ask what the baseline is; a model must beat something.
- Draw the training loop: forward, loss, backward, step, repeat.
- Treat hallucinations as a product risk, not a funny bug: verify with retrieval.

### Module 1 — Foundations

**Goal :** Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.

**Concepts (6) :** AI, ML and deep learning · Supervised vs unsupervised · Features and labels · Train / test split · Training vs inference · Accuracy

**Drills (6) :**
- `ai-001` — AI, ML and deep learning (multiple choice)
- `ai-002` — Supervised vs unsupervised (multiple choice)
- `ai-003` — Features and labels (riddle)
- `ai-004` — Train / test split (predict output)
- `ai-005` — Training vs inference (fill in the blanks)
- `ai-006` — Accuracy (write code)

**Method :** Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.

### Module 2 — Core reflexes

**Goal :** Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.

**Concepts (6) :** Overfitting · Loss: mean squared error · Gradient descent · A gradient descent step · k-nearest neighbours · Feature scaling

**Drills (6) :**
- `ai-007` — Overfitting (multiple choice)
- `ai-008` — Loss: mean squared error (predict output)
- `ai-009` — Gradient descent (riddle)
- `ai-010` — A gradient descent step (fill in the blanks)
- `ai-011` — k-nearest neighbours (bug hunt)
- `ai-012` — Feature scaling (write code)

**Method :** Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.

### Module 3 — Applied practice

**Goal :** Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.

**Concepts (5) :** An artificial neuron · Backpropagation · Precision and recall · Embeddings · Softmax

**Drills (5) :**
- `ai-013` — An artificial neuron (predict output)
- `ai-014` — Backpropagation (multiple choice)
- `ai-015` — Precision and recall (write code)
- `ai-016` — Embeddings (riddle)
- `ai-017` — Softmax (bug hunt)

**Method :** For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.

### Module 4 — Expert pitfalls

**Goal :** Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.

**Concepts (5) :** Transformers and attention · Next-token decoding · Retrieval-augmented generation · Hallucinations · The training loop

**Drills (5) :**
- `ai-018` — Transformers and attention (multiple choice)
- `ai-019` — Next-token decoding (predict output)
- `ai-020` — Retrieval-augmented generation (multiple choice)
- `ai-021` — Hallucinations (riddle)
- `ai-022` — The training loop (put in order)

**Method :** Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.

### Module 5 — Boss lab

**Goal :** Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.

**Concepts (8) :** Transformers and attention · Next-token decoding · Hallucinations · The training loop · Precision and recall · Softmax · A gradient descent step · Retrieval-augmented generation

**Drills (8) :**
- `ai-018` — Transformers and attention (multiple choice)
- `ai-019` — Next-token decoding (predict output)
- `ai-021` — Hallucinations (riddle)
- `ai-022` — The training loop (put in order)
- `ai-015` — Precision and recall (write code)
- `ai-017` — Softmax (bug hunt)
- `ai-010` — A gradient descent step (fill in the blanks)
- `ai-020` — Retrieval-augmented generation (multiple choice)

**Method :** Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.

### Boss lab

The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.

---

_Generated from `shared/crashcourse.ts` by `npm run crashcourses -w server`. Do not edit by hand._
