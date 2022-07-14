const express = require(`express`)
const router = express.Router()
const jwt = require(`jsonwebtoken`);
require("dotenv").config();
const bcrypt = require(`bcrypt`);
const User = require(`../models/User`);

router.get(`/categories`, function (request, response) {
    response.send(`get categories`)
})

router.post(
    `/signup`,
    body("firstName").isAlpha(),
    body("lastName").isAlpha(),
    body("email").isEmail(),
    async function (request, response) {
      const errors = validationResult(request);
      if (errors.isEmpty()) {
        try {
          let user = request.body;
          user.roles = {
            user: process.env.USER_ROLE,
          };
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
          console.log(user);
  
          const newUser = new User(user);
          newUser.save(function (error, u) {
            if (error) {
              return response
                .status(400)
                .send({ code: "bad requset", err: error });
            }
            response.status(201).send({ message: " new user has been added" });
          });
        } catch {
          response.status(500).send(`error`);
        }
      } else {
        response.status(400).send(errors);
      }
    }
  );


router.post(`/login`, async function (request, response) {
    const username = request.body.username;
    const password = request.body.password;

    User.findOne(
        {
            email: username,
        },
        async function (error, user) {
            try {
                if (error) {
                    response.status(500).send({ auth: false, err: error });
                    return;
                } else if (!user) {
                    response.status(404).send({ auth: false, err: `User not found` });
                    return;
                }

                if (await bcrypt.compare(password, user.password)) {
                    
                    const token = jwt.sign(
                        {username},
                        process.env.SECRET_KEY,
                        { expiresIn: '60s', }
                    );
                    user.password=""
                    response.cookie('jwt', token, { httpOnly: true, maxAge: 30 * 1000 })
                    response.send({ auth: true ,user})
                    return;
                } else {
                    response.status(401).send({ auth: false, message: `UnAuthrized` });
                    return;
                }
            } catch {
                response.status(500).send({ auth: false, message: `Error` });
                return;
            }
        }
    );
});

module.exports = router