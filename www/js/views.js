$('#home-page').live('pageinit',function() {

});



$('#save-page').live('pageinit',function() {
    $('#save-button').live('click', function() {
        var spot = {
            name: $('#save-title').val(),
            description: $('#save-description').val()
        };
        PersistenceModule.createSpot(spot);
        $.mobile.changePage($('#home-page'));
    });
});



$('#list-page').live('pageshow',function() {
    PersistenceModule.retrieveSpots(function(spots) {
        var html = '';
        for (var i = 0; i < spots.length; i++) {
            var item = '<li>' + spots[i].name + '</li>';
            html += item;
        };
        $('#list-content').html(html);
    });
});

