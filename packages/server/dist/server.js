"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.get('/data', (req, res) => {
    const data = { foo: 'bar' };
    res.json(data);
});
app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});
