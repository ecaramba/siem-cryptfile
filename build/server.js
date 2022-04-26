"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const express_1 = require("express");
const app = express();
const route = (0, express_1.Router)();
app.use(express.json());
route.get('/', (req, res) => {
    res.json({ message: 'hello world with Typescript' });
});
app.use(route);
app.listen(3333, () => 'server running on port 3333');
