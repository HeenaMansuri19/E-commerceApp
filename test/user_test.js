let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const utils = require("../models/userModelSchema");
let routes = require("../router/userRouter");
var randomEmail = require('random-email');

chai.should();
chai.use(chaiHttp);

describe("User signUp API", () => {
    describe("POST/api/user", () => {
        it("It shouldnot return signup user details:", (done) => {
            const data = {
                userName: "Heena",
                userEmail: "cs20.heenamansuri@svceindore.ac.in",
                password: "AAbc@123",
                gender: "female",
                city: "Indore",
                address: "Rjavada Indore",
                phoneNo: "9087654321",
            };
            chai
                .request(server)
                .post("/user/signup")
                .set("content-Type", "application/x-www-form-urlencoded")
                .field(data)
                .attach("profilePic", "/Users/LENOVO/OneDrive/Pictures/Patienttracker.png", "Patienttracker.png")
                .end((err, res) => {
                    res.should.have.status(409);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("false");
                    res.body.should.have.property("message").eq("Email already exists for this user");
                    done();
                })
        })
        it("It should return signupdetail of user:", (done) => {
            let email = (randomEmail({ domain: 'gmail.com' }))
            const data = {
                userName: "Ria Mansuriii",
                userEmail: email,
                password: "AAbc@123",
                gender: "female",
                city: "Indore",
                address: "Rjavada Indore",
                phoneNo: "9087654321",
            };
            chai
                .request(server)
                .post("/user/signup")
                .set("content-Type", "application/x-www-form-urlencoded")
                .field(data)
                .attach("profilePic", "/Users/LENOVO/OneDrive/Pictures/Patienttracker.png", "Patienttracker.png")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq(true);
                    res.body.should.have.property("message").eq("Registration successfull");
                    done();
                })
        })
    })
})



describe("User Login API", () => {
    describe("POST/api/users", () => {
        it("IT should Return login user details:", (done) => {
            const data = {
                userEmail: "riyamansuri@gmail.com",
                password: "AAbc@123",
                userRole: "user"
            };
            chai
                .request(server)
                .post("/user/userlogin")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq(true);
                    res.body.should.have.property("message").eq("User has been login successfully");
                    res.body.should.have.property("token");
                    done();
                })
        })

        it("It should Return Error Message :", (done) => {
            const data = {
                userEmail: "riyamansuri@gmail.com",
                password: "2222",
                userRole: "user"
            };
            chai
                .request(server)
                .post("/user/userlogin")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq(false);
                    res.body.should.have.property("message").eq("Email or password is not valid")
                    done();
                });
        })

        it("It should Return Email or password Error Message:", (done) => {
            const data = {
                userEmail: "faridamansuri@gmail.com",
                password: "AAbc@123",
                userRole: "user"
            };
            chai
                .request(server)
                .post("/user/userlogin")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("success").eq(false);
                    res.body.should.have.property("message").eq("You are not a register user");
                    done();
                })
        })

    })
})


describe("User sendEmail API", () => {
    describe("POST/api/users", () => {
        it("IT should Return login user details:", (done) => {
            const data = {
                userEmail: "jaidk5113@gmail.com",
            };
            chai
                .request(server)
                .post("/user/sendemail")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq(true);
                    res.body.should.have.property("message").eq("Email sent successfully");
                    res.body.should.have.property("token");
                    done();
                })
        })
        it("IT should Return error in sendEmailPass details:", (done) => {
            const data = {
                userEmail: "--jaidk5113@gmail.com",
            };
            chai
                .request(server)
                .post("/user/sendemail")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq(false);
                    res.body.should.have.property("message").eq("Email user is not found");
                    done();
                })
        })
    })
})


describe("User resetPassword API", () => {
    describe("POST/api/users", () => {
        it("IT should Return resetPassword details:", (done) => {
            const data = {
                "newPassword": "HHee@123",
                "confirmPassword": "HHee@123"
            };
            chai
                .request(server)
                .post("/user/userResetPassword/641159bb12ba77fa62f50139/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDExNTliYjEyYmE3N2ZhNjJmNTAxMzkiLCJpYXQiOjE2NzkwMjg4OTcsImV4cCI6MTY3OTAzMDA5N30._9cNg2gkVo2BEZpaUKRXn5S4NjgahCwl20I8bs3S9B4")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq(true);
                    res.body.should.have.property("message").eq("Password update successfully");
                    done();
                })
        })
                it("IT should Return error in resetPassword details:", (done) => {
                    const data = {
                        "newPassword": "HHee@123",
                        "confirmPassword": "HHe9999999999999999e@123"
                    };
                    chai
                        .request(server)
                        .post("/user/userResetPassword/641159bb12ba77fa62f50139/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDExNTliYjEyYmE3N2ZhNjJmNTAxMzkiLCJpYXQiOjE2NzkwMjg4OTcsImV4cCI6MTY3OTAzMDA5N30._9cNg2gkVo2BEZpaUKRXn5S4NjgahCwl20I8bs3S9B4")
                        .send(data)                       
                        .end((err, res) => {
                            res.should.have.status(403);
                            res.should.be.a("object");
                            res.body.should.have.property("success").eq(false);
                            res.body.should.have.property("message").eq("Password and confirm password is not match");
                            done();
    })
    })
            it("IT should Return email is not found in resetPassword details:", (done) => {
                const data = {
                    "newPassword":"AAbnc@123",
                    "confirmPassword":"44A99Abc@123"
                };
                chai
                    .request(server)
                    .post("/user/userResetPassword/641159bb12ba77fa62f50139/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDExNTliYjEyYmE3N2ZhNjJmNTAxMzkiLCJpYXQiOjE2NzkwMjg4OTcsImV4cCI6MTY3OTAzMDA5N30._9cNg2gkVo2BEZpaUKRXn5S4NjgahCwl20I8bs3S9B4")
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(403);
                        res.should.be.a("object");
                        res.body.should.have.property("success").eq(false);
                        res.body.should.have.property("message").eq("All fields are required");
                        done();
                    })
            })
        })
})