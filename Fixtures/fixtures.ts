import { TaskViewPage } from '../Pages/taskViewPage';
import { ToDoControlsPage } from '../Pages/todoControlsPage';
import { CreateTaskPage } from '../Pages/createTaskPage.ts';
import { ActionsOnTaskPage } from '../Pages/actionsOnTaskPage';
import { test as base, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

type MyFixtures = {
    emptyTodoPage: void;
    createSingleTask: void;
    createCompletedTasks: { completedTaskTitles: string[] };
    createInCompletedTasks: { inCompletedTaskTitles: string[] };
    taskFixture: { taskTitle: string };
    goto: void;
    todoPage: ActionsOnTaskPage;
    todoControlsPage: ToDoControlsPage;
    taskViewPage: TaskViewPage;
    createTaskPage: CreateTaskPage;
};

export const test = base.extend<MyFixtures>({
    emptyTodoPage: async ({ page, request }, use) => {
        const response = await request.get('/api/tasks');
        expect(response.ok()).toBeTruthy();
        const tasks = await response.json();
        for (const task of tasks) {
            await request.delete(`/api/tasks/${task.id}`);
        }
        await use();
    },
    createSingleTask: async ({ page, request, emptyTodoPage, taskFixture }, use) => {
        const { taskTitle } = taskFixture;
        const response = await request.post('/api/tasks', {
            data: {
                task: taskTitle,
                description: `Complete the Q1 financial report and submit to finance team ${Date.now()}`,
                priority: 'high',
                category: 'work',
                date: faker.date.future().toISOString().split('T')[0],
                completed: false,
            },
        });

        if (!response.ok()) {
            throw new Error(`Failed to create task via API: ${response.status()}`);
        }

        await use();
    },
    createCompletedTasks: async ({ page, request, emptyTodoPage }, use) => {
        const titles = [`Done 1 ${Date.now()}`, `Done 2 ${Date.now()}`, `Done 3 ${Date.now()}`];
        await Promise.all(
            titles.map((task) =>
                request.post('/api/tasks', {
                    data: {
                        task,
                        completed: true,
                        priority: 'medium',
                        category: 'work',
                        date: faker.date.future().toISOString().split('T')[0],
                    },
                })
            )
        );
        await use({ completedTaskTitles: titles });
    },

    createInCompletedTasks: async ({ page, request, emptyTodoPage }, use) => {
        const titles = [`Done 1 ${Date.now()}`, `Done 2 ${Date.now()}`, `Done 3 ${Date.now()}`];
        await Promise.all(
            titles.map((task) =>
                request.post('/api/tasks', {
                    data: {
                        task,
                        completed: false,
                        priority: 'high',
                        category: 'work',
                        date: faker.date.future().toISOString().split('T')[0],
                    },
                })
            )
        );

        await use({ inCompletedTaskTitles: titles });
    },
    taskFixture: async ({ page }, use) => {
        const dynamicTitle = `Prepare quarterly report ${Date.now()}`;
        await use({ taskTitle: dynamicTitle });
    },
    goto: async ({ page }, use) => {
        await page.goto('/');
        await use();
    },
    todoControlsPage: async ({ page }, use) => {
        await use(new ToDoControlsPage(page));
    },
    taskViewPage: async ({ page }, use) => {
        await use(new TaskViewPage(page));
    },
    createTaskPage: async ({ page }, use) => {
        await use(new CreateTaskPage(page));
    },
    todoPage: async ({ page }, use) => {
        await use(new ActionsOnTaskPage(page));
    },
});
export { expect } from '@playwright/test';
