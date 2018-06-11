const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');


const app = require('../server').app;
const Todo = require('../models/todo').Todo;

const todos = [{
  _id: new ObjectID(),
  text: 'Fist todo.'
}, {
  _id: new ObjectID(),
  text: 'Second todo.',
  completed: true,
  completedAt: 222
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});


describe('POST/todos', () => {
  it('Deve cirar um novo todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text }).then((todos) => {
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
          return done();
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

  describe('get /todos', () => {
    it('Deve buscar todos os todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
  });
});

describe('get /todo/:id', () => {
  it('Deve retornar todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Deve retornar 404 caso id não seja encontrado', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Deve retornar 404 caso id seja inválido', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });

});

describe('delete /todo/:id', () => {
  it('Deve remover um todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist;
          done();
        }).catch((e) => done(e));

      });
  });

  it('Deve retornar 404 se não foi encontrado todo', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Deve retornar 404 se id foi inválido', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });

});

describe('patch /todos/:id', () => {
  it('Deve atualizar dados do todo', (done) => {
    var id = todos[1]._id.toHexString();

    var bodyReq = {
      "completed": true,
      "text": "Testando..."
    }

    request(app)
      .patch(`/todos/${id}`)
      .send(bodyReq)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.text).toBe(bodyReq.text);
        expect(typeof res.body.todo.completedAt).toBe('number');
      }).end(done);

  });

  it('Deve limpar o completedAt quando todo não está completo', (done) => {
    var id = todos[0]._id.toHexString();

    var bodyReq = {
      "completed": false,
      "text": "Testando 2 ..."
    }

    request(app)
      .patch(`/todos/${id}`)
      .send(bodyReq)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.text).toBe(bodyReq.text);
        expect(res.body.todo.completedAt).toBe(null);
      }).end(done);

  });

  it('Deve retornar 404 se não foi encontrado todo', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Deve retornar 404 se id foi inválido', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });

});

