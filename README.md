## Intro

[Picpay backend challenge](https://github.com/PicPay/picpay-desafio-backend) made with node and typescript.

## Installation

Install the dependencies.

```sh
npm i
```

Fill in the environment variables(PORT is optional).

```sh
PORT=
DB_URL=
```

To test locally

```sh
npm run dev
```

## Payload

### POST

/transaction

```json
{
    "value": 100.0,
    "sender": "6533af9339a71d573ffc16cf",
    "receiver": "6533b06e39a71d573ffc16d4"
}
```

"payer" changed to "sender" and "payee" changed to "receiver"

## Build

To build and host on any platform

```sh
npm run build
```