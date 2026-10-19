import { test, expect } from '../Fixtures/fixtures';

test.describe('Task View Filters Tests', () => {
    test('Should display completed tasks and verify href attribute equals completed=true', async ({ taskViewPage, createCompletedTasks, todoPage, goto }) => {
        const { completedTaskTitles } = createCompletedTasks;

        await taskViewPage.clickcompletedTasksButton();

        for (const title of completedTaskTitles) {
            await todoPage.expectTaskToBeVisible(title);
            await todoPage.expectTaskToBeCompleted(title);
        }
    });

    test('Should display incompleted tasks and verify href attribute equals completed=false', async ({ taskViewPage, createInCompletedTasks, todoPage, goto }) => {
        const { inCompletedTaskTitles } = createInCompletedTasks;

        await taskViewPage.clickIncompletedTasksButton();

        for (const title of inCompletedTaskTitles) {
            await todoPage.expectTaskToBeVisible(title);
            await todoPage.expectTaskToBeInCompleted(title);
        }
    });

    test('Should display all tasks when All tab is clicked', async ({ taskViewPage, createInCompletedTasks, todoPage, goto }) => {
        const { inCompletedTaskTitles } = createInCompletedTasks;

        await taskViewPage.clickAllTheTasksButton();

        for (const title of inCompletedTaskTitles) {
            await todoPage.expectTaskToBeVisible(title);
        }
    });
});
