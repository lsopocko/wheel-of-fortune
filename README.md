# Casumo test game - Wheel of fortune

## About

I decided to use this task as opportunity for little experiment. I wanted to see how it will work when I mix Vue.js with PixiJS. I was using Vue.js for UI and interactions, and PixiJS as a renderer for animations and all fancier graphic. Apart from looking what's what in PixiJs I didn't have any experience with it before.

## Decisions I've made

1. There is no "STOP" button. To be honest I overlooked that part in task description and operated on assumption that it should work like a real wheel of fortune that stops itself on random. By the time I realized I've made a mistake I already had a solution prepared, so I decided to stick with it - hope you dont mind that.
1. It's easy to overdo such engaging task, so I've put 12 hours time limit for that. If something is missing - it means that most likely it didn't fit into this deadline.
1. I've focused on visual part, without interacting to backend. For example: number of steps of which reels are spinning should be passed by backend. Same goes for putting symbols on reels (it should be randomized).
1. There is no sound because I decided to add sounds only when there will be some time left. I would probably use PIXI.sound for that.
1. It is responsive, but it definitely requires some love.
1. I used TypeScript because it rocks and I wanted to check how well PixiJS supports it (it does quite well, until you play around with plugins).
1. Time limit I've put on myself is not enough to provide tests or use TDD approach :(
1. I've made few shortcuts in code - if you find yourself with o_O look on your face, there is @todo somewhere around probably - when @work I usually link JIRA task in places like that.
1. Didn't add background to reels, imho, they look nice without.

## Future

Well, you cannot win or lose. My ideas for those were:

1. You _win_ when draw balanced, healthy meal.
2. You _loose_ when you stuff yourself with cake and soda.

If I have time to revisit this project, I will add those scenarios for sure.

## Interesting parts

1. Whole _game_ is in src/modules/wheelOfFortune.
2. Because I'm using Vuex store to manage state, you can use Vue devtools Chrome extension to help yourself with debugging.
3. Number of Reels and Symbols per reel is configurable (see src/modules/wheelOfFortune/config.ts).
4. Mapping number of steps by which we rotated each reel (one step == rotation one symbol) to symbol (see src/modules/wheelOfFortune/getters.ts).
5. Extending PIXI classes into entities/scenes (see src/modules/wheelOfFortune/entities and src/modules/wheelOfFortune/scenes) thanks to ES6 features of TypeScript.

## Conclusions

Mixing frontend framework with PixiJS could be very beneficial for larger projects. For this task its a bit overkill, but it was definitely worth trying. I'm fully aware that I could achieve the same results without PixiJS, but it wouldn't be that fun.

It's not end product by any means, but it should be enough for you to see how I work and what skills you can expect from me.

## Project setup

### Install all dependencies:

```
npm install
```

### Compile and serve project with

```
npm run serve
```

### Go to http://localhost:8080/ and look how fast it spins!
