import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier

describe('route /book call /GET', function() {
    it('initialised with book object', function(done) {
        chai.request('http://localhost:8080')
            .get('/book')
            .end(function(err, res) {
                expect(res.body).to.have.property('book');
                done();
            });
    });

    it('test if body is an object', function(done) {
        chai.request('http://localhost:8080')
            .get('/book')
            .end(function(err, res) {
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('test status is 200', function(done) {
        chai.request('http://localhost:8080')
            .get('/book')
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });


    it('is book an array', function(done) {
        chai.request('http://localhost:8080')
            .get('/book')
            .end(function(err, res) {
                expect(res.body.books).to.be.an('array');
                done();
            });
    });
    
    it('is book arra is size 0', function(done) {
        chai.request('http://localhost:8080')
            .get('/book')
            .end(function(err, res) {
                // expect(res.body.books).to.have.length(0)
                done();
            });
    });
});


describe('route /book call /POST', function() {

    it('test status is 200', function(done) {
        chai.request('http://localhost:8080')
            .post('/book')
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });


    it('test key message', function(done) {
        chai.request('http://localhost:8080')
            .post('/book')
            .end(function(err, res) {
                expect(res.body.message).to.be.equal('book successfully added');
                done();
            });
    });
    
});



describe('route /book/:id call /GET', function() {
    beforeEach(() => {
        const data = {
            books:  [
                {
                    id: '0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9',
                    title: 'Coco raconte Channel 2',
                    years: 1990,
                    pages: 400
                }
            ]

        }
        const pathBooks = path.join(__dirname, '../data/books.json');
        resetDatabase(pathBooks,data);
    });

    it('test status is 200', function(done) {
        chai.request('http://localhost:8080')
            .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('test key message', function(done) {
        chai.request('http://localhost:8080')
            .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .end(function(err, res) {
                expect(res.body.message).to.be.equal('book fetched');
                done();
            });
    });

    it('test if book in body is an object', function(done) {
        chai.request('http://localhost:8080')
            .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .end(function(err, res) {
                expect(res.body.book).to.be.an('object');
                done();
            });
    });

    it('test if book title is string', function(done) {
        chai.request('http://localhost:8080')
            .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .end(function(err, res) {
                console.log("ici",res.body.book)
                expect(res.body.book.title).to.be.a('string');
                done();
            });
    });
    
    it('test if book years is int', function(done) {
        chai.request('http://localhost:8080')
            .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .end(function(err, res) {
                console.log("ici",res.body.book)
                expect(res.body.book.years).to.be.a('number');
                done();
            });
    });
});

describe('put', function() {

    beforeEach(() => {
        const data = {
            books:  [
                {
                    id: '0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9',
                    title: 'Coco raconte Channel 2',
                    years: 1990,
                    pages: 400
                }
            ]

        }
        const pathBooks = path.join(__dirname, '../data/books.json');
        resetDatabase(pathBooks,data);
    });
    it ('the body return a status 200', function(done) {
        chai.request('http://localhost:8080')
            .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .end(function(err, res){
                console.log("la res",res.body)
                expect(res).to.have.status(200);
                // expect (res).should.have.status(200);
                done();

            });
    });

    it ('the key equal book successfully updated', function(done) {
        chai.request('http://localhost:8080')
            .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .end(function(err, res){
                console.log("la res",res.body)
                expect(res.body.message).to.equal('book successfully updated');
                // expect (res).should.have.status(200);
                done();

            });
    });
});

describe('delete', function() {

    beforeEach(() => {
        const data = {
            books:  [
                {
                    id: '0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9',
                    title: 'Coco raconte Channel 2',
                    years: 1990,
                    pages: 400
                }
            ]

        }
        const pathBooks = path.join(__dirname, '../data/books.json');
        resetDatabase(pathBooks,data);
    });
    it ('the body return a status 200', function(done) {
        chai.request('http://localhost:8080')
            .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .end(function(err, res){
                console.log("la res",res.body)
                expect(res).to.have.status(200);
                // expect (res).should.have.status(200);
                done();

            });
    });

    it ('the key equal book successfully deleted', function(done) {
        chai.request('http://localhost:8080')
            .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .end(function(err, res){
                console.log("la res",res.body)
                expect(res.body.message).to.equal('book successfully deleted');
                // expect (res).should.have.status(200);
                done();

            });
    });
});


// TEST UNITAIRE


describe('Test unitaires', function() {
    it('should be status 200 GET', (done) => {
        nock('http://localhost:8080')
            .get('/book')
            .reply(200, {
                "status": 200,
            });

        chai.request('http://localhost:8080')
            .get('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.status).to.equal(200);
                done();
            });
    })

    it('should be an array', (done) => {
        nock('http://localhost:8080')
            .get('/book')
            .reply(200, {
                "books": []
            });

        chai.request('http://localhost:8080')
            .get('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.books).to.be.an('Array');
                done();
            });
    })

    it('should be status 200 POST', (done) => {
        nock('http://localhost:8080')
            .post('/book')
            .reply(200, {
                "status": 200,
            });

        chai.request('http://localhost:8080')
            .post('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.status).to.equal(200);
                done();
            });
    })

    it('should be book successfully added', (done) => {
        nock('http://localhost:8080')
            .post('/book')
            .reply(200, {
                "message": 'book successfully added',
            });
        chai.request('http://localhost:8080')
            .post('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.message).to.equal('book successfully added');
                done();
            });
    })

    it('should be status 200 PUT', (done) => {
        nock('http://localhost:8080')
            .put('/book')
            .reply(200, {
                "status": 200,
            });

        chai.request('http://localhost:8080')
            .put('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.status).to.equal(200);
                done();
            });
    })

    it('should be book successfully added PUT', (done) => {
        nock('http://localhost:8080')
            .put('/book')
            .reply(200, {
                "message": 'book successfully updated',
            });
        chai.request('http://localhost:8080')
            .put('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.message).to.equal('book successfully updated');
                done();
            });
    })

    it('should be status 200 DELETE', (done) => {
        nock('http://localhost:8080')
            .delete('/book')
            .reply(200, {
                "status": 200,
            });

        chai.request('http://localhost:8080')
            .delete('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.status).to.equal(200);
                done();
            });
    })

    it('should be book deleted', (done) => {
        nock('http://localhost:8080')
            .delete('/book')
            .reply(200, {
                "message": 'book successfully deleted',
            });
        chai.request('http://localhost:8080')
            .delete('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.message).to.equal('book successfully deleted');
                done();
            });
    })
    // Erreur

    it('should be status 400 GET', (done) => {
        nock('http://localhost:8080')
            .get('/book')
            .reply(400, {
                "status": 400,
            });

        chai.request('http://localhost:8080')
            .get('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.status).to.equal(400);
                done();
            });
    })

    it('should be error fetching books', (done) => {
        nock('http://localhost:8080')
            .post('/book')
            .reply(200, {
                "message": 'error fetching books',
            });
        chai.request('http://localhost:8080')
            .post('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.message).to.equal('error fetching books');
                done();
            });
    })

    it('should be status 400 POST', (done) => {
        nock('http://localhost:8080')
            .post('/book')
            .reply(400, {
                "status": 400,
            });

        chai.request('http://localhost:8080')
            .post('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.status).to.equal(400);
                done();
            });
    })

    it('should be error adding the book', (done) => {
        nock('http://localhost:8080')
            .post('/book')
            .reply(400, {
                "message": 'error adding the book',
            });
        chai.request('http://localhost:8080')
            .post('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.message).to.equal('error adding the book');
                done();
            });
    })

    it('should be status 400 PUT', (done) => {
        nock('http://localhost:8080')
            .put('/book')
            .reply(400, {
                "status": 400,
            });

        chai.request('http://localhost:8080')
            .put('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.status).to.equal(400);
                done();
            });
    })

    it('should be book error updating the book PUT', (done) => {
        nock('http://localhost:8080')
            .put('/book')
            .reply(400, {
                "message": 'error updating the book',
            });
        chai.request('http://localhost:8080')
            .put('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.message).to.equal('error updating the book');
                done();
            });
    })

    it('should be status 400 DELETE', (done) => {
        nock('http://localhost:8080')
            .delete('/book')
            .reply(400, {
                "status": 400,
            });

        chai.request('http://localhost:8080')
            .delete('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.status).to.equal(400);
                done();
            });
    })

    it('should be ‘error deleting the book', (done) => {
        nock('http://localhost:8080')
            .delete('/book')
            .reply(400, {
                "message": '‘error deleting the book',
            });
        chai.request('http://localhost:8080')
            .delete('/book')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.body.message).to.equal('‘error deleting the book');
                done();
            });
    })
});
