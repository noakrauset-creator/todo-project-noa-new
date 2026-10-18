import { TaskViewPage } from '../Pages/taskViewPage';
import { ToDoControlsPage } from '../Pages/todoControlsPage';
import { CreateTaskPage } from '../Pages/createTaskPage.ts';
import { ActionsOnTaskPage } from '../Pages/actionsOnTaskPage';
import { test as base, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

type MyFixtures = {
    emptyTodoPage: void;
    pageWithOneTask: void;
    completedTasksAPI: void;
    inCompletedTasksAPI: void;
    pageWithCompletedTasks: { completedTaskTitles: string[] };
    pageWithIncompletedTasks: {  incompletedTaskTitles: string[] };
    goto: void;
    todoPage: ActionsOnTaskPage;
    todoControlsPage: ToDoControlsPage;
    taskViewPage: TaskViewPage;
    createTaskPage: CreateTaskPage;
    taskFixture: { taskTitle: string };
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
    pageWithOneTask: async ({ page, request, emptyTodoPage, taskFixture }, use) => {
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
    completedTasksAPI: async ({ page, request, emptyTodoPage, pageWithCompletedTasks }, use) => {
        const { completedTaskTitles } = pageWithCompletedTasks;
        await Promise.all(
            completedTaskTitles.map((task) =>
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

        await use();
    },

    inCompletedTasksAPI: async ({ page, request, emptyTodoPage, pageWithIncompletedTasks }, use) => {
        const { incompletedTaskTitles } = pageWithIncompletedTasks;

        await Promise.all(
            incompletedTaskTitles.map((task) =>
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

        await use();
    },
    taskFixture: async ({ page }, use) => {
        const dynamicTitle = `Prepare quarterly report ${Date.now()}`;
        await use({  taskTitle: dynamicTitle });
    },
    pageWithCompletedTasks: async ({ page }, use) => {
        const titles = [`Done 1 ${Date.now()}`, `Done 2 ${Date.now()}`, `Done 3 ${Date.now()}`];
        await use({ completedTaskTitles: titles });
    },
    pageWithIncompletedTasks: async ({ page }, use) => {
        const titles = [`Done 1 ${Date.now()}`, `Done 2 ${Date.now()}`, `Done 3 ${Date.now()}`];
        await use({ incompletedTaskTitles: titles });
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
