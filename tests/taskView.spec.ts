import { test, expect } from '../Fixtures/fixtures';

test.describe('Task View Filters Tests', () => {
    test('Should display completed tasks and verify href attribute equals completed=true', async ({ pageWithCompletedTasks, taskViewPage, completedTasksAPI, todoPage ,goto}) => {
        const { completedTaskTitles } = pageWithCompletedTasks;

        await taskViewPage.clickcompletedTasksButton();

        for (const title of completedTaskTitles) {
            await todoPage.expectTaskToBeVisible(title);
            await todoPage.expectTaskToBeCompleted(title);
        }
    });

    test('Should display incompleted tasks and verify href attribute equals completed=false', async ({ pageWithIncompletedTasks, taskViewPage, inCompletedTasksAPI, todoPage ,goto}) => {
        const { incompletedTaskTitles } = pageWithIncompletedTasks;

        await taskViewPage.clickIncompletedTasksButton();

        for (const title of incompletedTaskTitles) {
            await todoPage.expectTaskToBeVisible(title);
            await todoPage.expectTaskToBeInCompleted(title);
        }
    });

    test('Should display all tasks when All tab is clicked', async ({ pageWithIncompletedTasks, taskViewPage, inCompletedTasksAPI, todoPage , goto }) => {
        const { incompletedTaskTitles } = pageWithIncompletedTasks;

        await taskViewPage.clickAllTheTasksButton();

        for (const title of incompletedTaskTitles) {
            await todoPage.expectTaskToBeVisible(title);
        }
    });
});
