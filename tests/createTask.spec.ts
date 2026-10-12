import { test, expect } from '../Fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { categoryField, priorityField, description, title } from '../Helpers/constans';

test('Should create a task starting with an empty todo list', async ({ emptyTodoPage, page }) => {

    const createTask = emptyTodoPage;

    const dueDate = faker.date.future().toISOString().split('T')[0];

    await createTask.fillTitle(title);
    await createTask.fillDescription(description);
    await createTask.selectPriority(priorityField);
    await createTask.selectCategory(categoryField);
    await createTask.fillDueDate(dueDate);
    await createTask.submitClick();

    const createdTask = page.getByText(title);
    await expect(createdTask).toBeVisible();
});
