import { test, expect } from '../Fixtures/fixtures';

test.describe('Task Completion Tests', () => {
    test('Should complete task via UI and verify href attribute', async ({ pageWithOneTask, todoPage, taskFixture, myPageFixture }) => {
        const taskTitle = taskFixture.taskTitle;
        await todoPage.expectTaskToBeVisible(taskTitle);
        await todoPage.expectTaskToBeInCompleted(taskTitle);
        await todoPage.clickTaskCheckbox(taskTitle);
        await todoPage.expectTaskToBeCompleted(taskTitle);
    });
    test('Should delete a task and verify it is removed from DOM', async ({ pageWithOneTask, todoPage, taskFixture, myPageFixture }) => {
        const taskTitle = taskFixture.taskTitle;
        await todoPage.expectTaskToBeVisible(taskTitle);
        await todoPage.deleteTask(taskTitle);
        await todoPage.expectTaskToBeHidden(taskTitle);
        await todoPage.expectTaskToHaveCountZero(taskTitle);
    });
});
