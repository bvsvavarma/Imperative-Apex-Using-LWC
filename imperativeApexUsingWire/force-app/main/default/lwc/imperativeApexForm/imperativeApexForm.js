import { LightningElement, wire, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TICKER from '@salesforce/schema/Account.TickerSymbol';
import { getFieldValue, getRecord, notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
import updateTickerRecord from '@salesforce/apex/AccountHelper.updateTickerRecord';

export default class ImperativeApexForm extends LightningElement {
    
    @api recordId;
    accountName="";
    accountTicker="";
    @wire(getRecord, {
        recordId: '$recordId',
        fields: [ACCOUNT_NAME, ACCOUNT_TICKER]
    }) outputFunction({data, error}){
        if(data){
            console.log("Get Record Account", data);
            this.accountName = getFieldValue(data, ACCOUNT_NAME);
            this.accountTicker = getFieldValue(data, ACCOUNT_TICKER);
        } else if(error){
            console.log("Error", error);
        }
    }

    changeHandler(event){
        this.accountTicker = event.target.value;
    }
    updateTickerHandler(){
        updateTickerRecord({
            recordId : this.recordId,
            newTicker : this.accountTicker
        }).then((result) => {
            console.log('Update Record Successfully', result);
            notifyRecordUpdateAvailable([{recordId: this.recordId}])
        }).catch((error)=> {
            console.log('Update Record Failed', error);
        })
    }
}