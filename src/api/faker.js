import faker from 'faker';

async function t(index) {
    const res = await Promise.all([index, faker.name.findName(), faker.internet.email(), faker.company.companyName()]);
    return res;
}

async function getData(count) {
    const arr = new Array(count).fill('');
    const res = await Promise.all(arr.map((el, index) => t(index)));
    return res;
}

export default getData;
