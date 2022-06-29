# About this project

The objective of this project is to use spaced repetition to remember things. 

You create `Decks` and every deck has `Cards`. The cards can be in different "levels", from 1 to 5. Cards in different levels, has different frecuencies to show up in the application. Cards in level:
1. are shown every day
2. are shown every 3 days
3. are shown every 7 days
4. are shown every 15 days
5. are shown every 30 days

This is the [file](./src/constants.ts) where it is configured.

All cards start in level 1. Every time you reply a card ok, it will go to the next level (you will answer it less frecuently). If you reply wrong, it will go to level 1 again. 

### Learn more about Spaced repetition
You can learn about space repetition [here](https://ncase.me/remember/) and [here](https://en.wikipedia.org/wiki/Spaced_repetition#:~:text=Spaced%20repetition%20is%20a%20method,fact%20is%20presented%20or%20said.).


## Deployment

This project is deployed [here](https://learning-cards.vercel.app/) with Vercel and Heroku for the database.

## Technologies used

Technologies used for this project
- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- The ORM used is [Prisma](https://www.prisma.io/)
- [Vercel](https://vercel.com/) for the deployment
- [Heroku](https://www.heroku.com/) for the database
- [Ant Design](https://ant.design/) as the react component library.
- Typescript, obviously.
- CSS Modules

# Getting started

## Clone the project and install dependencies

- Clone this repository:

`git clone git@github.com:danimontanaro/nowports-phone-book-app.git`

- Install dependencies:

```bash
yarn
# or
npm i
```

## Create .env file

- Create `.env` file file in the root of the project with the following variables:

```
DB_URL=file:./dev.db # if you are going to use sqlite
NEXT_PUBLIC_HOST=http://localhost:3000
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_SECRET= # for local testing set any number here
NEXTAUTH_URL=http://localhost:3000
```

- For `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` follow this instructions:

1. Go to your GitHub settings. Select Applications > Developer applications tab.
2. Pick an existing application or hit Register new application.
3. Set a few parameters for your application and get the Client ID and Client Secret.
4. After that, with the Client ID and Client secret you can set these variables.

## Set up the database

- Change provider variable in [schema.prisma](./prisma/schema.prisma) file
  `provider = "sqlite"`

- Run the following command to create your database file.

```bash
npx prisma migrate dev`
```

## Start the project in localhost

- Start the REST API server running

```bash
yarn dev
```


The server is now running on http://localhost:3000.

