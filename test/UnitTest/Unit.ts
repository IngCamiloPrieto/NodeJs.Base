//Example Test: https://www.paradigmadigital.com/dev/testeo-api-rest-mocha-chai-http/
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { MockAuthApp, MockUnit } from './Mock/Entities';

export class Unit {
	private url : string;
	private authData : MockAuthApp;
	private mockUnitData : MockUnit;
	private mockUnitSync : { units : Array<MockUnit> };
	private numUnitList = 3;
	constructor (url: string , authData : MockAuthApp) {
		this.url = url;
		this.authData = authData;
		//Test data params ↓
		this.mockUnitData = new MockUnit();
		this.mockUnitSync = { units : new Array<MockUnit>() }
		for (let index = 0; index < this.numUnitList; index++) {
			this.mockUnitSync.units.push(new MockUnit());		
		}	
		this.init();
	};
	private init = () => {
		chai.use(chaiHttp);
	};
	public startTest = () => {
		describe('■► API Cloud - Controller Unit', () => {
			describe('► Controller Unit - Autentification: ',() => {
				describe('● Deny access to Unit controller without a token: ',() => {
					it('should reject a request to unit controller', (done) => {
						//Test Unautorized JWT request ↓
						chai.request(this.url)
						.get('/api/v1/unit')
						.end((err,res) => {
							//console.log(res.body);
							expect(res).to.have.status(401);
							expect(res.body).to.have.property('message').to.be.equal('not authorized!');				
							done(); // ← Test OK
						});
					});
				});

				describe('● Deny access to Unit Sync controller without a token: ',() => {
					it('should reject a request to unit sync controller', (done) => {
						//Test Unautorized JWT request ↓
						chai.request(this.url)
						.get('/api/v1/sync/unit')
						.end((err,res) => {
							//console.log(res.body);
							expect(res).to.have.status(401);
							expect(res.body).to.have.property('message').to.be.equal('not authorized!');
							done(); // ← Test OK
						});
					});
				});
			});

			describe('► Controller Unit - CRUD: ',() => {

				describe('● Unit -> Create/POST: ',() => {
					it('should create new unit', (done) => {				
						//Test Get JWT ↓
						chai.request(this.url)
						.post('/api/v1/auth/app')
						.send(this.authData)
						.end((err,res) => {
							//console.log(res.body);
							expect(res).to.have.status(200);
							expect(res.body).to.have.property('data').to.have.property('token');
							let token = res.body.data.token;	
							//Test Create Unit ↓
							chai.request(this.url)
							.post('/api/v1/unit')
							.set('Authorization', 'Bearer ' + token)
							.send(this.mockUnitData)
							.end((err,res) => {
								//console.log(res.body);
								expect(res).to.have.status(201);
								expect(res.body).to.have.property('statuscode').to.be.equal(201);
								expect(res.body).to.have.property('data').to.be.an('array').to.have.length(1);				
								const unit = res.body.data[0];
								expect(unit).to.have.property('unit_id').to.be.equal(this.mockUnitData.unit_id);	
								done(); // ← Test OK
							});
						});
					});
				});
	
				describe('● Unit -> Read/GET: ',() => {
					it('should get a added unit', (done) => {				
						//Test Get JWT ↓
						chai.request(this.url)
						.post('/api/v1/auth/app')
						.send(this.authData)
						.end((err,res) => {
							//console.log(res.body);
							expect(res).to.have.status(200);
							expect(res.body).to.have.property('data').to.have.property('token');
							let token = res.body.data.token;								
							//Test Get Unit ↓			
							chai.request(this.url)
							.get('/api/v1/unit/' + this.mockUnitData.unit_id)
							.set('Authorization', 'Bearer ' + token)
							.end((err,res) => {
								//console.log(res.body);
								expect(res).to.have.status(200);		
								expect(res.body).to.have.property('statuscode').to.be.equal(200);	
								expect(res.body).to.have.property('data').to.be.an('array').to.have.length(1);							
								const unit = res.body.data[0];
								expect(unit).to.have.property('unit_id').to.be.equal(this.mockUnitData.unit_id);	
								done(); // ← Test OK				
							});						
						});
					});
				});
	
				describe('● Unit -> Update/PUT: ',() => {
					it('should modify a added unit', (done) => {				
						//Test Get JWT ↓
						chai.request(this.url)
						.post('/api/v1/auth/app')
						.send(this.authData)
						.end((err,res) => {
							//console.log(res.body);
							expect(res).to.have.status(200);
							expect(res.body).to.have.property('data').to.have.property('token');
							let token = res.body.data.token;										
							//Test Update Unit ↓
							let fieldModified = `- ${this.mockUnitData.symbol} -`;
							this.mockUnitData.symbol = fieldModified;								
							chai.request(this.url)
							.put('/api/v1/unit/' + this.mockUnitData.unit_id)
							.set('Authorization', 'Bearer ' + token)
							.send(this.mockUnitData)
							.end((err,res) => {
								//console.log(res.body);
								expect(res).to.have.status(200);
								expect(res.body).to.have.property('statuscode').to.be.equal(200);									
								expect(res.body).to.have.property('data').to.be.an('array').to.have.length(1);
								const unit = res.body.data[0];
								expect(unit).to.have.property('symbol').to.be.equal(this.mockUnitData.symbol);		
								done(); // ← Test OK							
							});					
						});
					});
				}); 
	
				describe('● Unit -> Delete (Logical)/DEL: ',() => {
					it('should remove a added unit', (done) => {				
						//Test Get JWT ↓
						chai.request(this.url)
						.post('/api/v1/auth/app')
						.send(this.authData)
						.end((err,res) => {
							//console.log(res.body);
							expect(res).to.have.status(200);
							expect(res.body).to.have.property('data').to.have.property('token');
							let token = res.body.data.token;							
							//Test Delete (logical) Unit ↓
							chai.request(this.url)
							.del('/api/v1/unit/' + this.mockUnitData.unit_id)
							.set('Authorization', 'Bearer ' + token)
							.end((err,res) => {
								//console.log(res.body);	
								expect(res).to.have.status(202);	
								expect(res.body).to.have.property('data').to.be.an('array').to.have.length(1);	
								const unit = res.body.data[0];	
								expect(unit).to.have.property('unit_id').to.be.equal(this.mockUnitData.unit_id);
								expect(unit).to.have.property('is_active').to.be.equal(false);												
								done(); // ← Test OK
							});	
						});
					});
				}); 
			});

			describe('► Controller Unit - List: ',() => {
				describe('● Unit -> Read/GET: ',() => {
					it('should get a list of all units', (done) => {				
						//Test Get JWT ↓
						chai.request(this.url)
						.post('/api/v1/auth/app')
						.send(this.authData)
						.end((err,res) => {
							//console.log(res.body);
							expect(res).to.have.status(200);
							expect(res.body).to.have.property('data').to.have.property('token');
							let token = res.body.data.token;								
							//Test Get Unit List ↓			
							chai.request(this.url)
							.get('/api/v1/unit')
							.set('Authorization', 'Bearer ' + token)
							.end((err,res) => {
								//console.log(res.body);
								expect(res).to.have.status(200);		
								expect(res.body).to.have.property('statuscode').to.be.equal(200);	
								expect(res.body).to.have.property('count');
								const { count = 0 } = res.body;
								expect(res.body).to.have.property('data').to.be.an('array').to.have.length(count);
								done(); // ← Test OK				
							});						
						});
					});
				});
			});
		
			describe('► Controller Unit Sync - Syncronization: ', () => {
				describe('● Unit Sync - Create a Unit list: ', () => {
					it('should create a unit list', (done) => {
						//Test Get JWT ↓
						chai.request(this.url)
						.post('/api/v1/auth/app')
						.send(this.authData)
						.end((err,res) => {
							//console.log(res.body);
							expect(res).to.have.status(200);
							expect(res.body).to.have.property('data').to.have.property('token');				
							let token = res.body.data.token;	
							//Test Create a Unit List ↓							
							chai.request(this.url)
							.post('/api/v1/sync/unit')
							.set('Authorization', 'Bearer ' + token)
							.send(this.mockUnitSync)
							.end((err,res) => {							
								//console.log(res.body);
								expect(res).to.have.status(201);
								expect(res.body).to.have.property('statuscode').to.be.equal(201);
								expect(res.body).to.have.property('data').to.be.an('array').to.have.length(this.mockUnitSync.units.length);
								expect(res.body).to.have.property('data').to.be.satisfy((arrayResult) => { return arrayResult.filter((i) => {return i.processed === true; }).length === this.mockUnitSync.units.length; });				
								done(); // ← Test OK															
							});						
						});
					});
				});

				describe('● Unit Sync - Modify a Unit list: ', () => {
					it('should modify a unit list', (done) => {
						//Test Get JWT ↓
						chai.request(this.url)
						.post('/api/v1/auth/app')
						.send(this.authData)
						.end((err,res) => {
							//console.log(res.body);
							expect(res).to.have.status(200);
							expect(res.body).to.have.property('data').to.have.property('token');				
							let token = res.body.data.token;			
							//Test Update a Unit List ↓	
							this.mockUnitSync.units.map((unit) => { unit.is_active = false; });								
							chai.request(this.url)
							.post('/api/v1/sync/unit')
							.set('Authorization', 'Bearer ' + token)
							.send(this.mockUnitSync)
							.end((err,res) => {
								//console.log(res.body);
								expect(res).to.have.status(201);	
								expect(res.body).to.have.property('statuscode').to.be.equal(201);			
								expect(res.body).to.have.property('data').to.be.an('array').to.have.length(this.mockUnitSync.units.length);
								expect(res.body).to.have.property('data').to.be.satisfy((arrayResult) => { return arrayResult.filter((i) => {return i.processed === true && i.is_active === false; }).length === this.mockUnitSync.units.length; });
								done(); // ← Test OK
							});				
						});
					});
				});				
			});			
		});
	};
}