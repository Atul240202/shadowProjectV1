trigger insContactOfficeCountry on Contact (before insert) {
    insContactOfficeCountryHandler.insertContactCountry(trigger.new);
}