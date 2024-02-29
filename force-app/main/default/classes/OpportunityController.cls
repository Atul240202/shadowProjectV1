public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks(String opportunityId) {
        return [SELECT Id, Subject, Description, Status FROM Task WHERE WhatId = :opportunityId];
    }
}
