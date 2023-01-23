"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Users } = require("../../models");
const { accessLogStream } = require("../helpers/log");
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(req.body, "GOT REQ BODY");
    try {
        let messageInfo = "";
        let userId = 0;
        const data = {
            email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.email,
            password: (_b = req.body) === null || _b === void 0 ? void 0 : _b.password,
        };
        console.log("GOT HERE");
        let existingPerson = yield Users.findOne({
            where: {
                email: { [Op.eq]: data === null || data === void 0 ? void 0 : data.email },
            },
        }).catch((err) => console.log("err", err));
        // console.log(existingPerson.Users, "EXISTING PERSON");
        //TODO Figure out why existing person doesnt let me access the existing id to send off on the response
        if (!existingPerson) {
            let newLead = yield Users.create(data).catch((err) => accessLogStream(err));
            userId = newLead === null || newLead === void 0 ? void 0 : newLead.id;
            messageInfo = "New user created";
        }
        else {
            messageInfo = "Existing user";
        }
        res.send({ success: true, userId: userId, msg: messageInfo });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.default = { loginController };
