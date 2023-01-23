import e, { NextFunction, Request, Response } from "express";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Users } = require("../../models");
const { accessLogStream } = require("../helpers/log");

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body, "<<<--- Req Body");

  try {
    let messageInfo: string = "";
    let userId: number = 0;

    const data = {
      email: req.body?.email,
      password: req.body?.password,
    };

    let existingPerson = await Users.findOne({
      where: {
        email: { [Op.eq]: data?.email },
      },
    }).catch((err: any) => console.log("err", err));

    if (existingPerson && data.password === existingPerson.password) {
      // let newLead = await Users.create(data).catch((err: any) =>
      //   accessLogStream(err)
      // );
      // userId = (newLead as any)?.id;
      // messageInfo = "New user created";

      messageInfo = "Existing user, logged in";
      userId = existingPerson.id;
    } else {
      messageInfo = "Email/Password was not found";
      throw new Error("Email/Password was not found");
    }

    res.send({ success: true, userId: userId, msg: messageInfo });
  } catch (err) {
    res.status(400).send(err);
  }
};

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body, "<<<--- Req body");

  try {
    let messageInfo: string;
    let userId: number;

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    let existingUser = await Users.findOne({
      where: {
        email: { [Op.eq]: data?.email },
      },
    }).catch((err: any) => {
      console.log(err);
      accessLogStream(err);
    });

    if (existingUser) {
      throw new Error("Email has already been used");
    } else {
      let newUser = Users.create(data).catch((err: any) => {
        console.log(err);
        accessLogStream(err);
      });
      userId = newUser.id;
      messageInfo = "New user has been registered";
    }

    res.send({ success: true, userId: userId, msg: messageInfo });
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body, "<<<--- Req body");

  try {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    let existingUser = await Users.findOne({
      where: { email: { [Op.eq]: data?.email } },
    }).catch((err: any) => {
      console.log(err);
      accessLogStream(err);
    });

    let updatedUser = await Users.update(data, {
      where: { id: { [Op.eq]: existingUser.id } },
    }).catch((err: any) => {
      console.log(err);
      accessLogStream(err);
    });

    res.send({
      success: true,
      userId: existingUser.id,
      msg: "Successfully updated details",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

export default { loginController, registerController, updateDetailsController };
