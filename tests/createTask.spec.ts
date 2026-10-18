import { test, expect } from '../Fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { categoryField, priorityField, description, title } from '../Helpers/constans';

test('Should create a task starting with an empty todo list', async ({ emptyTodoPage, page, createTaskPage, todoPage }) => {
    const dueDate = faker.date.future().toISOString().split('T')[0];

    await createTaskPage.fillTitle(title);
    await createTaskPage.fillDescription(description);
    await createTaskPage.selectPriority(priorityField);
    await createTaskPage.selectCategory(categoryField);
    await createTaskPage.fillDueDate(dueDate);
    await createTaskPage.submitClick();
    await todoPage.expectTaskToBeVisible(title);
});
