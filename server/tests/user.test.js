const request = require('supertest');
const app = require('../app');

describe('POST /join',function(){
    let user = {
        username: "stotest",
        password: "123"
    }
    it('respond with 200 created',function (done){
        request(app)
            .post('/join')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', '/json/')
            .expect(200)
            .expect(function(response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
             })
             .end(done);
    });
});