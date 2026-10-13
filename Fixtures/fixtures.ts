import { TaskView } from '../Pages/taskViewPage';
import { ToDoControls } from '../Pages/todoControlsPage';
import { CreateTask } from '../Pages/createTaskPage.ts';
import { ActionsOnTask } from '../Pages/actionsOnTaskPage';
import { test as base, expect, Page } from '@playwright/test';

type MyFixtures = {
    emptyTodoPage: void;
    pageWithOneTask: void;
    completedTasksAPI: void;
    inCompletedTasksAPI: void;
    pageWithCompletedTasks: { page: Page; completedTaskTitles: string[] };
    pageWithIncompletedTasks: { page: Page; incompletedTaskTitles: string[] };
    myPageFixture: Page;
    todoPage: ActionsOnTask;
    todoControlsPage: ToDoControls;
    taskViewPage: TaskView;
    createTaskPage: CreateTask;
    taskFixture: { page: Page; taskTitle: string };
};

export const test = base.extend<MyFixtures>({

    emptyTodoPage: async ({ page, request, myPageFixture }, use) => {
        const response = await request.get('http://localhost:8000/api/tasks');
        expect(response.ok()).toBeTruthy();
        const tasks = await response.json();
        for (const task of tasks) {
            await request.delete(`http://localhost:8000/api/tasks/${task.id}`);
        }
        await use();
    },
    pageWithOneTask: async ({ page, request, emptyTodoPage, taskFixture, myPageFixture }, use) => {
        const { taskTitle } = taskFixture;
        const response = await request.post('http://localhost:8000/api/tasks', {
            data: {
                "task": taskTitle,
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

        page.reload();
        await use();
    },
    completedTasksAPI: async ({ page, request, emptyTodoPage, pageWithCompletedTasks, myPageFixture }, use) => {
        const { completedTaskTitles } = pageWithCompletedTasks
        await Promise.all(completedTaskTitles.map(task =>
            request.post('http://localhost:8000/api/tasks', {
                data: {
                    task,
                    completed: true,
                    priority: 'medium',
                    category: 'work',
                    date: '2026-03-31'
                }
            })
        ));

        await use();
    },

    inCompletedTasksAPI: async ({ page, request, emptyTodoPage, pageWithIncompletedTasks, myPageFixture }, use) => {
        const { incompletedTaskTitles } = pageWithIncompletedTasks

        await Promise.all(incompletedTaskTitles.map(task =>
            request.post('http://localhost:8000/api/tasks', {
                data: {
                    task,
                    completed: false,
                    priority: 'high',
                    category: 'work',
                    date: '2026-03-31'
                }
            })
        ));

        await use();
    },
    taskFixture: async ({ page }, use) => {
        const dynamicTitle = `Prepare quarterly report ${Date.now()}`;
        await use({ page, taskTitle: dynamicTitle });
    },
    pageWithCompletedTasks: async ({ page }, use) => {
        const titles = [`Done 1 ${Date.now()}`, `Done 2 ${Date.now()}`, `Done 3 ${Date.now()}`];
        await use({ page, completedTaskTitles: titles });
    },
    pageWithIncompletedTasks: async ({ page }, use) => {
        const titles = [`Done 1 ${Date.now()}`, `Done 2 ${Date.now()}`, `Done 3 ${Date.now()}`];
        await use({ page, incompletedTaskTitles: titles });
    },
    myPageFixture: async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    },
    todoControlsPage: async ({ page }, use) => {
        await use(new ToDoControls(page));
    },
    taskViewPage: async ({ page }, use) => {
        await use(new TaskView(page));
    },
    createTaskPage: async ({ page }, use) => {
        await use(new CreateTask(page));
    },
    todoPage: async ({ page }, use) => {
        await use(new ActionsOnTask(page));
    },
});
export { expect } from '@playwright/test';