public class insContactOfficeCountryHandler {
    public static void updateContactCountry(List <Account> accList){
        Set <Id> accIds = new Set <Id>();
        if(!accList.isEmpty()){
            for(Account acc : accList){
                accIds.add(acc.Id);
            }
        }
        
        List <Contact> conList = new List <Contact>();
        List <Account> newList = [Select Id, Asgn_Office_Country__c, (Select Id, Asgn_Office_Country__c From Contacts) From Account Where Id IN:accIds];
        
        if(!newList.isEmpty()){
            for(Account acc : newList){
                for(Contact con: acc.Contacts){
                    Contact newCon = new Contact();
                    newCon.Id = con.Id;
                    newCon.Asgn_Office_Country__c = acc.Asgn_Office_Country__c;
                    conList.add(newCon);
                }
            }
        }
        
        if(!conList.isEmpty()){
            update conList;
        }
    }
    
    public static void insertContactCountry(List <Contact> conList){
        Set<Id> AccountId = new Set <Id>();
            for(Contact con : conList){
                if(con.AccountId != null){
                    AccountId.add(con.AccountId);
                }
            }
        
        Map<Id, Account> accMap = new Map<Id, Account>([Select Id From Account Where Id IN :AccountId]);
        for(Contact con: conList){
            con.Asgn_Office_Country__c = accMap.get(con.AccountId).Asgn_Office_Country__c;
        }
            
    }
}