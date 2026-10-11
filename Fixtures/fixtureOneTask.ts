import { test as baseTest } from './fixtureEmptyPage';
import { Page } from '@playwright/test';
import { ActionsOnTask } from '../Pages/actionsOnTaskPage';

type MyFixtures = {
    todoPage: ActionsOnTask;
    pageWithOneTask: {
        page: Page;
        taskTitle: string;
    };
};

export const test = baseTest.extend<MyFixtures>({
    todoPage: async ({ page }, use) => {
        await use(new ActionsOnTask(page));
    },

    pageWithOneTask: async ({ page, request, emptyTodoPage }, use) => {

        const dynamicTitle = `Prepare quarterly report ${Date.now()}`;

        const response = await request.post('http://localhost:8000/api/tasks', {
            data: {
                "task": dynamicTitle,
                "description": "Complete the Q1 financial report and submit to finance team",
                "priority": "high",
                "category": "work",
                "date": "2026-03-31",
                "completed": false
            },
        });

        if (!response.ok()) {
            throw new Error(`Failed to create task via API: ${response.status()}`);
        }

        await page.goto('/');

        await use({ page, taskTitle: dynamicTitle });
    },
});

export { expect } from '@playwright/test';