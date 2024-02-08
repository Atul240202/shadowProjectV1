public with sharing class FetchContactFromAccount {
    @AuraEnabled(cacheable=true)
        public static List<Contact> fetchRelatedContacts(Id accountId) {
            return [SELECT  Id, FirstName, LastName, Email, MobilePhone, Asgn_Office_Country__c FROM Contact WHERE AccountId = :accountId ORDER BY FirstName Asc];
        }
    @AuraEnabled(cacheable=true)
        public static List<Account> fetchAccounts(){
            return[SELECT Id, Name from Account ORDER BY Name Asc];
        }
    }