const request = require("supertest");
const { createApp } = require("../src/app/app");

describe('get /', () => {
  it('Should redirect to homepage', (done) => {
    request(createApp({}))
      .get('/')
      .expect(200)
      .expect(/Flower Catalog/)
      .end((err, res) => done(err))
  });
});

describe('get /login', () => {
  it('Should respond with login page', (done) => {
    request(createApp({ usersPath: 'test/data/users.json' }))
      .get('/login')
      .expect(302, done)
      .expect('location', 'login.html')
  });
});

describe('post /login', () => {
  it('Should give 404 when user doesnt exists', (done) => {
    request(createApp({ usersPath: 'test/data/users.json' }))
      .post('/login')
      .send('username=babu&password=raju')
      .expect(401)
      .expect('User doesn\'t exists', done)
  });

  it('Should redirect to homepage when user exists', (done) => {
    request(createApp({ usersPath: 'test/data/users.json' }))
      .post('/login')
      .send('username=deepu&password=deepu')
      .expect('location', '/guest-book')
      .expect('set-cookie', /id/)
      .expect(302, done)
  });
});

describe('get /signup', () => {
  it('Should respond with signup page', (done) => {
    request(createApp({ usersPath: 'test/data/users.json' }))
      .get('/signup')
      .expect('location', '/signup.html')
      .expect(302, done)
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
  it('Should remove session and cookie', (done) => {
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

describe('get /abeliophyllum.html', () => {
  it('Should serve abeliophyllum flower page', (done) => {
    request(createApp({}))
      .get('/abeliophyllum.html')
      .expect(/Abeliophyllum/)
      .expect(200, done)
  });
});

describe('get /api/get-comments', () => {
  it('Should get all comments as json', (done) => {
    request(createApp({ commentsPath: 'test/data/comments.json' }))
      .get('/api/get-comments')
      .expect('content-type', /json/)
      .expect(200, done)
  });
});

describe('get /guest-book', () => {
  it('Should redirect to login page when the user is not logged in', (done) => {
    request(createApp({ commentsPath: 'test/data/comments.json' }))
      .get('/guest-book/')
      .expect('location', '/login')
      .expect(302, done)
  });

  it('Should show guest book page', (done) => {
    const sessions = { '123': { username: 'dileep' } }
    request(createApp({ commentsPath: 'test/data/comments.json' }, sessions))
      .get('/guest-book')
      .set('Cookie', 'id=123')
      .expect(200, done)
  });
});

describe('post /guest-book/add-comment', () => {
  it('Should add comment when user is authorized', (done) => {
    const sessions = { '123': { username: 'dileep' } }
    request(createApp({ commentsPath: 'test/data/comments.json' }, sessions))
      .post('/guest-book/add-comment')
      .send('comment=hello')
      .set('Cookie', 'id=123')
      .expect(201, done)
  });
});
