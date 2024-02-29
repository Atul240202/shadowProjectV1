import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import fetchOpportunities from '@salesforce/apex/fetchOpportunities.fetchOpportunities';

const PAGE_SIZE = 20;
const oppList = [
    {label: 'Opportunity Id', fieldName: 'oppId', type: 'text' },
    {label: 'Opportunity Name', fieldName: 'OppUrl', type: 'url', sortable: true,
        typeAttributes: {
            label: {fieldName: 'name'},   
    }},
    {label: 'Related Name', fieldName: 'Accounturl', type: 'url', sortable: true,
        typeAttributes: {
            label: { fieldName: 'AccountName' }
    }},
    {label: 'Stage Name', fieldName: 'StageName', type: 'text' },
    {label: 'Amount', fieldName: 'Amount', type: 'currency' },
    {label: 'Close Date', fieldName: 'CloseDate', type: 'date' }
];

export default class OpportunityTable extends NavigationMixin(LightningElement) {
    @track oppList;
    @track columns = oppList;
    pageNumber = 1;
    totalRecords = 0;
    @track error;
    @track opportunities = [];

    @wire(fetchOpportunities)
    wiredOpportunities({error, data}){
        if (data) {
            this.opportunities = data;
            this.totalRecords = data.length;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.opportunities = undefined;
        }
    } 

/*
    handleRowAction(event){
        console.log("handleRowAction work");
        const fieldName = event.detail.action.name;
        const accountId = event.detail.row.AccountId;
        const oppId = event.detail.row.Id;
        if(fieldName === 'navigateToOpp'){
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: oppId,
                    objectApiName: 'Opportunity',
                    actionName: 'view'
                }
            });
        }
       else if(fieldName === 'navigateToAccount'){
            console.log('Selected Account Id:', accountId);
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: accountId,
                    objectApiName: 'Account',
                    actionName: 'view',
                    target: '_blank'
                }
            });
        }
        else {
            const eToast = new ShowToastEvent({
                title: 'Error',
                message: 'Error while  processing Action!',
                variant: 'error',
            });
            this.dispatchEvent(eToast);
        }
    }
*/
    get isFirstPage() {
        return this.pageNumber === 1;
    }
 
    get isLastPage() {
        return this.totalRecords <= PAGE_SIZE * this.pageNumber;
    }
 
    get displayData() {
        const startIndex = (this.pageNumber - 1) * PAGE_SIZE;
        return this.opportunities.slice(startIndex, startIndex + PAGE_SIZE);
    }
 
    handlePrevious() {
        if (!this.isFirstPage) {
            this.pageNumber--;
        }
    }
 
    handleNext() {
        if (!this.isLastPage) {
            this.pageNumber++;
        }
    }

}