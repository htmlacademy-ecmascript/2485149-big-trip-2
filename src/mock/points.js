import { randomBoolean } from '../utils.js';
export const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-001',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04-001',
    isFavorite: randomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31-001'
    ],
    type: 'taxi'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-002',
    basePrice: 900,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04-002',
    isFavorite: randomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31-015'
    ],
    type: 'flight'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-003',
    basePrice: 2100,
    dateFrom: '2019-06-10T22:55:56.845Z',
    dateTo: '2019-06-12T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04-003',
    isFavorite: randomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31-009'
    ],
    type: 'ship'
  }
];
