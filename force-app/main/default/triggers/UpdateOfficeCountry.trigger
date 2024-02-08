trigger UpdateOfficeCountry on Account (after update) {
    insContactOfficeCountryHandler.updateContactCountry(trigger.new);
}