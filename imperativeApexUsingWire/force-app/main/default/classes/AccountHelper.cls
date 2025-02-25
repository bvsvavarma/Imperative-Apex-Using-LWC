public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountData(String inputIndustry){
       return [
                SELECT Id, Name, Industry, Rating 
                FROM Account 
                WHERE Industry = :inputIndustry
                WITH USER_MODE
            ];
    } 

    @AuraEnabled(cacheable=true) //When ever we are using wire methoed cacheable must be true
    public static List<Account> getParentAccounts(){
        return [
            SELECT Id, Name, Industry
            FROM Account 
            WHERE AnnualRevenue != null
            WITH USER_MODE
        ];
    }

    // We are doing update operation on Account using Imperative Apex hence should not pass cacheable
    @AuraEnabled
    public static string updateTickerRecord(String recordId, String newTicker){
        Account acc = new Account(Id = recordId, TickerSymbol = newTicker);
        try{
            update acc;
            return 'Success';
        }
        catch(Exception ex){
            return ex.getMessage();
        }

    }
}