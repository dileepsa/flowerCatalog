const request = require("supertest");
const { createApp } = require("../src/app/app");

describe('get /', () => {
  it('Should redirect to login when path is  get /', (done) => {
    request(createApp({}))
      .get('/')
      .expect(302)
      .expect('location', '/login')
      .end((err, res) => done(err))
  });
});

describe('get /login', () => {
  it('Should serve login page when the request is get /login', (done) => {
    request(createApp({ usersPath: 'test/data/users.json' }))
      .get('/login')
      .expect(/Login/)
      .expect(200, done)
  });
});

describe('post /login', () => {
  it('Should give 404 when user doesnt exists', (done) => {
    request(createApp({ usersPath: 'test/data/users.json' }))
      .post('/login')
      .send('username=babu&password=raju')
      .expect(404)
      .expect('User doesn\'t exists', done)
  });

  it('Should redirect to homepage when user is present', (done) => {
    request(createApp({ usersPath: 'test/data/users.json' }))
      .post('/login')
      .send('username=deepu&password=deepu')
      .expect('location', '/homePage.html')
      .expect('set-cookie', /id/)
      .expect(302, done)
  });
});

describe('get /signup', () => {
  it('Should serve signup page when request is get /signup ', (done) => {
    request(createApp({ usersPath: 'test/data/users.json' }))
      .get('/signup')
      .expect('content-type', /html/)
      .expect(/Signup/)
      .expect(200, done)
  });
});

describe('post /signup', () => {
  it('Should redirect to login page after signing up ', (done) => {
    request(createApp({ usersPath: 'test/data/users.json' }))
      .post('/signup')
      .send('username=babu&password=tata')
      .expect('location', '/login')
      .expect(302, done)
  });
});

describe('get /logout', () => {
  it('Should remove session and cookie when request is /logout', (done) => {
    const sessions = { "2": { id: 2, username: 'babu' } };
    const config = {
      usersPath: 'test/data/users.json',
      commentsPath: 'test/data/comments.json',
    };

    request(createApp(config, sessions))
      .get('/logout')
      .set('Cookie', 'id=2')
      .expect(302, done)
      .expect('location', '/login')
      .expect('set-cookie', 'id=0;Max-Age=0')
  });
});
