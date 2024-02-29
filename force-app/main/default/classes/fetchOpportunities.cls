public with sharing class fetchOpportunities {
    @AuraEnabled(cacheable=true)
    public static List<DataTableWrapper> fetchOpportunities() {
        List<Opportunity> listOpp = [SELECT Id, Name ,Account.Name,AccountId, StageName, Amount, CloseDate
                                     FROM Opportunity Order By Name asc];
        List<DataTableWrapper> response = new List<DataTableWrapper>();
        for(Opportunity opp : listOpp){
            DataTableWrapper obj = new DataTableWrapper();
            obj.oppId = opp.Id;
            obj.name = opp.Name;
            obj.OppUrl = '/'+ opp.Id;
            obj.AccountName =opp.Account.Name;
            obj.Accounturl = '/'+ opp.AccountId;
            obj.StageName = opp.StageName ;
            obj.Amount = opp.Amount;
            obj.CloseDate = opp.CloseDate;  
            response.add(obj);
        }
 
        return response;
    }
    
    private class DataTableWrapper {
        @AuraEnabled
        public Id oppId {get;set;}
        @AuraEnabled
        public String name {get;set;}
        @AuraEnabled
        public String Accounturl {get;set;}
        @AuraEnabled
        public String AccountName {get;set;}
        @AuraEnabled
        public String OppUrl {get;set;}
        @AuraEnabled
        public String StageName {get;set;}
        @AuraEnabled
        public Decimal Amount {get;set;}
        @AuraEnabled
        public Date CloseDate {get;set;}
    }    
}
