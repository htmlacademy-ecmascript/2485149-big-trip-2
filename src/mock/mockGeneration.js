import { mockDestination } from './destinations';
import { mockOffers } from './offers';
import { randomBoolean } from '../utils';
export const generateMockPoints = () =>{
  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
  const mockPoints = Array.from({length:10}, (_,index)=>{
    const destination = getRandomElement(mockDestination);
    const offers = mockOffers.filter((element)=> element.type === description.type);
  });
};
