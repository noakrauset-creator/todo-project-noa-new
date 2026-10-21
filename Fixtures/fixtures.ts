import { TaskViewPage } from '../Pages/taskViewPage';
import { ToDoControlsPage } from '../Pages/todoControlsPage';
import { CreateTaskPage } from '../Pages/createTaskPage.ts';
import { ActionsOnTaskPage } from '../Pages/actionsOnTaskPage';
import { TasksApi } from '../tasksApi';
import { test as base, expect, Page } from '@playwright/test';
import { createRandomFutureDate, createRandomCategory, createRandomPriority, createRandomSentence } from '../Helpers/utils';
import { faker } from '@faker-js/faker';

type MyFixtures = {
    emptyTodoPage: void;
    createSingleTask: { taskTitle: string };
    createCompletedTasks: { completedTaskTitles: string[] };
    createInCompletedTasks: { inCompletedTaskTitles: string[] };
    goto: void;
    todoPage: ActionsOnTaskPage;
    todoControlsPage: ToDoControlsPage;
    taskViewPage: TaskViewPage;
    createTaskPage: CreateTaskPage;
    tasksApi: TasksApi;
};

export const test = base.extend<MyFixtures>({
    emptyTodoPage: async ({ tasksApi }, use) => {
        const response = await tasksApi.getTasks();
        expect(response.ok()).toBeTruthy();
        const tasks = await response.json();

        for (const task of tasks) {
            await tasksApi.deleteTask(task.id);
        }
        await use();
    },
    createSingleTask: async ({ tasksApi, emptyTodoPage }, use) => {
        const dynamicTitle = createRandomSentence();
        const response = await tasksApi.createTask({
            task: dynamicTitle,
            description: createRandomSentence(),
            priority: createRandomPriority(),
            category: createRandomCategory(),
            date: createRandomFutureDate(),
            completed: false,
        });
        expect(response.ok()).toBeTruthy();

        await use({ taskTitle: dynamicTitle });
    },
    createCompletedTasks: async ({ tasksApi, emptyTodoPage }, use) => {
        const titles = [`Done 1 ${Date.now()}`, `Done 2 ${Date.now()}`, `Done 3 ${Date.now()}`];

        await Promise.all(
            titles.map((task) =>
                tasksApi.createTask({
                    task,
                    completed: true,
                    priority: createRandomPriority(),
                    category: createRandomCategory(),
                    date: createRandomFutureDate(),
                })
            )
        );

        await use({ completedTaskTitles: titles });
    },

    createInCompletedTasks: async ({ tasksApi, emptyTodoPage }, use) => {
        const titles = [`ToDo 1 ${Date.now()}`, `ToDo 2 ${Date.now()}`, `ToDo 3 ${Date.now()}`];

        await Promise.all(
            titles.map((task) =>
                tasksApi.createTask({
                    task,
                    completed: false,
                    priority: createRandomPriority(),
                    category: createRandomCategory(),
                    date: createRandomFutureDate(),
                })
            )
        );

        await use({ inCompletedTaskTitles: titles });
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
    tasksApi: async ({ request }, use) => {
        await use(new TasksApi(request));
    },
});
export { expect } from '@playwright/test';
