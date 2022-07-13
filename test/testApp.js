const request = require("supertest");
const { createApp } = require("../src/app/app");

describe('app', () => {
  it('Should redirect to login when path is  get /', (done) => {
    request(createApp({}))
      .get('/')
      .expect(302)
      .expect('location', '/login')
      .end((err, res) => done(err))
  });

  it('Should give 404 when user doesnt exists', (done) => {
    request(createApp({ usersPath: 'data/users.json' }))
      .post('/login')
      .send('username=babu&password=raju')
      .expect(404)
      .expect('User doesn\'t exists', done)
  });

  it('Should redirect to homepage when user is present', (done) => {
    request(createApp({ usersPath: 'data/users.json' }))
      .post('/login')
      .send('username=deepu&password=deepu')
      .expect('location', '/homePage.html')
      .expect(302, done)
  });

  it('Should serve signup page when request is get /signup ', (done) => {
    request(createApp({ usersPath: 'data/users.json' }))
      .get('/signup')
      .expect('content-type', /html/)
      .expect(200, done)
  });
});
