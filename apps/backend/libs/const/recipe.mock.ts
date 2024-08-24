import { mockSearchVideoResponse } from 'src/search/mock.response';
import { FullRecipe } from 'types/full-recipe';

export const FULL_RECIPES_MOCK: FullRecipe[] = [
  {
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
    products: [
      {
        id: 123,
        name: '목우촌 다리두배 닭볶음탕 (냉장), 1.2kg, 1개',
        discountRate: 25,
        basePrice: 11990,
        price: 8990,
        amount: 1.2,
        amountUnit: 'kg',
        quantity: 1,
        quantityUnit: '개',
        unitPriceText: '(100g당749원)',
        arrivalInfo: '내일(일) 새벽도착 보장',
        ratingTotalCnt: 30115,
        rewardCash: 450,
        imageUrl:
          'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/1573656659454758-6749f52e-dc38-4ee8-a9ae-d0257ac63c75.jpg',
      },
      {
        id: 422,
        name: '국내산 친환경 당근, 1.5kg, 1개',
        discountRate: null,
        basePrice: null,
        price: 10990,
        amount: 1.5,
        amountUnit: 'kg',
        quantity: 1,
        quantityUnit: '개',
        unitPriceText: '(100g당733원)',
        arrivalInfo: '',
        ratingTotalCnt: 54,
        rewardCash: null,
        imageUrl:
          'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/103612824794643-41e190db-7b85-44e0-93b6-21d7c8e67452.jpg',
      },
      {
        id: 525,
        name: '생선파는언니 순살 코다리 (냉동), 300g, 1팩',
        discountRate: null,
        basePrice: null,
        price: 7130,
        amount: 300,
        amountUnit: 'g',
        quantity: 1,
        quantityUnit: '팩',
        unitPriceText: '(100g당2,377원)',
        arrivalInfo: '',
        ratingTotalCnt: null,
        rewardCash: null,
        imageUrl:
          'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/3255583283726779-931a2278-d204-448d-9c21-007208ff800e.jpg',
      },
    ],
    video: mockSearchVideoResponse[0],
  },
];
