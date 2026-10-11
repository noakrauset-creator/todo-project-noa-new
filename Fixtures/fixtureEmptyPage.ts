import { test as base, expect } from '@playwright/test';
import { CreateTask } from '../Pages/createTask';

type MyFixtures = {
    emptyTodoPage: CreateTask;
};

export const test = base.extend<MyFixtures>({
    emptyTodoPage: async ({ page, request }, use) => {
        const response = await request.get('http://localhost:8000/api/tasks');
        expect(response.ok()).toBeTruthy();
        const tasks = await response.json();
        for (const task of tasks) {
            await request.delete(`http://localhost:8000/api/tasks/${task.id}`);
        }
        await page.goto('/');
        const createTaskPage = new CreateTask(page);
        await use(createTaskPage);
    },
});

export { expect } from '@playwright/test';