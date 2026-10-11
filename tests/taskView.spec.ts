import { test, expect } from '../Fixtures/fixtureFewTasks';

test.describe('Task View Filters Tests', () => {

    test('Should display completed tasks and verify href attribute equals completed=true', async ({ pageWithCompletedTasks, taskViewPage }) => {
        const { completedTaskTitles } = pageWithCompletedTasks;

        await taskViewPage.clickcompletedTasksButton();

        for (const title of completedTaskTitles) {
            const checkboxLink = taskViewPage.getTaskCheckboxLink(title);
            await expect(checkboxLink).toBeVisible();
            await expect(checkboxLink).toHaveAttribute('href', /completed=true/);
        }
    });

    test('Should display incompleted tasks and verify href attribute equals completed=false', async ({ pageWithIncompletedTasks, taskViewPage }) => {
        const { incompletedTaskTitles } = pageWithIncompletedTasks;

        await taskViewPage.clickIncompletedTasksButton();

        for (const title of incompletedTaskTitles) {
            const checkboxLink = taskViewPage.getTaskCheckboxLink(title);
            await expect(checkboxLink).toBeVisible();
            await expect(checkboxLink).toHaveAttribute('href', /completed=false/);
        }
    });

    test('Should display all tasks when All tab is clicked', async ({ pageWithIncompletedTasks, taskViewPage }) => {
        const { incompletedTaskTitles } = pageWithIncompletedTasks;

        await taskViewPage.clickAllTheTasksButton();

        for (const title of incompletedTaskTitles) {
            const checkboxLink = taskViewPage.getTaskCheckboxLink(title);
            await expect(checkboxLink).toBeVisible();
        }
    });
});

