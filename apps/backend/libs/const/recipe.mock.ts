import { FullRecipe } from 'types/full-recipe';

const FULL_RECIPE_MOCK: FullRecipe = {
  ingredients: [
    {
      name: '쌀떡',
      amount: 400,
      unit: 'g',
      optional: false,
    },
    {
      name: '밀가루떡',
      amount: 400,
      unit: 'g',
      optional: false,
    },
    {
      name: '사각어묵',
      amount: 160,
      unit: 'g',
      optional: false,
    },
    {
      name: '양배추',
      amount: 160,
      unit: 'g',
      optional: false,
    },
    {
      name: '대파',
      amount: 240,
      unit: 'g',
      optional: false,
    },
    {
      name: '물',
      amount: 1,
      unit: 'L',
      optional: false,
    },
    {
      name: '삶은달걀',
      amount: 3,
      unit: '개',
      optional: false,
    },
    {
      name: '고추장',
      amount: 80,
      unit: 'g',
      optional: false,
    },
    {
      name: '진간장',
      amount: 50,
      unit: 'g',
      optional: false,
    },
    {
      name: '고운고춧가루',
      amount: 30,
      unit: 'g',
      optional: false,
    },
    {
      name: '굵은고춧가루',
      amount: 20,
      unit: 'g',
      optional: false,
    },
    {
      name: '황설탕',
      amount: 70,
      unit: 'g',
      optional: false,
    },
    {
      name: 'MSG',
      amount: 5,
      unit: 'g',
      optional: true,
    },
  ],
  recipe: {
    steps: [
      {
        step: 1,
        description: '대파는 어슷 썰거나 반으로 갈라 길게 썰어 준비한다.',
        optional: false,
      },
      {
        step: 2,
        description: '양배추, 어묵은 먹기 좋은 크기로 썰어 준비한다.',
        optional: false,
      },
      {
        step: 3,
        description:
          '냄비에 물, 진간장, 황설탕, 고추장, 굵은고춧가루, 고운고춧가루, 대파, 양배추를 넣어 끓인다.',
        optional: false,
      },
      {
        step: 4,
        description: '떡볶이떡은 흐르는 물에 가볍게 세척한다.',
        optional: false,
      },
      {
        step: 5,
        description: '육수가 끓으면 삶은달걀, 떡을 넣고 함께 끓여준다.',
        optional: false,
      },
      {
        step: 6,
        description: '기호에 맞게 MSG를 넣는다.',
        optional: true,
      },
      {
        step: 7,
        description: '떡을 넣고 육수가 끓어오르면 어묵을 넣어준다.',
        optional: false,
      },
      {
        step: 8,
        description: '양념장이 걸쭉하게 졸아들 때까지 끓여 완성한다.',
        optional: false,
      },
    ],
  },
};
