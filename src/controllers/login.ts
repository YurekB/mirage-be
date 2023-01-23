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

    let existingPerson = await Users.findOne({
      where: {
        email: { [Op.eq]: data?.email },
      },
    }).catch((err: any) => console.log("err", err));

    if (!existingPerson) {
      let newLead = await Users.create(data).catch((err: any) =>
        accessLogStream(err)
      );
      userId = (newLead as any)?.id;
      messageInfo = "New user created";
    } else {
      if (data.password !== existingPerson.password) {
        messageInfo = "Wrong password";
        throw new Error("Incorrect password");
      } else {
        messageInfo = "Existing user, logged in";
        userId = existingPerson.id;
      }
    }

    res.send({ success: true, userId: userId, msg: messageInfo });
  } catch (err) {
    res.status(400).send(err);
  }
};

export default { loginController };
