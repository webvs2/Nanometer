const chai = require('chai');
const expect = chai.expect;

let message = require('../src/index.js')();
let textV ='消息',err=new ReferenceError('[message] If you use the object argument form, be aware!"Context" is required');

describe('formal parameter checkout',function(){
	it('type require',function(){
		 expect(message('',textV)).to.throw(err);
	});
	
})

