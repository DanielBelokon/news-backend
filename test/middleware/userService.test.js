const { assert } = require("chai");
const sinon = require("sinon");
const { userService } = require("../../src/middleware");
const tokenUtils = require("../../src/utils/tokenUtils");
const { userContext } = require("../../src/data");

const normalUser = { username: "username", _id: "id", email: "email", role: "role" };
// isAuthenticated
describe("userService.isAuthenticated", function () {
    var stub_verifyToken = sinon.stub(tokenUtils, "verifyToken").callsFake(function fake_verifyToken(token) {
        if (token === "faketoken") {
            return { role: "fakerole" };
        } else {
            return null;
        }
    });
    var stub_getToken = sinon.stub(tokenUtils, "getToken");
    var spy_next = sinon.spy();
    var req = sinon.fake();
    var res = sinon.fake();
    beforeEach(function resetSpyNext() {
        spy_next = sinon.spy();
    });

    describe("Valid Inputs", function () {
        beforeEach(function () {
            stub_getToken.returns("faketoken");
        });
        it("Valid token format", function (done) {
            userService.isAuthenticated()(req, res, spy_next);
            assert(spy_next.calledWithExactly(),
                "Next called with argument");
            done();
        });
        it("Passed a role, they match", function (done) {
            userService.isAuthenticated("fakerole")(req, res, spy_next);
            assert(spy_next.calledWithExactly(),
                "Next called with argument");
            done();
        });
    });
    describe("Bad Inputs", function () {
        it("getToken didn't find the token", function (done) {
            stub_getToken.returns(null);
            userService.isAuthenticated()(req, res, spy_next);
            assert(spy_next.calledWithExactly(sinon.match.instanceOf(Error)),
                "Called next middleware in the pipeline");
            done();
        });
        it("verifyToken could not verify the token", function (done) {
            stub_getToken.returns("reallyfaketoken");
            userService.isAuthenticated()(req, res, spy_next);
            assert(spy_next.calledWithExactly(sinon.match.instanceOf(Error)),
                "Called next middleware in the pipeline");
            done();
        });
        it("Passed a role, and they don't match", function (done) {
            stub_getToken.returns("faketoken");
            userService.isAuthenticated("somerole")(req, res, spy_next);
            assert(spy_next.calledWithExactly(sinon.match.instanceOf(Error)),
                "Called next middleware in the pipeline");
            done();
        });

    });
});
// async register
describe("userService.register", function () {
    var stub_registerUser = sinon.stub(userContext, "registerUser");
    var req = {
        body: {
            username: "",
            password: "",
            email: ""
        }
    };
    var spy_next = sinon.spy();
    var res = sinon.fake();

    beforeEach(function resetSpyNext() {
        spy_next = sinon.spy();
        res.json = sinon.spy();
        stub_registerUser.resolves({ user: "user" });
    });

    it("Invalid user input (registerUser returns null)", async function () {
        stub_registerUser.rejects(new Error());
        await userService.register(req, res, spy_next);
        assert(spy_next.calledWithExactly(sinon.match.instanceOf(Error)),
            "Next didn't pass an Error");
    });
    it("Body of request is null", async function () {
        req = {};
        stub_registerUser.resolves({ username: "something" });
        await userService.register(req, res, spy_next);
        assert(spy_next.calledWithExactly(sinon.match.instanceOf(Error)),
            "Next didn't pass an Error");
    });
    it("Some of the fields in body are undefined", async function () {
        req = {
            body: {
                username: ""
            }
        };
        stub_registerUser.resolves({ username: "something" });
        await userService.register(req, res, spy_next);
        assert(res.json.calledOnce,
            "res.json was not called");
    });
});

// async login
describe("userService.login", function () {
    var stub_authenticateUser = sinon.stub(userContext, "authenticateUser");
    var stub_generateToken = sinon.stub(tokenUtils, "generateToken");
    var req = {
        body: {
            username: "",
            password: "",
            email: ""
        }
    };
    var spy_next = sinon.spy();
    var res = sinon.fake();

    beforeEach(function resetSpyNext() {
        spy_next = sinon.spy();
        res.json = sinon.spy();
        stub_generateToken.returns("somekindof.tokenwithcontent.andasignature");
        stub_authenticateUser.rejects(new Error("User not found"));
    });

    it("Doesn't find a user", async function () {
        await userService.login(req, res, spy_next);
        assert(spy_next.calledWithExactly(sinon.match.instanceOf(Error)));
    });
    it("Finds a user and returns a token", async function () {
        stub_authenticateUser.resolves(normalUser);
        await userService.login(req, res, spy_next);
        assert(res.json.calledWithExactly("somekindof.tokenwithcontent.andasignature"));
    });
    it("authenticateUser returns an error", async function () {
        stub_authenticateUser.rejects(new Error("Incorrect password"));
        await userService.login(req, res, spy_next);
        assert(spy_next.calledWithExactly(sinon.match.instanceOf(Error)));
    });
});