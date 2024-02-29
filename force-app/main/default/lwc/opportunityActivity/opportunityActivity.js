import { LightningElement, api, wire } from 'lwc';
import getTasks from '@salesforce/apex/OpportunityController.getTasks';

export default class OpportunityActivity extends LightningElement {
    @api recordId;
    tasks;
    
    @wire(getTasks, { opportunityId: '$recordId' })
    wiredTasks({ error, data }) {
        if (data) {
            this.tasks = data;
        } else if (error) {
            this.error = error;
        }
    }
}
