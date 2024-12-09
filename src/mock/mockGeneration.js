import { mockDestination } from './destinations.js';
import { mockOffers } from './offers.js';

export const generateMockPoints = (count = 10) => {
  // Функция для генерации случайного значения
  const randomBoolean = () => Math.random() > 0.5;
  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
  const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  const mockPoints = Array.from({ length: count }, (_, index) => {
    const destination = getRandomElement(mockDestination);
    const availableOffers = mockOffers.find((offer) => offer.type === destination.type)?.offers || [];
    const selectedOffers = availableOffers.length
      ? Array.from({ length: Math.floor(Math.random() * availableOffers.length) + 1 }, () =>
        getRandomElement(availableOffers).id
      )
      : [];

    return {
      id: `point-${index + 1}`,
      basePrice: Math.floor(Math.random() * 5000) + 500, // Цена от 500 до 5500
      dateFrom: getRandomDate(new Date('2024-12-01'), new Date('2024-12-31')).toISOString(),
      dateTo: getRandomDate(new Date('2025-01-01'), new Date('2025-01-31')).toISOString(),
      destination: destination.id,
      offers: selectedOffers,
      isFavorite: randomBoolean(),
      type: destination.type, // Тип транспорта/услуги
    };
  });

  return mockPoints;
};

