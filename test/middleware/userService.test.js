const mocha = require("mocha");
const { assert } = require("chai");
const sinon = require("sinon");
const { userService, tokenUtils } = require("../../src/middleware");


// Fakes:


// isAuthenticated
// to stub: tokenUtils.getToken(req), tokenUtils.verifyToken(token)
describe("userService.isAuthenticated", function () {
    var stub_verifyToken = sinon.stub(tokenUtils, "verifyToken").callsFake(function fake_verifyToken(token) {
        if (token === "faketoken") {
            return { role: "fakerole" };
        } else {
            return null;
        }
    });
    var spy_next = sinon.spy();
    var req = sinon.fake();
    var res = sinon.fake();
    beforeEach(function resetSpyNext() {
        spy_next = sinon.spy();
    });
    afterEach(function () { tokenUtils.getToken.restore(); });

    describe("Valid Inputs", function () {
        beforeEach(function () {
            var stub_getToken = sinon.stub(tokenUtils, "getToken").returns("faketoken");
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
            var stub_getToken = sinon.stub(tokenUtils, "getToken").returns(null);
            userService.isAuthenticated()(req, res, spy_next);
            assert(spy_next.calledWithExactly(sinon.match.instanceOf(Error)),
                "Called next middleware in the pipeline");
            done();
        });
        it("verifyToken could not verify the token", function (done) {
            var stub_getToken = sinon.stub(tokenUtils, "getToken").returns("reallyfaketoken");
            userService.isAuthenticated()(req, res, spy_next);
            assert(spy_next.calledWithExactly(sinon.match.instanceOf(Error)),
                "Called next middleware in the pipeline");
            done();
        });
        it("Passed a role, and they don't match", function (done) {
            var stub_getToken = sinon.stub(tokenUtils, "getToken").returns("faketoken");
            userService.isAuthenticated("somerole")(req, res, spy_next);
            assert(spy_next.calledWithExactly(sinon.match.instanceOf(Error)),
                "Called next middleware in the pipeline");
            done();
        });

    });
});
// async register
// to stub: userContext.registerUser
describe("userService.register", function (){
    
});


// async login
// userContet.authenticateUser