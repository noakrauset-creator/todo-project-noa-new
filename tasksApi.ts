import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { createRandomFutureDate, createRandomCategory, createRandomPriority, createRandomSentence } from './Helpers/utils';
import { APIRequestContext } from '@playwright/test';

export class TasksApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async getTasks() {
        return await this.request.get('/api/tasks');
    }
    async createTask(taskData: { task: string; description?: string; priority: string; category: string; date: string; completed: boolean }) {
        return await this.request.post('/api/tasks', {
            data: taskData,
        });
    }
    async deleteTask(taskId: string | number) {
        return await this.request.delete(`/api/tasks/${taskId}`);
    }
}
