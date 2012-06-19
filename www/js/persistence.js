var PersistenceModule = (function() {

    var db;

    var init = function() {
        db = openDatabase("placie", "1.0", "placie", 5000000);
        createSchema();
    };


    // returns true to rollback the transaction
    var errorHandler = function (transaction, error) { 
        alert(error.message);
        return true; 
    };

 
    var nullDataHandler = function (transaction, results) {};


    var asSpot = function(row) {
        return { 
            id: row['id'], 
            name: row['name'], 
            description: row['description'] 
        };
    }


    var createSchema = function() {
        db.transaction(function(tx) {
            tx.executeSql('DROP TABLE spot', nullDataHandler, errorHandler);
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS spot (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT);',
                nullDataHandler, errorHandler);
        });
    };


    var createSpot = function(spot) {
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO spot(name, description) VALUES(?, ?);',
                [spot.name, spot.description], nullDataHandler, errorHandler);
        });
    };


    var retrieveSpots = function(callback) {
        db.transaction(function(tx) {
            tx.executeSql('SELECT id, name, description FROM spot;', [], function(transaction, results) {
                var spots = [];
                for (var i=0; i < results.rows.length; i++) { 
                    spots.push(asSpot(results.rows.item(i))); 
                }
                callback(spots);
            }, errorHandler);
        });
    };


    return {
        init: init,
        createSpot: createSpot,
        retrieveSpots: retrieveSpots
    };

})();