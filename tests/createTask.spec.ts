import { test, expect } from '../Fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { categoryField, priorityField, description, title } from '../Helpers/constans';
import { createRandomFutureDate } from '../Helpers/utils';

test('Should create a task starting with an empty todo list', async ({ emptyTodoPage, page, createTaskPage, todoPage, goto }) => {
    const dueDate = createRandomFutureDate();

    await createTaskPage.fillTitle(title);
    await createTaskPage.fillDescription(description);
    await createTaskPage.selectPriority(priorityField);
    await createTaskPage.selectCategory(categoryField);
    await createTaskPage.fillDueDate(dueDate);
    await createTaskPage.submitClick();
    await todoPage.expectTaskToBeVisible(title);
});
