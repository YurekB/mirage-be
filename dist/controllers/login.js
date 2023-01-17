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
        let userId;
        const data = {
            email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.email,
            password: (_b = req.body) === null || _b === void 0 ? void 0 : _b.password,
        };
        console.log("GOTHERE");
        // let existingPerson: object = await Users.findOne({
        //   where: {
        //     email: { [Op.eq]: data?.email },
        //   },
        // }).catch((err: any) => console.log("err", err));
        // console.log(existingPerson, "EXISTING PERSON");
        // let newLead = await Users.create(data).catch((err: any) =>
        //   accessLogStream(err)
        // );
        // userId = (newLead as any)?.id;
        res.send({ success: true, userId: 100, msg: "Successfull" });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.default = { loginController };
