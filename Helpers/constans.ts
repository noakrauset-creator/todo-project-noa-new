import { priority, category } from '../Helpers/types';
export const sortOptionsPriority: Record<priority, string> = {
    low: "low",
    medium: "medium",
    high: "high"
};
export const sortOptionsCategory: Record<category, string> = {
    personal: "personal",
    work: "work",
    study: "study",
    chores: "chores",
    others: "others"
};
export const completeTaskButtons: string = 'div.checkbox a';
export const removeTaskButtons: string = 'div.delete, button.delete-btn';
export const tasksLocator: string = '.task';
export const description: string = 'Implement POM and Fixtures';
export const title: string = 'Complete Automation Assignment';
export const priorityField: priority = 'high';
export const categoryField: category = 'work';


