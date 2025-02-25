import { LightningElement, wire } from 'lwc';
import getAccountData from '@salesforce/apex/AccountHelper.getAccountData';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class ImperativeApexDemo extends LightningElement {
    //lightning data table data attribute value
    data = [];
    //lightning data table columns attribute value
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Account Industry', fieldName: 'Industry' },
        { label: 'Account Rating', fieldName: 'Rating' }
    ];
    options;
    selectedIndustry;
    //will be invoked when Load Account Records button is clicked
    
    //to get the Object info
    @wire(getObjectInfo, {
        objectApiName: ACCOUNT_OBJECT
    }) accountInfo;

    //to get Industry Picklist values
    @wire(getPicklistValues,{
        recordTypeId: "$accountInfo.data.defaultRecordTypeId", 
        fieldApiName: INDUSTRY_FIELD 
    }) industryPickInfo;

    clickHandler(){
        //We can use cacheable = true in imperative Apex When we are fetching the data
        // but when you are using DML operation then you can't use cacheable = true
        getAccountData({
            //to pass value to Apex we need to pass as Object
            // the parameter must be same in Apex Class and JS file 
            inputIndustry : this.selectedIndustry
        })
        .then((result) => {
            console.log('Account Records', result);
            this.data = result;
        })
        .catch((error) => {
            console.log('Account Error', error);
        })
    }
    handleChange(event){
        this.selectedIndustry = event.target.value;
    }
}