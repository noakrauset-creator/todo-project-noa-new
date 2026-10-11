import { test as baseTest } from './fixtureEmptyPage';
import { Page } from '@playwright/test';
import { TaskView } from '../Pages/taskViewPage';
import { ToDoControls } from '../Pages/todoControlsPage';

type MyFixtures = {
    todoControlsPage: ToDoControls;
    taskViewPage: TaskView;
    pageWithCompletedTasks: { page: Page; completedTaskTitles: string[] };
    pageWithIncompletedTasks: { page: Page; incompletedTaskTitles: string[] };
};

export const test = baseTest.extend<MyFixtures>({
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