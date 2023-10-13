import { range } from 'lodash';

export const getRentalType = () => {
  return [
    ...range(1, 9).map((i) => ({
      baseCost: 5000,
      name: '시간당 요금',
      rentalType: 1,
      baseHour: 2,
      startAt: 9,
      endAt: 32,
      day: i,
      additionalServices: {
        create: {
          name: '바베큐',
          cost: 10000,
        },
      },
      timeCostInfos: {
        create: [
          {
            cost: 5000,
            time: 9,
          },
          {
            cost: 5000,
            time: 10,
          },
          {
            cost: 5000,
            time: 11,
          },
          {
            cost: 5000,
            time: 12,
          },
          {
            cost: 5000,
            time: 13,
          },
          {
            cost: 5000,
            time: 14,
          },
          {
            cost: 5000,
            time: 15,
          },
          {
            cost: 5000,
            time: 16,
          },
          {
            cost: 7000,
            time: 17,
          },
          {
            cost: 7000,
            time: 18,
          },
          {
            cost: 7000,
            time: 19,
          },
          {
            cost: 7000,
            time: 20,
          },
          {
            cost: 7000,
            time: 21,
          },
          {
            cost: 7000,
            time: 22,
          },
          {
            cost: 7000,
            time: 23,
          },
          {
            cost: 7000,
            time: 24,
          },
          {
            cost: 7000,
            time: 25,
          },
          {
            cost: 7000,
            time: 26,
          },
          {
            cost: 7000,
            time: 27,
          },
          {
            cost: 7000,
            time: 28,
          },
          {
            cost: 7000,
            time: 29,
          },
          {
            cost: 7000,
            time: 30,
          },
          {
            cost: 7000,
            time: 31,
          },
          {
            cost: 7000,
            time: 32,
          },
        ],
      },
    })),
    ...range(1, 9).map((i) => ({
      baseCost: 100000,
      name: '올데이 패키지',
      startAt: 11,
      endAt: 16,
      day: i,
      rentalType: 2,
      baseHour: 5,
      additionalServices: {
        create: {
          name: '바베큐',
          cost: 10000,
        },
      },
    })),
    ...range(1, 9).map((i) => ({
      baseCost: 150000,
      name: '올나잇 패키지',
      startAt: 19,
      endAt: 33,
      day: i,
      rentalType: 2,
      baseHour: 5,
      additionalServices: {
        create: {
          name: '바베큐',
          cost: 10000,
        },
      },
    })),
  ];
};
