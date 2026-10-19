import { faker } from '@faker-js/faker';
import { priorities, categories } from '../Helpers/constans';

export function createRandomFutureDate(): string {
    return faker.date.future().toISOString().split('T')[0];
}
export function createRandomCategory(): string {
    return faker.helpers.arrayElement(categories);
}
export function createRandomPriority(): string {
    return faker.helpers.arrayElement(priorities);
}
export function createRandomSentence(): string {
    return faker.word.words(5);
}
