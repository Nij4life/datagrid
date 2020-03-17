import faker from 'faker';
import { MIN_AGE, MAX_AGE, MSEC_IN_YEAR } from '../utils/constants';

const getAge = () => (Math.floor(Math.random() * (MAX_AGE - MIN_AGE) + MIN_AGE));
const getBool = () => (Math.random() > 0.5 ? 'yes' : 'no');

async function t(index) {
    const age = getAge();

    const res = await Promise.all([
      index,
      faker.name.firstName(),
      faker.name.lastName(),
      age,
      faker.address.state(),
      new Date(Date.now() - age * MSEC_IN_YEAR).toLocaleDateString(),
      getBool(),
    ]);
    return res;
}

async function getData(count) {
    const arr = new Array(count).fill('');
    const res = await Promise.all(arr.map((el, index) => t(index)));
    return res;
}

export default getData;
