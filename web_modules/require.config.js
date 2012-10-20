var jam = {
    "packages": [
        {
            "name": "backbone",
            "location": "web_modules/backbone",
            "main": "backbone.js"
        },
        {
            "name": "bootstrap",
            "location": "web_modules/bootstrap"
        },
        {
            "name": "jquery",
            "location": "web_modules/jquery",
            "main": "jquery.js"
        },
        {
            "name": "underscore",
            "location": "web_modules/underscore",
            "main": "underscore.js"
        }
    ],
    "version": "0.2.11",
    "shim": {}
};

if (typeof require !== "undefined" && require.config) {
    require.config({packages: jam.packages, shim: jam.shim});
}
else {
    var require = {packages: jam.packages, shim: jam.shim};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}