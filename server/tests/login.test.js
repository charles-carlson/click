const request = require('supertest');
const app = require('../app');

describe('POST /login',function(){
    let user = {
        username: "stotest",
        password: "123"
    }
    it('respond with 200 created',function (done){
        request(app)
            .post('/login')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(200)
            .end(done);
    });
});