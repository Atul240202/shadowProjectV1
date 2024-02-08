import { LightningElement, wire, track } from 'lwc';
import fetchRelatedContacts from '@salesforce/apex/FetchContactFromAccount.fetchRelatedContacts';
import fetchAccounts from '@salesforce/apex/FetchContactFromAccount.fetchAccounts';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    { label: 'Email id', fieldName: 'Email', type: 'email' },
    { label: 'Phone no.', fieldName: 'MobilePhone', type: 'number' },
    { label: 'Office Country', fieldName: 'Asgn_Office_Country__c', type: 'text' },
    {label:'Action', type: 'button', typeAttributes: {label: 'Edit', name: 'edit'}},
];

export default class ContactTable extends NavigationMixin(LightningElement) {
    @track selectedAccId;
    @track accountOptions;
    @track contactData;

    @wire(fetchAccounts)
    getListOfAccounts({data,error}){
        if(data){
            this.accountOptions=[{ label: 'Select Account', value: '' }, ...data.map(account => ({
                label: account.Name,
                value: account.Id
            }))];
        } else if(error){
            console.error('Error in getting the list of accounts');
        }
    }

    get columns() {
        return columns;
    }

    handleAccountChange(event){
        this.selectedAccId = event.detail.value;
    }

    @wire(fetchRelatedContacts, {accountId: '$selectedAccId'})
    getListOfContacts({data,error}){
        if(data){
            this.contactData = data;
        } else if(error){
            console.error('Error in fetching contacts for the selected account');
        }
    }

    selectedContactAction(event){
        const action = event.detail.action;
        const row = event.detail.row;
        if(action.name == 'edit'){
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.Id,
                    objectApiName: 'Contact',
                    actionName: 'edit'
                }
            });
        }
    }

}