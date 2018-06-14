![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-42bc98.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=for-the-badge)

[![npm (scoped)](https://img.shields.io/npm/v/@engineerapart/stencil-lift.svg?style=for-the-badge)](https://www.npmjs.com/package/@engineerapart/stencil-lift)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@engineerapart/stencil-lift.svg?style=for-the-badge)](https://www.npmjs.com/package/@engineerapart/stencil-lift)
[![npm](https://img.shields.io/npm/l/@engineerapart/stencil-lift.svg?style=for-the-badge)](https://www.npmjs.com/package/@engineerapart/stencil-lift)


# Stencil

[Stencil](https://github.com/ionic-team/stencil) is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.


# Stencil Lift

Because Stencil is so new, there are several features it does not yet support: Service injection (I have a library for that too!) and Data serialization & rehydration for SSR are two big ones.

This library aims to solve the second problem: For an SSR app (which you may have chosen for SEO, for example), you need to be able to load data on the server, render your components, and pass that data to the client in order to retain the rendered components as well as "continue" where you left off.

You also don't want such a library to be intrusive: I have been building these kinds of apps for years and data orchestration code can get very messy, very quickly. Introducing __Stencil Lift__!

This project is specifically designed to be used in [Stencil applications](https://github.com/ionic-team/stencil-app-starter), but there is no particular reason it can't be used in a vanilla JS app. Instructions for doing this are below.


## Installing

To start building a new web component using Stencil, clone this repo to a new directory:

```bash
npm i @engineerapart/stencil-lift
```

or
```bash
yarn add @engineerapart/stencil-lift
```

## Using the component + data services

You don't have to set up anything. No, really. Just connect your components and go.


## Connecting Components

There are 3 steps to getting up and running.

1. In your main application element (usually app.tsx - your top-level element), wrap the entire tree with the `<stencil-lift>` component:

```js
@Component(...)
export class MyApp {
  constructor() {
    // whatever
  }

  render() {
    <stencil-lift>
      <your-app-tree></your-app-tree>
    </stencil-lift>
  }
}
```

2. Wrap a component you want to connect in the `Lift` decorator (or export your class wrapped with Lift({key: 'blah'})(YourComponent) as a Higher Order Component):

```js
import { Lift } from '@engineerapart/stencil-lift/';

@Lift({ key: 'YourDescriptiveKey' })
@Component(...)
export class MyComponent {

}

// Alternatively:
export default Lift({key: 'YourDescriptiveKey'})(YourComponent);

```

3. If you want to load data in that component on the server, and receive it on the client, add a `getInitialProps` function to your component (yes, inspired by [Next.js](https://github.com/zeit/next.js)) that returns the data in the same shape you want to receive it:

```js
import { Lift } from '@engineerapart/stencil-lift/';

@Lift({ key: 'YourDescriptiveKey' })
@Component(...)
export class MyComponent {

  @State() someKey: any; // if you know the type, put the type!

  async getInitialProps({ Lift, isServer }) => {
    const response = await fetch('http://yourapi/resource/1');
    const data = await response.json();
    // Note that 'someKey' matches the State property above!
    return { someKey: data };
  }

  render() {
    return (
      <div>
        {this.someKey.field}
      </div>
    );
  }
}
```

That's it. That is literally it. You thought that was going to be harder.


### Receiving data from the store without `getInitialProps`

You remember that data key you put in the `Lift({key})` decorator? You can receive any data you want. No really. Let's say you have a loader that executes at the top level of your app on the server. You can push this data directly into `stencil-lift` and receive it in any component that wants it.

_This also means you can load data in one component and display it in any other component_.


#### Adding data to the `<stencil-lift>` top-level component:

```js
// This can come from wherever you want it to.
const initialState = {
  bubble: {
    title: 'Hello world',
    text: 'I am the very model of a modern major general!',
  }
}

@Component(...)
export class MyApp {

  @State() initialState2: any;

  async componentWillLoad() {
    this.initialState2 = fetch(...);
  }

  render() {
    return (
      <stencil-lift initialState={{...initialState, ...initialState2}}>
        <your-app-tree></your-app-tree>
      </stencil-lift>
    );
  }
}
```


#### Receive the data wherever you want:

Same as the original example. No really.

```js
import { Lift } from '@engineerapart/stencil-lift/';

@Lift({ key: 'bubble' })
@Component(...)
export class MyComponent {

  @State() title: string;
  @State() text: string;

  render() {
    return <div>{this.title}<span>{this.text}</span></div>;
  }
}

```


# Other Uses
If it hadn't already occurred to you, you can also use Stencil Lift on the client without any data loading capabilities. Say for example you have a JSON data blob that you have in your bundle; you can inject that directly into `<stencil-lift>` to disburse it to the component tree. This allows you to have a single entry point for your data and the components simply declare what they need, instead of configuring each component with its data.

# Does this work with prerendering?
Yes. If you find any problems with it don't hesitate to open an issue :)

# Does this work client side?
Right now, it only works if you SSR and send your SSR'd page to the client. Tne next release will allow you to use this on the client as well (e.g. as a pure client app).


# API

## `stencil-lift` Properties

| Prop	| Default	| Description  	|
|---	|---	|---	|
| initialState  	| {}	| The initial data you want pushed to the store. The object's high-level keys correspond to the `key` argument used in the `Lift` decorator.  	|
| mergeState  	| false	| Merge your initialState argument with loaded data if `true`, or force it to be used wholly if `mergeState` is `false` and `initialState` is defined.  	|
| deleteOnClientLoad  	| false	| For sensitive data, you may not wish it to remain available to the Window context. This will cause it (and the corresponding JS) to be deleted from the window.  	|

All `stencil-lift` properties are optional.

## `Lift` decorator properties

| Prop	| Default	| Description  	|
|---	|---	|---	|
| key  	| ''	| [required] The redux state slice under which this component's data will be stored. You can receive data from ANY state slice - not just the one you generate.  	|



# Example
There is a working example of all of these concepts in the `src/components/example` folder.


# TODO List:
- [ ] Wire up the components to receive data changes from the redux store on the client. This is easy to do and will be in the next version.
  - This includes making this work on client as well, no ssr - a simple switch with isServer on the decorator should do it.
- [ ] Allow a Lift decorator to receive data from several state slices: Incorporate `reselect` for this.
- [ ] Support generic Redux reducers. Let you reshape your data however you see fit before it is stored.
- [ ] Support side effects in actions. This is less useful, since you can generate the side effect in your component, but you may wish to dispatch an action on the client that is consumed by a different component


# Building/Contributing

Clone the project and install dependencies:
```
git clone https://github.com/engineerapart/stencil-lift.git
cd stencil-lift
npm i && npm start (or npm start:ssr)
- or -
yarn && yarn start (or yarn start:ssr)
```

### IMPORTANT NOTE

__This note applies only to building `stencil-lift`. You can do whatever you want in your client application.__

For now, there is a bug in the Stencil compiler that causes the lift component to lose its script tag. Make sure you do not remove the line `logLevel: 'debug'` from the `stencil.config.js` file. Specifically the bug is actually in `uglify-es` when using `beautify:false` and will likely take some time to track down. Using `logLevel: debug` causes `beautify: true` to be set which prevents the problem.

The ONLY effect this has is that the built packages retain their whitespace - but since gzip compression largely takes care of this it is not a big issue.

You can disable `logLevel: 'debug'` when running the server if you want, but it must be enabled for the build step.


# License
MIT