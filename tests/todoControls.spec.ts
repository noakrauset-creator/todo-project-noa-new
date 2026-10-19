import { test, expect } from '../Fixtures/fixtures';

test.describe('ToDo Bottom Controls Tests', () => {
    test('Should mark all tasks as completed when clicking Complete All Tasks', async ({ todoControlsPage, createInCompletedTasks, todoPage, goto }) => {
        const { inCompletedTaskTitles } = createInCompletedTasks;

        await todoControlsPage.clickCompleteAllTheTasks();
        for (const title of inCompletedTaskTitles) {
            await todoPage.expectTaskToBeVisible(title);
            await todoPage.expectTaskToBeCompleted(title);
        }
    });

    test('Should clear all completed tasks from the UI when clicking Clear Completed', async ({ todoControlsPage, createCompletedTasks, todoPage, goto }) => {
        const { completedTaskTitles } = createCompletedTasks;

        await todoControlsPage.clickClearAllTheCompletedTasks();
        for (const title of completedTaskTitles) {
            await todoPage.expectTaskToBeHidden(title);
        }
    });

    test('Should display correct tasks left count matching incompleted tasks count', async ({ createInCompletedTasks, todoControlsPage, taskViewPage, goto }) => {
        const { inCompletedTaskTitles } = createInCompletedTasks;
        await taskViewPage.clickIncompletedTasksButton();
        const countFromUI = await todoControlsPage.getTasksLeftCount();
        expect(countFromUI).toBe(inCompletedTaskTitles.length);
    });
});
