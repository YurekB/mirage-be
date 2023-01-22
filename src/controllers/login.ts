import { NextFunction, Request, Response } from "express";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Users } = require("../../models");
const { accessLogStream } = require("../helpers/log");

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body, "GOT REQ BODY");

  try {
    let messageInfo: string = "";
    let userId: number = 0;

    const data = {
      email: req.body?.email,
      password: req.body?.password,
    };

    console.log("GOT HERE");

    let existingPerson: object = await Users.findOne({
      where: {
        email: { [Op.eq]: data?.email },
      },
    }).catch((err: any) => console.log("err", err));

    console.log(existingPerson.Users, "EXISTING PERSON");
    //TODO Figure out why existing person doesnt let me access the existing id to send off on the response

    if (!existingPerson) {
      let newLead = await Users.create(data).catch((err: any) =>
        accessLogStream(err)
      );
      userId = (newLead as any)?.id;
      messageInfo = "New user created";
    } else {
      messageInfo = "Existing user";
    }

    res.send({ success: true, userId: userId, msg: messageInfo });
  } catch (err) {
    res.status(400).send(err);
  }
};

export default { loginController };
