import { test, expect } from '../Fixtures/fixtures';

test.describe('ToDo Bottom Controls Tests', () => {
    test('Should mark all tasks as completed when clicking Complete All Tasks', async ({ pageWithIncompletedTasks, todoControlsPage, inCompletedTasksAPI, todoPage, goto }) => {
        const { incompletedTaskTitles } = pageWithIncompletedTasks;

        await todoControlsPage.clickCompleteAllTheTasks();
        for (const title of incompletedTaskTitles) {
            await todoPage.expectTaskToBeVisible(title);
            await todoPage.expectTaskToBeCompleted(title);
        }
    });

    test('Should clear all completed tasks from the UI when clicking Clear Completed', async ({ pageWithCompletedTasks, todoControlsPage, completedTasksAPI, todoPage, goto }) => {
        const { completedTaskTitles } = pageWithCompletedTasks;

        await todoControlsPage.clickClearAllTheCompletedTasks();
        for (const title of completedTaskTitles) {
            await todoPage.expectTaskToBeHidden(title);
        }
    });

    test('Should display correct tasks left count matching incompleted tasks count', async ({ inCompletedTasksAPI, todoControlsPage, taskViewPage, pageWithIncompletedTasks, goto }) => {
        const { incompletedTaskTitles } = pageWithIncompletedTasks;
        await taskViewPage.clickIncompletedTasksButton();
        const countFromUI = await todoControlsPage.getTasksLeftCount();
        expect(countFromUI).toBe(incompletedTaskTitles.length);
    });
});
