import { LightningElement, api } from 'lwc';

export default class Pagination extends LightningElement {
    @api totalRecords;
    @api recordSize = 5;
    currentPage = 1;
    totalPage = 0;
    visibleRecords = [];

    get disablePrevious(){
        return this.currentPage <= 1;
    }

    get disableNext(){
        return this.currentPage >= this.totalPage;
    }

    previousHandler(){
        if(this.currentPage > 1){
            this.currentPage = this.currentPage - 1;
            this.updateRecords();
        }
    }

    nextHandler(){
        if(this.currentPage < this.totalPage){
            this.currentPage = this.currentPage + 1;
            this.updateRecords();
        }
    }

    updateRecords(){
        const start = (this.currentPage - 1) * this.recordSize;
        const end = this.recordSize * this.currentPage;
        this.visibleRecords = this.totalRecords.slice(start, end);
        this.totalPage = Math.ceil(this.totalRecords.length / this.recordSize);
        this.dispatchEvent(new CustomEvent('update', {
            detail: {
                records: this.visibleRecords
            }
        }));
    }
}
