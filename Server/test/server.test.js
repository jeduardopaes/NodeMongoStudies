const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');


const app = require('../server').app;
const Todo = require('../models/todo').Todo;

const todos =[{
  _id: new ObjectID(),
  text: 'Fist todo.'
},{
  _id: new ObjectID(),
  text: 'Second todo.'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(()=> done());
});


describe('POST/todos', () => {
  it('Deve cirar um novo todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));

      });
  });

  it('Não deveria criar todo com body inválido', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

  describe('get /todos',()=>{
    it('Deve buscar todos os todos', (done)=>{
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
  });

  describe('get /todo/:id', ()=>{
    it('Deve retornar todo doc', (done)=>{
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
  });

});