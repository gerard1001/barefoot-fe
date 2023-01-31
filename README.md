# Barefoot Nomad Project

Barefoot Nomad is a company that have business operations at different locations in the World.

## Badges

[![Maintainability](https://api.codeclimate.com/v1/badges/7af49c3e0f4c964ed6ba/maintainability)](https://codeclimate.com/github/atlp-rwanda/cabal-bn-fe/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7af49c3e0f4c964ed6ba/test_coverage)](https://codeclimate.com/github/atlp-rwanda/cabal-bn-fe/test_coverage)
[![CircleCI](https://circleci.com/gh/atlp-rwanda/cabal-bn-fe/tree/dev.svg?style=svg&circle-token=3a828943dbcc261f53265b086a2e206c25d12cf4)](https://circleci.com/gh/atlp-rwanda/cabal-bn-fe/tree/dev)

## Description

Barefoot employees travel to different locations in the World where they are executing different company's operations, due to that movement the management team needs to ensure that their employees are in good working environment where they are hospitalized better in every business trip that they take.

Barefoot works with different accommodations service providers from all locatins that they have rinesa
ns. They are building a product that will help both management and employees to communicate with accommodation owners.

mangers will have knowledge of why an employee ( Requester) is requesting for a specific trip to a given location when he/she is planning to be back and where he or she is going to stay.

travel admin where an employee is requesting to stay will know before when an employee is going to come and for how long he/ she is going to stay there.

Between an employee and his/her manager they are going to be having a real time conversation with each other, and when ever there is any update either Employee, manager or travel admin will receive a notification either via email or via the application itself.

At Barefoot we have come to conclusion of building a web app where a all employees will register and accommodation owners register and upload their accommodations .

## key Technologies

- ReactJs
- Redux
- Material UI

## Installation and Setup Instructions

clone this repository. you will need `Node.js` installed and `yarn` installed globally in your local machine.

### Installation

- `yarn install` to install all dependencies that we have in our package.json file your application to be up and running locally.

### Environment Variables

- Setup your environment Variables as you will find in `.env.example`

### Test and Start Server

To run test Suite

```bash
  yarn test
```

To start Development Server

```bash
  yarn start
```

## Dependencies

Major dependancies used in this Project are:

```json
"node":"~>14.x"
"react": "~>18.0.0",
"redux":"~>4.2.0",
"webpack":"~>5.72.0",
"react-router-dom":"~>6.3.0",
"@mui/material":"~>5.6.3"

```

## Test Setup and Executions

### test setup

unit test for this application is seted up using:

these Packages

```json
  "jest":"~>28.0.1",
  "jest-dom:":"~>4.0.0",
  "mocha:":"~>9.2.2",
  "nyc":"~>15.1.0"
```

together with `jest.config.json` they are both used ti setup unit test of our project.

### Test Suites executing

```bash
  yarn test
  yarn test_coverage
```

## Preview Application In Proction Mode

[BarefootNomad Project](https://barefoot-nomad-fe.netlify.app/)
