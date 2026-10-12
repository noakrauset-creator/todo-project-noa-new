import { TaskView } from '../Pages/taskViewPage';
import { ToDoControls } from '../Pages/todoControlsPage';
import { CreateTask } from '../Pages/createTask';
import { ActionsOnTask } from '../Pages/actionsOnTaskPage';
import { test as base, expect, Page } from '@playwright/test';

type MyFixtures = {
    emptyTodoPage: CreateTask;
    todoPage: ActionsOnTask;
    pageWithOneTask: {
        page: Page;
        taskTitle: string;
    };
    todoControlsPage: ToDoControls;
    taskViewPage: TaskView;
    pageWithCompletedTasks: { page: Page; completedTaskTitles: string[] };
    pageWithIncompletedTasks: { page: Page; incompletedTaskTitles: string[] };
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
    todoControlsPage: async ({ page }, use) => {
        await use(new ToDoControls(page));
    },

    taskViewPage: async ({ page }, use) => {
        await use(new TaskView(page));
    },

    pageWithCompletedTasks: async ({ page, request, emptyTodoPage }, use) => {
        const titles = [`Done 1 ${Date.now()}`, `Done 2 ${Date.now()}`, `Done 3 ${Date.now()}`];

        await Promise.all(titles.map(task =>
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

        await page.goto('/');
        await use({ page, completedTaskTitles: titles });
    },

    pageWithIncompletedTasks: async ({ page, request, emptyTodoPage }, use) => {
        const titles = [`Todo 1 ${Date.now()}`, `Todo 2 ${Date.now()}`, `Todo 3 ${Date.now()}`];

        await Promise.all(titles.map(task =>
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

        await page.goto('/');
        await use({ page, incompletedTaskTitles: titles });
    },

});
export { expect } from '@playwright/test';