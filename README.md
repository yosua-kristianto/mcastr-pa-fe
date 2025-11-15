# # McAstr PA's Frontend

This repository contains implementation of frontend for my blog post titled 
**"Building an Emotion Aware Response Model through Sentiment Analysis and Information Crowding Architecture"**.

For initial setup the environment, you may use Yarn.

> Install Yarn
>
> `npm install -g yarn`

> Setting up Environment Variable
>
> Setup the `.env` file in the root project, as referenced by `.env.example`. For reference, my local environment variable is as follow:
>
> ```
> VITE_API_URI=http://localhost:8000/api
> VITE_SECRET=DYwa7BPn4l74LnalgqYqQTXg3OLSENvc
> ```
>
> Make sure the VITE_SECRET value identical with the FastAPI implementation. 


I will keep the original Vue.JS's readme md since it is helping. 

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

# Contribution

Interested to contribute in this repository? Any questions or feedbacks?

Feel free to email me to yosua_kristianto144@outlook.com