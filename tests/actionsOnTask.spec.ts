import { test, expect } from '../Fixtures/fixtures';

test.describe('Task Completion Tests', () => {
    test('Should complete task via UI and verify href attribute', async ({ pageWithOneTask, todoPage, taskFixture, myPageFixture }) => {
        const taskTitle = taskFixture.taskTitle;
        const checkboxLink = todoPage.getTaskCheckboxLink(taskTitle);
        await expect(checkboxLink).toHaveAttribute('href', /completed=false/);
        await todoPage.clickTaskCheckbox(taskTitle);
        await expect(checkboxLink).toHaveAttribute('href', /completed=true/);
    });
    test('Should delete a task and verify it is removed from DOM', async ({ pageWithOneTask, todoPage, taskFixture, myPageFixture }) => {
        const taskTitle = taskFixture.taskTitle;
        const taskContainer = todoPage.getTaskItem(taskTitle);
        await expect(taskContainer).toBeVisible();
        await todoPage.deleteTask(taskTitle);
        await expect(taskContainer).toBeHidden();
        await expect(taskContainer).toHaveCount(0);
    });
});
