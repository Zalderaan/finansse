"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var morgan_1 = require("morgan");
var app = (0, express_1.default)();
var port = 3001;
// middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// routes
app.get('/', function (req, res) {
    res.send('Hello from TS + Express!');
});
// server
app.listen(port, function () {
    console.log("Server running from http://localhost:".concat(port));
});
