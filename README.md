## Studious Potato [![Build Status](https://travis-ci.org/li-kai/studious-potato.svg?branch=master)](https://travis-ci.org/li-kai/studious-potato)
> An attempt at a chat bot

### Setup
```bash
  # clone the repository
  λ git clone https://github.com/li-kai/studious-potato
  # change the current directory
  λ cd studious-potato
  # install all dependencies
  λ npm install
  # copy the env file for development (Mac/Unix)
  λ cp .env.sample .env
  # copy the env file for development (Windows CMD)
  λ copy .env.sample .env
  # run the project
  λ npm run dev
```

### Structure
```bash
├── README.md           # you're here
├── src                 # contains source files
└── test                # tests
```

### Included

- [Bunyan](https://github.com/trentm/node-bunyan) Bunyan logging in the development environment.
- [Babel](https://github.com/babel/babel) Support ES6/ES7 features.
- [Nodemon](https://github.com/remy/nodemon) Auto reloading with dev server.

### Scripts

- `npm run dev` - simply starts the server with hot-reloading
- `npm start` - production command
