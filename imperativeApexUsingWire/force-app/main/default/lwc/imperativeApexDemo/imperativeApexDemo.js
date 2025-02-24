import { LightningElement, wire } from 'lwc';
import getAccountData from '@salesforce/apex/AccountHelper.getAccountData';
import { getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';

export default class ImperativeApexDemo extends LightningElement {
    //lightning data table data attribute value
    data = [];
    //lightning data table columns attribute value
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Account Industry', fieldName: 'Industry' },
        { label: 'Account rating', fieldName: 'Rating' }
    ];
    options;
    //will be invoked when Load Account Records button is clicked
    
    @wire(getPicklistValues,{

    })
    clickHandler(){
        //We can use cacheable = true in imperative Apex When we are fetching the data
        // but when you are using DML operation then you can't use cacheable = true
        getAccountData().then((result) => {
            console.log('Account Records', result);
            this.data = result;
        })
        .catch((error) => {
            console.log('Account Error', error);
        })
    }

    handleChange(){

    }
}