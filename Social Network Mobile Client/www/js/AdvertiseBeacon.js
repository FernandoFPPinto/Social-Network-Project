function IsAdvertisingSupported() {

    var bool = cordova.plugins.locationManager.isAdvertisingAvailable()
            .then(function(isSupported) {
                console.log("isSupported: " + isSupported);
            })
            .fail(console.error)
            .done();

}

function IsAdvertisingTurnedOn() {

    var bool = cordova.plugins.locationManager.isAdvertising()
            .then(function(isAdvertising) {
                console.log("isAdvertising: " + isAdvertising);
            })
            .fail(console.error)
            .done();

}

function StartAdvertising() {

    var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
    var identifier = 'advertisedBeacon';
    var minor = 2000;
    var major = 5;
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

// The Delegate is optional
    var delegate = new cordova.plugins.locationManager.Delegate();

// Event when advertising starts (there may be a short delay after the request)
// The property 'region' provides details of the broadcasting Beacon
    delegate.peripheralManagerDidStartAdvertising = function(pluginResult) {
        console.log('peripheralManagerDidStartAdvertising: ' + JSON.stringify(pluginResult.region));
    };
// Event when bluetooth transmission state changes 
// If 'state' is not set to BluetoothManagerStatePoweredOn when advertising cannot start
    delegate.peripheralManagerDidUpdateState = function(pluginResult) {
        console.log('peripheralManagerDidUpdateState: ' + pluginResult.state);
    };

    cordova.plugins.locationManager.setDelegate(delegate);

// Verify the platform supports transmitting as a beacon
    cordova.plugins.locationManager.isAdvertisingAvailable()
            .then(function(isSupported) {

                if (isSupported) {
                    cordova.plugins.locationManager.startAdvertising(beaconRegion)
                            .fail(conole.error)
                            .done();
                } else {
                    console.log("Advertising not supported");
                }
            })
            .fail(console.error)
            .done();

}

function StopAdvertising() {

    cordova.plugins.locationManager.stopAdvertising()
            .fail(console.error)
            .done();

}


